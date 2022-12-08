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
import { createFood, updateFood, getFood } from "../../store/dietSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FoodObject } from "../../common";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  comment: string;
  recommendation: string;
  created_at: string;
  updated_at: string;
  // file: string;
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
      protein: yup.number().required("Please enter a number"),
      fat: yup.number().required("Please enter a number"),
      carbs: yup.number().required("Please enter a number"),
      recommendation: yup
        .string()
        .oneOf(["Recommand", "Not Bad", "Not Recommand"])
        .required("Please enter food name"),
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

  console.log(values);

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
        comment: values.comment,
        recommendation: values.recommendation,
        // base64string: 'test'
      };

      dispatch(updateFood(sendToServer))
        .unwrap()
        .then((result) => {
          console.log(result);
          if (result.update_food === true) {
            setOpen(false);
            reset();
            dispatch(getFood());
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
        comment: values.comment,
        recommendation: values.recommendation,
        // base64string: 'test'
      };

      dispatch(createFood(sendToServer))
        .unwrap()
        .then((result) => {
          if (result.create_food === true) {
            setOpen(false);
            reset();
            dispatch(getFood());
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
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["comment"]}
                    size="small"
                    label={t("comment")}
                    fullWidth
                    helperText={
                      errors["comment"]
                        ? t(
                            errors["comment"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />

              {/* <Controller
                name="recommendation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["recommendation"]}
                    size="small"
                    label={t("recommendation")}
                    fullWidth
                    helperText={
                      errors["recommendation"]
                        ? t(
                            errors["recommendation"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              /> */}
              <Controller
                name="recommendation"
                control={control}
                defaultValue="None"
                render={({ field }) => (
                  <FormControl>
                  <Select
                    {...field}
                    size="small"
                  >
                    <MenuItem value="None">
                      <em>{t('None')}</em>
                    </MenuItem>
                    <MenuItem value={"Recommand"}>{t("Recommand")}</MenuItem>
                    <MenuItem value={"Not Bad"}>{t("Not Bad")}</MenuItem>
                    <MenuItem value={"Not Recommand"}>{t("Not Recommand")}</MenuItem>
                  </Select>
                  <FormHelperText sx={{color: 'red'}}>{errors["recommendation"]
                        ? t(
                            errors["recommendation"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""}</FormHelperText>
                  </FormControl>
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
