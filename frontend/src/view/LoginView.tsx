import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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
import { useAppSelector, useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import axios from "axios";
import { selectAuth, setAuthentication } from "../store/authSlice";
import CustomButton from "../Button/CustomButton";

const LoginView = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuth);

  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/diet");
    }
  }, [auth, navigate]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // alert("TODO: Login");
    setStatus(1);

    async function fetchData() {
      const loginInPromise = new Promise((resolve, reject) => {
        axios
          .post("http://localhost:4000/auth/login", {
            username: username,
            password: password,
          })
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
        console.log("result == ", result);
        setStatus(1);
        localStorage.setItem("access_token", result.data.access_token);
        dispatch(setAuthentication());
        navigate("/");
      } catch (e) {
        console.log(e);
        setStatus(2);
      }
    }
    fetchData();
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
                disabled={status === 1}
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
                    disabled={status === 1}
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

            {status === 1 && <CircularProgress />}

            {status === 2 && (
              <Alert severity="error" sx={{ width: "90%" }}>
                Incorrect Account or Incorrect Password
              </Alert>
            )}
          </CardContent>
          <CardActions sx={{ float: "right" }}>
            <CustomButton
              handler={() => {
                navigate("/registration");
              }}
              shownText="Register"
              variant={"TEST"}
            />
            <CustomButton
              type="submit"
              shownText="Login"
              variant={"normal"}
              disabled={status === 1}
              handler={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            {/* <Button disabled={status === 1} size="small" type="submit">
              Login
            </Button> */}
          </CardActions>
        </form>
      </Card>
    </div>
  );
};
export default LoginView;
