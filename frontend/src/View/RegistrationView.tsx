import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
// import Input from "@mui/material/Card"
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormTextInput from "../components/form/FormTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { createUser } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: number;
  emailAddress: string;
  password: string;
  dateOfBirth: string;
  confirmPassword: string;
  age: number;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    phoneNumber: yup.number().required(),
    emailAddress: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Your password do not match."),
    dateOfBirth: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

const RegistrationView = () => {
  const [dShowPassword, setDShowPassword] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [regSuccess, setRegSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const methods = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    dispatch(createUser(data))
      .unwrap()
      .then((result) => {
        if (result.create_user === true) {
          setRegSuccess(true);
        } else {
          setRegSuccess(false);
        }
        // handle result here
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        // handle error here
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDShowPassword(event.target.checked);
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
      <Card raised sx={{ width: { xs: "90%", md: "50%" } }}>
        {regSuccess && (
          <>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <img src="/Logo.svg" alt="Logo" width="200" height="100" />
              <Typography variant="button" gutterBottom>
                Registration Successfully
              </Typography>
              <Typography variant="caption" gutterBottom>
                Now you can go to login page to explore a new journey.
              </Typography>
              <Typography variant="caption" gutterBottom>
                Remember: Eat, Train, Sleep and Enjoy
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                sx={{margin:'auto'}}
                onClick={() => {
                  navigate("/");
                }}
              >
                Explore Now
              </Button>
            </CardActions>
          </>
        )}
        {!regSuccess && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <img src="/Logo.svg" alt="Logo" width="200" height="100" />
              {/* <Typography variant="h6" sx={{marginRight:'auto'}}>Registration:</Typography> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  gap: 5,
                }}
              >
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors["firstName"]}
                      size="small"
                      label="First Name"
                      fullWidth
                      helperText={
                        errors["firstName"] ? errors["firstName"].message : ""
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
                      label="Last Name"
                      fullWidth
                      helperText={
                        errors["lastName"] ? errors["lastName"].message : ""
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
                    label="Username"
                    fullWidth
                    helperText={
                      errors["username"] ? errors["username"].message : ""
                    }
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                // defaultValue=
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors["phoneNumber"]}
                    label="Phone Number"
                    fullWidth
                    // type="tel"
                    helperText={
                      errors["phoneNumber"] ? errors["phoneNumber"].message : ""
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
                    label="Email Address"
                    type="email"
                    fullWidth
                    helperText={
                      errors["emailAddress"]
                        ? errors["emailAddress"].message
                        : ""
                    }
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: 5,
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
                        label="Password"
                        type={dShowPassword ? "text" : "password"}
                        fullWidth
                        helperText={
                          errors["password"] ? errors["password"].message : ""
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
                        label="Confirm Password"
                        type={dShowPassword ? "text" : "password"}
                        fullWidth
                        helperText={
                          errors["confirmPassword"]
                            ? errors["confirmPassword"].message
                            : ""
                        }
                      />
                    )}
                  />
                </div>
                <FormControlLabel
                  sx={{ marginRight: "auto", p: 0 }}
                  control={
                    <Checkbox
                      size="small"
                      checked={dShowPassword}
                      onChange={handleChange}
                    />
                  }
                  label="Show Password"
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
                        error={!!errors["age"]}
                        InputLabelProps={{ shrink: true }}
                        label="Age"
                        type={"date"}
                        fullWidth
                        helperText={errors["age"] ? errors["age"].message : ""}
                      />
                    )}
                  />
                </div>
                <div style={{ flexGrow: 0 }}>
                  <Controller
                    name="age"
                    control={control}
                    // defaultValue={null}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // sx={{flexGrow: 0.3}}
                        size="small"
                        error={!!errors["age"]}
                        label="Age"
                        fullWidth
                        helperText={errors["age"] ? errors["age"].message : ""}
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardActions sx={{ float: "right" }}>
              <Button size="small" type="submit">
                Register
              </Button>
            </CardActions>
          </form>
        )}

        {/* </FormProvider> */}
      </Card>
    </div>
  );
};
export default RegistrationView;
