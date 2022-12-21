import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CustomButton from "../components/Button/CustomButton";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { selectRole } from "../store/authSlice";
import ModifyExercise from "./ExerciseView/ModifyExercise";
import {
  deleteExercise,
  getExercise,
  selectExerciseList,
  selectStatus,
} from "../store/exerciseSlice";
import { ExerciseObject } from "../common";
import { getExerciseJson } from "../api/exerciseApi";
import SearchIcon from "@mui/icons-material/Search";

interface ExerciseProps {
  type: string;
  subtype: string;
}
const ExercisesView = ({ type, subtype }: ExerciseProps) => {
  const { t } = useTranslation();
  const status = useAppSelector(selectStatus);
  const exerciseList = useAppSelector(selectExerciseList);
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);

  const [open, setOpen] = useState(false);

  // to store the the serach value
  const [searchValue, setSerachValue] = useState("");

  const [shownExerciseList, setShownExerciseList] = useState<ExerciseObject[]>(
    []
  );

  useEffect(() => {
    console.log("searchValue => ", searchValue);
    if (searchValue === "") {
      setShownExerciseList(exerciseList);
    } else {
      // for filtering the data list
      setShownExerciseList(
        exerciseList.filter(
          (val: ExerciseObject) =>
            val.details.includes(searchValue) || val.name.includes(searchValue)
        )
      );
    }
  }, [searchValue, exerciseList]);

  const serachInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(e.target.value);
  };

  // https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
  const [version, setVersion] = useState(0);

  // set the data to ModifyExercise Component
  const [modify, setModify] = useState<{
    modify: boolean;
    data: ExerciseObject;
  }>({
    modify: false,
    data: {
      id: -999,
      name: "",
      details: "",
      type: "None",
      subtype: "None",
      created_at: "",
      updated_at: "",
    },
  });

  // https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
  const handleReset = () => {
    setVersion(version + 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // reset the modiftExercise component and the modify state
  const handleClose = () => {
    setModify({
      ...modify,
      modify: false,
    });
    handleReset();
    setOpen(false);
  };

  // get the data from the server
  useEffect(() => {
    let sendToServer: getExerciseJson = {
      type: type,
      subtype: subtype,
    };
    dispatch(getExercise(sendToServer));
  }, [dispatch, subtype, type]);

  if (status !== "idle") {
    return (
      <MainLayout content="Exercises">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout content="Exercises">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              // justifyContent: "space-between",
            }}
          >
            <SearchIcon />
            <input
              value={searchValue}
              onChange={serachInputChange}
              style={{ width: "300px", height: "30px" }}
              type="text"
              placeholder="Search by name or details.."
            />
          </div>
          {role.includes("coach") && (
            <CustomButton
              shownText={"Add a new exercise"}
              onClick={handleClickOpen}
              variant={"primary"}
              style={{ width: 180, height: 50 }}
            />
          )}
        </div>

        <Grid container spacing={2}>
          {shownExerciseList.map((value: ExerciseObject) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={value.id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      // color="text.secondary"
                      gutterBottom
                      noWrap
                    >
                      {value.name}
                    </Typography>
                    <Typography component="div" noWrap>
                      {value.type}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {value.details}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {role.includes("coach") && (
                      <>
                        <CustomButton
                          // size="small"
                          shownText="Edit"
                          onClick={() => {
                            setModify({
                              modify: true,
                              data: value,
                            });
                            setOpen(true);
                          }}
                          variant={"primary"}
                        />
                        <CustomButton
                          // size="small"
                          shownText="Delete"
                          onClick={() => {
                            dispatch(deleteExercise(value.id));
                          }}
                          variant={"danger"}
                        />
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <ModifyExercise
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          modify={modify.modify}
          data={modify.data}
          key={version}
          type={type}
          subtype={subtype}
        />
      </div>
    </MainLayout>
  );
};
export default ExercisesView;
