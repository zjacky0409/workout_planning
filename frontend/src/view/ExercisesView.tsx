import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
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
interface Exercise {
  id: number;
  name: string;
  details: string;
}
type GetExerciseResponse = {
  data: Exercise[];
};
const ExercisesView = () => {
  const { t } = useTranslation();
  const status = useAppSelector(selectStatus);
  const exerciseList = useAppSelector(selectExerciseList);
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);

  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState(0);

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

  const handleReset = () => {
    setVersion(version + 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModify({
      ...modify,
      modify: false,
    });
    handleReset();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getExercise());
  }, [dispatch]);

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
          <p>This is the {t("Exercises")} Page</p>
          {role.includes("coach") && (
            <CustomButton
              shownText={"Add New Exercise"}
              handler={handleClickOpen}
              variant={"primary"}
              style={{ width: 180, height: 50 }}
            />
          )}
        </div>

        <Grid container spacing={2}>
          {exerciseList.map((value: ExerciseObject) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={value.id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      // color="text.secondary"
                      gutterBottom
                    >
                      {value.name}
                    </Typography>
                    <Typography component="div">
                      {value.type}
                    </Typography>
                    <Typography variant="body2">
                      {value.details}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <CustomButton
                      // size="small"
                      shownText="Edit"
                      handler={() => {
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
                      handler={() => {
                        dispatch(deleteExercise(value.id))
                      }}
                      variant={"danger"}
                    />
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
        />
      </div>
    </MainLayout>
  );
};
export default ExercisesView;
