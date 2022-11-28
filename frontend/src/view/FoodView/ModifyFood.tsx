import MainLayout from "../../layout/MainLayout";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from "../../store/hook";
import CustomButton from "../../components/Button/CustomButton";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { createFoodJson, updateFoodJson } from "../../api/dietApi";
import { createFood, updateFood } from "../../store/dietSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FoodObject } from "../../common";
interface PropsType {
  open: boolean;
  handleClose: any;
  setOpen: Function;
  modify: boolean;
  data?: FoodObject;
}

interface IFormInput {
  id: number;
  name: string;
  carbs: number;
  protein: number;
  fat: number;
  created_at: string;
  updated_at: string;
}

const ModifyFood = ({
  open,
  handleClose,
  setOpen,
  modify,
  data,
}: PropsType) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const schema = yup
    .object({
      name: yup.string().required("Please enter food name"),
      protein: yup.number().positive().required("Please enter a number"),
      fat: yup.number().positive().required("Please enter a number"),
      carbs: yup.number().positive().required("Please enter a number"),
    })
    .required();

  const {
    control,
    watch,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const values = watch();

  useEffect(() => {
    if (modify) {
      reset(data);
    }
  }, [data, modify, reset]);

  const onSubmit = () => {
    console.log("values == ", values);

    if (modify && data) {
      let sendToServer: updateFoodJson = {
        carbs: Number(values.carbs),
        protein: Number(values.protein),
        fat: Number(values.fat),
        name: values.name,
        id: data?.id,
      };

      dispatch(updateFood(sendToServer))
        .unwrap()
        .then((result) => {
          if (result.create_food === true) {
            setOpen(false);
            reset();
          } else {
            // setRegSuccess(false);
            console.log("error");
          }
          // handle result here
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
          // handle error here
          // TODO: error handling
          // 1. what if the user name already exist???
        });
    } else {
      let sendToServer: createFoodJson = {
        carbs: Number(values.carbs),
        protein: Number(values.protein),
        fat: Number(values.fat),
        name: values.name,
      };

      dispatch(createFood(sendToServer))
        .unwrap()
        .then((result) => {
          if (result.create_food === true) {
            setOpen(false);
            reset();
          } else {
            // setRegSuccess(false);
            console.log("error");
          }
          // handle result here
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
          // handle error here
          // TODO: error handling
          // 1. what if the user name already exist???
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{"Add a new food"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingTop: 2 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["name"]}
                    size="small"
                    label={t("Food Name")}
                    fullWidth
                    helperText={
                      errors["name"]
                        ? t(
                            errors["name"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="carbs"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["carbs"]}
                    size="small"
                    label={t("Carbs")}
                    fullWidth
                    helperText={
                      errors["carbs"]
                        ? t(
                            errors["carbs"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="protein"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["protein"]}
                    size="small"
                    label={t("Protein")}
                    fullWidth
                    helperText={
                      errors["protein"]
                        ? t(
                            errors["protein"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="fat"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["fat"]}
                    size="small"
                    label={t("Fat")}
                    fullWidth
                    helperText={
                      errors["fat"]
                        ? t(
                            errors["fat"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            handler={handleClose}
            shownText="Cancel"
            variant="cancel"
            type="button"
          />
          <CustomButton
            // disabled={disabled}
            type="submit"
            // handler={handleClose}
            shownText="Comfirm"
            variant="primary"
            handler={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModifyFood;
