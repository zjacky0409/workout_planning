import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import {
  createUser,
  selectStatus,
  checkEmailExist,
  checkUsernameExist,
} from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/Button/CustomButton";
import ConfirmDialog from "../components/Dialog/ConfirmDialog";
import { useTranslation } from "react-i18next";
import ChangeLangSelect from "../components/ChangeLangSelect";
import { createUserJson } from "../api/authApi";
// declare the form structure
interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  dateOfBirth: string;
  confirmPassword: string;
  age: string;
}

// do the form validation with yup library
// TODO: I should use test for the username and email checking
const schema = yup
  .object({
    firstName: yup.string().required("Please enter the first name"),
    lastName: yup.string().required("Please enter the last name"),
    username: yup.string().required("Please enter the username"),
    phoneNumber: yup
      .number()
      .typeError("Please enter a valid phone number")
      .required("Please enter a phone number"),
    emailAddress: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter a email address"),
    password: yup
      .string()
      .required("Please enter the password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ), // to make sure that the email address must match the contrains
    confirmPassword: yup
      .string()
      .required("Please enter the confirm password")
      .oneOf([yup.ref("password")], "Your password do not match"),
    dateOfBirth: yup.string().required("Please enter or select a valid date"),
    age: yup.number().positive().integer().required("Please enter the age"),
  })
  .required();

const RegistrationView = () => {
  const { t } = useTranslation();

  const [dShowPassword, setDShowPassword] = useState(false); // show the password or not
  const [open, setOpen] = useState(false); // open the confirm dialog or not
  const [regSuccess, setRegSuccess] = useState(false); // registrate success or not

  const [usernameExist, setUsernameExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitStatus = useAppSelector(selectStatus);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(true);
  };

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

  const userInput = watch();

  const usernameExistChecking = () => {
    dispatch(checkUsernameExist({ username: userInput.username }))
      .unwrap()
      .then((result) => {
        if (result.exist === true) {
          setUsernameExist(true);
          setError("username", { type: "focus" }, { shouldFocus: false });
        } else {
          setUsernameExist(false);
          clearErrors("username");
        }
        // handle result here
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        // handle error here
        // TODO: error handling
        // 1. what if the user name already exist???
      });
  };

  const emailExistChecking = () => {
    dispatch(
      checkEmailExist({
        emailAddress: userInput.emailAddress,
      })
    )
      .unwrap()
      .then((result) => {
        if (result.exist === true) {
          setEmailExist(true);
          setError("emailAddress", { type: "focus" }, { shouldFocus: true });
        } else {
          setEmailExist(false);
          clearErrors("emailAddress");
        }
        // handle result here
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        // handle error here
        // TODO: error handling
        // 1. what if the user name already exist???
      });
  };

  // Send the user data to the server and create the user object in the db
  const sendDataToServer = () => {
    var sendToServer: createUserJson = {
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      username: userInput.username,
      phoneNumber: parseInt(userInput.phoneNumber),
      emailAddress: userInput.emailAddress,
      password: userInput.password,
      dateOfBirth: userInput.dateOfBirth,
      confirmPassword: userInput.confirmPassword,
      age: parseInt(userInput.age),
    };

    dispatch(createUser(sendToServer))
      .unwrap()
      .then((result) => {
        if (result.create_user === true) {
          setRegSuccess(true);
          setOpen(false);
          reset();
        } else {
          setRegSuccess(false);
        }
        // handle result here
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        // handle error here
        // TODO: error handling
        // 1. what if the user name already exist???
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDShowPassword(event.target.checked);
  };

  const handleDuplicateError = (type: "username" | "emailAddress"): string => {
    if (usernameExist && type === "username") {
      return t("The username already existed");
    }

    if (emailExist && type === "emailAddress") {
      return t("The email address already existed");
    }

    if (errors[type]) {
      // TODO here quite confuse, why i need to add ? here
      return t(errors[type]?.message as unknown as TemplateStringsArray);
    }
    return "";
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card raised sx={{ width: { xs: "90%", md: "40%" } }}>
        {regSuccess && ( // when registration successfully, we show the success view
          <>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <img
                src="/Logo.svg"
                style={{ cursor: "pointer" }}
                alt="Logo"
                width="200"
                height="100"
                onClick={() => {
                  navigate("/");
                }}
              />
              <Typography variant="button" gutterBottom>
                {t("Registration Successfully")}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {t("Now you can go to login page to explore a new journey.")}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {t("Remember: Eat, Train, Sleep and Enjoy")}
              </Typography>
            </CardContent>
            <CardActions>
              <div style={{ margin: "auto" }}>
                <CustomButton
                  shownText={t("Explore Now")}
                  handler={() => navigate("/")}
                  variant={"primary"}
                />
              </div>
            </CardActions>
          </>
        )}
        {!regSuccess && ( // show the reg form to the user
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <img
                src="/Logo.svg"
                style={{ cursor: "pointer" }}
                alt="Logo"
                width="200"
                height="100"
                onClick={() => {
                  navigate("/");
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  gap: 5,
                }}
              >
                {/* 
                  ref: https://react-hook-form.com/get-started#IntegratingwithUIlibraries 
                  --> how to apply react hook form to the ui library with controller 
                  --> TODO: implement it with component form? ref: https://react-hook-form.com/api/useformcontext
                 */}
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors["firstName"]}
                      size="small"
                      label={t("First Name")}
                      fullWidth
                      helperText={
                        errors["firstName"]
                          ? t(
                              errors["firstName"]
                                .message as unknown as TemplateStringsArray
                            )
                          : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      error={!!errors["lastName"]}
                      label={t("Last Name")}
                      fullWidth
                      helperText={
                        errors["lastName"]
                          ? t(
                              errors["lastName"]
                                .message as unknown as TemplateStringsArray
                            )
                          : ""
                      }
                    />
                  )}
                />
              </div>

              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors["username"]}
                    label={t("Username")}
                    onBlur={() => usernameExistChecking()}
                    fullWidth
                    helperText={handleDuplicateError("username")}
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors["phoneNumber"]}
                    label={t("Phone Number")}
                    fullWidth
                    // type="number"
                    inputProps={{ inputMode: "numeric" }}
                    helperText={
                      errors["phoneNumber"]
                        ? t(
                            errors["phoneNumber"]
                              .message as unknown as TemplateStringsArray
                          )
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="emailAddress"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors["emailAddress"]}
                    label={t("Email Address")}
                    onBlur={() => emailExistChecking()}
                    type="email"
                    fullWidth
                    helperText={handleDuplicateError("emailAddress")}
                  />
                )}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    // flexWrap: 'wrap',
                    width: "100%",
                    gap: 1,
                  }}
                >
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors["password"]}
                        label={t("Password")}
                        type={dShowPassword ? "text" : "password"}
                        fullWidth
                        helperText={
                          errors["password"]
                            ? t(
                                errors["password"]
                                  .message as unknown as TemplateStringsArray
                              )
                            : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors["confirmPassword"]}
                        label={t("Confirm Password")}
                        type={dShowPassword ? "text" : "password"}
                        fullWidth
                        helperText={
                          errors["confirmPassword"]
                            ? t(
                                errors["confirmPassword"]
                                  .message as unknown as TemplateStringsArray
                              )
                            : ""
                        }
                      />
                    )}
                  />
                </Box>
                <FormControlLabel
                  sx={{ marginRight: "auto", p: 0 }}
                  control={
                    <Checkbox
                      size="small"
                      checked={dShowPassword}
                      onChange={handleChange}
                    />
                  }
                  label={t("Show Password")}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  gap: 5,
                }}
              >
                <div style={{ flexGrow: 3 }}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        // sx={{ flexGrow: 0.7 }}
                        error={!!errors["dateOfBirth"]}
                        InputLabelProps={{ shrink: true }}
                        label={t("Date Of Birth")}
                        type={"date"}
                        fullWidth
                        helperText={
                          errors["dateOfBirth"]
                            ? t(
                                errors["dateOfBirth"]
                                  .message as unknown as TemplateStringsArray
                              )
                            : ""
                        }
                      />
                    )}
                  />
                </div>
                <div style={{ flexGrow: 0 }}>
                  <Controller
                    name="age"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors["age"]}
                        label={t("Age")}
                        // type="number"
                        inputProps={{ inputMode: "numeric" }}
                        fullWidth
                        helperText={
                          errors["age"]
                            ? t(
                                errors["age"]
                                  .message as unknown as TemplateStringsArray
                              )
                            : ""
                        }
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ padding: 10 }}>
                <ChangeLangSelect />
              </div>
              <CustomButton
                shownText={t("Register")}
                type="submit"
                handler={function (): void {
                  throw new Error("Function not implemented.");
                }}
                variant="primary"
              />
            </CardActions>
          </form>
        )}

        {/* </FormProvider> */}
      </Card>
      <ConfirmDialog
        disabled={submitStatus === "pending"}
        hanlder={sendDataToServer}
        header={"Confirmation"}
        content={"Are you sure to submit the content"}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};
export default RegistrationView;
