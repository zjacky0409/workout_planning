import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from "../store/hook";
import CustomButton from "../components/Button/CustomButton";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { createFoodJson } from "../api/dietApi";
import { createFood, selectFoodList, selectStatus } from "../store/dietSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import ModifyFood from "./FoodView/ModifyFood";
import { getFood } from "../store/dietSlice";
import { FoodObject } from "../common";
import * as yup from "yup";
import LoadingSpinner from "../components/Loading/LoadingSpinner";
interface PropsType {
  day: string;
}

const FoodView = (props: PropsType) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState(0);

  const handleReset = () => {
    setVersion(version + 1);
  };
  const [modify, setModify] = useState({
    modify: true,
    data: {
      id: -999,
      name: "",
      carbs: -999,
      protein: -999,
      fat: -999,
      created_at: "",
      updated_at: "",
    },
  });

  const dispatch = useAppDispatch();

  const foodList = useAppSelector(selectFoodList);

  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

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

  console.log("foodList == ", foodList);

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

  return (
    <MainLayout content="Diet">
      <div style={{ height: "100%" }}>
        <p>This is the {t("Food")} Page</p>
        <p>{props.day}</p>
        <CustomButton
          shownText={"Add New Food"}
          handler={handleClickOpen}
          variant={"primary"}
        />
        {foodList.map((values: FoodObject) => {
          return (
            <>
              <h6>{values.name}</h6>
              <button
                onClick={() => {
                  setModify({ modify: true, data: values });
                  setOpen(true);
                }}
              ></button>
            </>
          );
        })}
        <ModifyFood
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
export default FoodView;
