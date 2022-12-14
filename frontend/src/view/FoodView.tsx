import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from "../store/hook";
import CustomButton from "../components/Button/CustomButton";

import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import { selectFoodList, selectStatus } from "../store/dietSlice";
import ModifyFood from "./FoodView/ModifyFood";
import { getFood } from "../store/dietSlice";
import { FoodObject } from "../common";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import Grid from "@mui/material/Grid";

import { selectRole } from "../store/authSlice";
import FoodCard from "./FoodView/FoodCard";
import SearchIcon from "@mui/icons-material/Search";
interface PropsType {
  day: string;
}

const FoodView = (props: PropsType) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  // serach value
  const [serachValue, setSerachValue] = useState<string>("");

  // https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
  const [version, setVersion] = useState<number>(0);

  const handleReset = () => {
    setVersion(version + 1);
  };

  // need to pass to ModifyFood Component
  const [modify, setModify] = useState<{
    viewOnly: boolean;
    modify: boolean;
    data: FoodObject;
  }>({
    modify: false,
    viewOnly: false,
    data: {
      id: -999,
      name: "",
      carbs: -999,
      protein: -999,
      fat: -999,
      created_at: "",
      updated_at: "",
      comment: "",
      recommendation: "",
    },
  });

  const dispatch = useAppDispatch();

  const foodList = useAppSelector(selectFoodList);

  const [shownFoodList, setShownFoodList] = useState<FoodObject[]>([]);

  const role = useAppSelector(selectRole);

  const status = useAppSelector(selectStatus);

  const serachInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(e.target.value);
  };

  useEffect(() => {
    // filter the data list function
    if (serachValue !== "") {
      setShownFoodList(
        foodList.filter(
          (word: FoodObject) =>
            word.name.toLowerCase().includes(serachValue.toLowerCase()) ||
            word.comment.toLowerCase().includes(serachValue.toLowerCase())
        )
      );
    } else {
      setShownFoodList(foodList);
    }
  }, [foodList, serachValue]);

  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

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

  // fetching the data from the server, we show the loading status to the user
  if (status === "pending") {
    return (
      <MainLayout content="Diet">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          {/* <CircularProgress /> */}
          <LoadingSpinner variant="primary" size="medium" />
          <h2>{t("Loading...")}</h2>
        </div>
      </MainLayout>
    );
  }

  const Line = (showText: string) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
        }}
      >
        {/* <hr
          style={{
            height: 3,
            width: "100%",
            background: "#ea4c89",
            borderRadius: "2px 2px 2px 2px",
            border: "0px solid black",
          }}
        ></hr> */}
        {/* <Typography component="div" variant="caption">
          Recommand
        </Typography> */}
        <Chip size="small" label={showText} />
        {/* <hr
          style={{
            height: 3,
            width: "100%",
            background: "#ea4c89",
            borderRadius: "2px 2px 2px 2px",
            border: "0px solid black",
          }}
        ></hr> */}
      </div>
    );
  };

  return (
    <MainLayout content="Diet">
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
              value={serachValue}
              onChange={serachInputChange}
              style={{ width: "300px", height: "30px" }}
              type="text"
              placeholder="Search by name or comment.."
            />
          </div>

          {role.includes("coach") && (
            <CustomButton
              shownText={"Add New Food"}
              onClick={handleClickOpen}
              variant={"primary"}
              style={{ width: 130, height: 50 }}
            />
          )}
        </div>

        <>{Line("Recommand")}</>

        <Grid container spacing={2}>
          {shownFoodList.map((values: FoodObject) => {
            if (values.recommendation === "Recommand") {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={values.id}>
                  <FoodCard
                    id={values.id}
                    name={values.name}
                    carbs={values.carbs}
                    fat={values.fat}
                    protein={values.protein}
                    comment={values.comment}
                    setModify={setModify}
                    setOpen={setOpen}
                    // callDeleteFoodApi={callDeleteFoodApi}
                  />
                </Grid>
              );
            }
            return <></>;
          })}
        </Grid>

        <>{Line("Not Bad")}</>
        <Grid container spacing={2}>
          {shownFoodList.map((values: FoodObject) => {
            if (values.recommendation === "Not Bad") {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={values.id}>
                  <FoodCard
                    id={values.id}
                    name={values.name}
                    carbs={values.carbs}
                    fat={values.fat}
                    protein={values.protein}
                    comment={values.comment}
                    setModify={setModify}
                    setOpen={setOpen}
                    // callDeleteFoodApi={callDeleteFoodApi}
                  />
                </Grid>
              );
            }
            return <></>;
          })}
        </Grid>

        <>{Line("Not Recommand")}</>
        <Grid container spacing={2}>
          {shownFoodList.map((values: FoodObject) => {
            if (values.recommendation === "Not Recommand") {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} key={values.id}>
                  <FoodCard
                    id={values.id}
                    name={values.name}
                    carbs={values.carbs}
                    fat={values.fat}
                    protein={values.protein}
                    comment={values.comment}
                    setModify={setModify}
                    setOpen={setOpen}
                    // callDeleteFoodApi={callDeleteFoodApi}
                  />
                </Grid>
              );
            }
            return <></>;
          })}
        </Grid>
        <ModifyFood
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          modify={modify.modify}
          data={modify.data}
          key={version}
          viewOnly={modify.viewOnly}
        />
      </div>
    </MainLayout>
  );
};
export default FoodView;
