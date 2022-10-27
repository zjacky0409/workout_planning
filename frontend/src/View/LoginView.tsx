import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSSR, useTranslation } from "react-i18next";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { useAppSelector, useAppDispatch } from '../store/hook';
import { useNavigate } from "react-router-dom";

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../store/counterSlice';

const LoginView = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();


  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();


  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // alert("TODO: Login");
    dispatch(incrementByAmount(100))
    navigate("/");
  };

  const handleUsername = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserName(event.target.value);
  };

  const handlePassword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const switchShowPassword = () => {
    setShowPassword(!showPassword);
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
      <Card raised sx={{ width: { xs: "90%", md: "30%" } }}>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <img src="/Logo.svg" alt="Logo" width="200" height="100" />

            <FormControl variant="standard" sx={{ width: "90%" }} required>
              {/* <InputLabel htmlFor="input-with-icon-adornment">
                Account Name:
              </InputLabel> */}
              <Input
                value={username}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => handleUsername(e)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                // required
              />
              <FormHelperText>Account Name</FormHelperText>
            </FormControl>
            <FormControl variant="standard" sx={{ width: "90%" }} required>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90%" }}>
                  {/* <InputLabel htmlFor="input-with-icon-adornment">
                    Password:
                  </InputLabel> */}
                  <Input
                    value={password}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => handlePassword(e)}
                    sx={{ width: "100%" }}
                    type={!showPassword ? "password" : "text"}
                  />
                  <FormHelperText>Password</FormHelperText>
                </div>
                <Button onClick={switchShowPassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Button>
              </div>
            </FormControl>
          </CardContent>
          <CardActions sx={{ float: "right" }}>
            <Button size="small">Register</Button>
            <Button size="small" type="submit">
              Login
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};
export default LoginView;
