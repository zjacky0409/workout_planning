import {
  useForm,
  Controller,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { createUser, selectStatus } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CustomButton from '../components/Button/CustomButton'
import ConfirmDialog from '../components/Dialog/ConfirmDialog'

// declare the form structure
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

// do the form vaildation with yup library
const schema = yup
  .object({
    firstName: yup.string().required('Please enter the first name'),
    lastName: yup.string().required('Please enter the last name'),
    username: yup.string().required('Please enter the username'),
    phoneNumber: yup.number().typeError('Please enter a vaild phone number').required('Please enter a phone number'),
    emailAddress: yup.string().email('Please enter a vaild email address').required('Please enter a email address'),
    password: yup.string().required('Please enter the password').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: yup
      .string()
      .required('Please enter the confirm password')
      .oneOf([yup.ref("password")], "Your password do not match."),
    dateOfBirth: yup.string().required('Please enter or select a valid date'),
    age: yup.number().positive().integer().required('Please enter the age'),
  })
  .required();

const RegistrationView = () => {


  const [dShowPassword, setDShowPassword] = useState(false); // show the password or not
  const [open, setOpen] = useState(false) // open the confirm dialog or not
  const [regSuccess, setRegSuccess] = useState(false); // registrate success or not

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitStatus = useAppSelector(selectStatus)

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = () => {
    setOpen(true)
  }

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const userInput = watch()


  // Send the user data to the server and create the user object in the db
  const sendDataToServer = () => {
    console.log(userInput);
    dispatch(createUser(userInput))
      .unwrap()
      .then((result) => {
        if (result.create_user === true) {
          setRegSuccess(true);
          setOpen(false)
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
              <img src="/Logo.svg" style={{ cursor: "pointer" }} alt="Logo" width="200" height="100" onClick={() => { navigate('/') }} />
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
                sx={{ margin: 'auto' }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Explore Now
              </Button>
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
              <img src="/Logo.svg" style={{ cursor: "pointer" }} alt="Logo" width="200" height="100" onClick={() => { navigate('/') }} />
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
                        error={!!errors["dateOfBirth"]}
                        InputLabelProps={{ shrink: true }}
                        label="Age"
                        type={"date"}
                        fullWidth
                        helperText={errors["dateOfBirth"] ? errors["dateOfBirth"].message : ""}
                      />
                    )}
                  />
                </div>
                <div style={{ flexGrow: 0 }}>
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors["age"]}
                        label="Age"
                        type={'numebr'}
                        fullWidth
                        helperText={errors["age"] ? errors["age"].message : ""}
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardActions sx={{ float: "right", p: 3 }}>
              <CustomButton shownText="Register" type="submit" handler={function (): void {
                throw new Error("Function not implemented.");
              }} variant="primary" />
            </CardActions>
          </form>
        )}

        {/* </FormProvider> */}
      </Card>
      <ConfirmDialog disabled={submitStatus === 'loading'} hanlder={sendDataToServer} header={"Confirmation"} content={"Are you sure to submit the content"} open={open} handleClose={handleClose} />
    </div>
  );
};
export default RegistrationView;
