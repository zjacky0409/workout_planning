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
import { ExerciseObject, FoodObject } from "../../common";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  createExerciseJson,
  getExerciseJson,
  updateExerciseJson,
} from "../../api/exerciseApi";
import {
  createExercise,
  getExercise,
  updateExercise,
} from "../../store/exerciseSlice";
import { Body_Part, Body_Part_Subtype } from "../../common";
import { selectRole } from "../../store/authSlice";
interface PropsType {
  open: boolean;
  handleClose: any;
  setOpen: Function;
  modify: boolean;
  type: string;
  subtype: string;
  data?: ExerciseObject;
  viewOnly: boolean;
}
interface IFormInput {
  id: number;
  name: string;
  type: "Chest" | "Back" | "Arms" | "Legs" | "Core" | "Shoulder" | "None";
  subtype: string;
  details: string;
  created_at: string;
  updated_at: string;
  // file: string;
}

const ModifyExercise = ({
  open,
  handleClose,
  setOpen,
  modify, // true: modify the exercise, false: add a new exericse
  type, // for fetch the data to get the exercise list
  subtype, // for fetch the data to get the exercise list
  data,
  viewOnly, // true: only allow user view the data, user cannot modify(i.e. typing)
}: PropsType) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);
  const schema = yup
    .object({
      name: yup.string().required("Please enter food name"),
      details: yup.string().required("Please enter a number"),
      type: yup
        .string()
        // .oneOf(["Recommand", "Not Bad", "Not Recommand"])
        .required("Please enter food name"),
      subtype: yup
        .string()
        // .oneOf(["Recommand", "Not Bad", "Not Recommand"])
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
    defaultValues: {
      name: "",
      details: "",
      type: "None",
      subtype: "None",
    },
    resolver: yupResolver(schema),
  });

  const values = watch(); // to monitor the user's input

  // reset the form's data
  useEffect(() => {
    if (modify) {
      reset(data);
    }
  }, [data, modify, reset]);

  // submit the data to the server
  const onSubmit = () => {
    if (modify && data) {
      let sendToServer: updateExerciseJson = {
        name: values.name,
        type: values.type,
        subtype: values.subtype,
        details: values.details,
        id: data.id,
      };
      dispatch(updateExercise(sendToServer))
        .unwrap()
        .then((result) => {
          console.log(result);
          if (result.update_exercise === true) {
            setOpen(false);
            reset();
            let sendToServer: getExerciseJson = {
              type: type,
              subtype: subtype,
            };
            dispatch(getExercise(sendToServer));
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
      let sendToServer: createExerciseJson = {
        name: values.name,
        type: values.type,
        subtype: values.subtype,
        details: values.details,
      };

      dispatch(createExercise(sendToServer))
        .unwrap()
        .then((result) => {
          if (result.create_exercise === true) {
            setOpen(false);
            reset();
            let sendToServer: getExerciseJson = {
              type: type,
              subtype: subtype,
            };
            dispatch(getExercise(sendToServer));
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
        <DialogTitle>{t("Add a new exercise")}</DialogTitle>
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
                    label={t("Exercise Name")}
                    disabled={viewOnly}
                    fullWidth
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
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
                name="details"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["details"]}
                    size="small"
                    label={t("Details")}
                    fullWidth
                    disabled={viewOnly}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                    helperText={
                      errors["details"]
                        ? t(
                            errors["details"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                defaultValue="None"
                render={({ field }) => (
                  <FormControl>
                    <Select
                      {...field}
                      size="small"
                      disabled={viewOnly}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {Body_Part.map((body_part: string) => (
                        <MenuItem key={body_part} value={body_part}>
                          {t(body_part as unknown as TemplateStringsArray)}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {errors["type"]
                        ? t(
                            errors["type"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="subtype"
                control={control}
                defaultValue="None"
                render={({ field }) => (
                  <FormControl>
                    <Select
                      {...field}
                      size="small"
                      disabled={viewOnly}
                      // disable textfield color to black in mui
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {Body_Part_Subtype[values.type].map((subtype: string) => (
                        <MenuItem key={subtype} value={subtype}>
                          {t(subtype as unknown as TemplateStringsArray)}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {errors["subtype"]
                        ? t(
                            errors["subtype"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={handleClose}
            shownText="Cancel"
            variant="cancel"
            type="button"
          />
          {role.includes("coach") && ( // only shown to coach 
            <CustomButton
              // disabled={disabled}
              type="submit"
              // handler={handleClose}
              shownText="Comfirm"
              variant="primary"
              // handler={function (): void {
              //   throw new Error("Function not implemented.");
              // }}
            />
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModifyExercise;
