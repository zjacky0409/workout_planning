import { WeightObject } from "../../common";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import CustomButton from "../../components/Button/CustomButton";

import { useEffect } from "react";
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
import Select from "@mui/material/Select";
import { selectRole } from "../../store/authSlice";
import axios from "axios";

interface PropsType {
  open: boolean;
  handleClose: any;
  setOpen: Function;
  modify: boolean; // true: modify the weight, false: add a new weight
  data?: WeightObject;
  viewOnly: boolean; // true: only allow user view the data, user cannot modify(i.e. typing)
}

interface IFormInput {
  id: number;
  weight: number;
  comment: string;
  date: string;
}

const ModifyWeightProcess = ({
  open,
  handleClose,
  setOpen,
  modify,
  data,
  viewOnly,
}: PropsType) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);

  // form validatio with yup
  const schema = yup
    .object({
      weight: yup.string().required("Please enter food name"),
      date: yup.string().required("Please enter food name"),
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

  const values = watch(); // to monitor the user's input

  // reset the form's value when the data has change
  useEffect(() => {
    if (modify) {
      // true: modify the food, false: add a new food
      reset(data);
    }
  }, [data, modify, reset]);

  const onSubmit = () => {
    console.log("values => ", values);
    async function fetchData() {
      const loginInPromise = new Promise((resolve, reject) => {
        axios
          .post(
            "http://localhost:4000/process/create_weight",
            {
              weight: parseFloat(values.weight+""),
              comments: values.comment,
              // ISO 8601 date string
              date: new Date(values.date).toISOString(),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(function (response) {
            return resolve(response);
          })
          .catch(function (error) {
            return reject(error);
          });
      });
      let result: any;
      try {
        result = await loginInPromise;
        handleClose();
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{"Add a new food"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingTop: 2 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Controller
                name="weight"
                control={control}
                // defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors["weight"]}
                    size="small"
                    label={t("Weight")}
                    disabled={viewOnly}
                    fullWidth
                    // disable textfield color to black in mui
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                    helperText={
                      errors["weight"]
                        ? t(
                            errors["weight"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={viewOnly}
                    error={!!errors["date"]}
                    size="small"
                    // If true, the label is shrunk.
                    InputLabelProps={{ shrink: true }}
                    label={"date"}
                    type={"date"}
                    fullWidth
                    // disable textfield color to black in mui
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
                    helperText={
                      errors["date"]
                        ? t(
                            errors["date"]
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
                    disabled={viewOnly}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                    }}
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
          {role.includes("student") && ( // only shown to coach
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

export default ModifyWeightProcess;
