import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
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
import CustomButton from "../components/Button/CustomButton";
import ChangeLangSelect from "../components/ChangeLangSelect";

const LoginView = () => {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false); // if ture, we display the password to the user
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuth);

  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "pending" | "error">(
    "idle"
  ); // login api status
  const navigate = useNavigate();

  // go to main page when we detect the user already login
  useEffect(() => {
    if (auth) {
      navigate("/diet");
    }
  }, [auth, navigate]);

  // send the account name and the password to the server and perform checking.
  // if the user enter correct account and password, we store the jwt token to the localStorage and set auth state to true
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("pending");

    // one way to fetch the data
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
        setStatus("idle");
        // we store the jwt token to the localStorage and set auth state to true
        localStorage.setItem("access_token", result.data.access_token);
        dispatch(setAuthentication());
        navigate("/");
      } catch (e) {
        console.log(e);
        setStatus("error");
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

  // change the visibility for the password text box
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
              <Input
                value={username}
                disabled={status === "pending"}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => handleUsername(e)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
              <FormHelperText>{t("Account Name")}</FormHelperText>
            </FormControl>
            <FormControl variant="standard" sx={{ width: "90%" }} required>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90%" }}>
                  <Input
                    value={password}
                    disabled={status === "pending"}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => handlePassword(e)}
                    sx={{ width: "100%" }}
                    type={!showPassword ? "password" : "text"} // here to set the visibility for the password
                  />
                  <FormHelperText>{t("Password")}</FormHelperText>
                </div>
                <Button onClick={switchShowPassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Button>
              </div>
            </FormControl>

            {status === "pending" && <CircularProgress />}

            {status === "error" && (
              <Alert severity="error" sx={{ width: "90%" }}>
                {t("Incorrect Account or Incorrect Password")}
              </Alert>
            )}
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ padding: 10 }}>
              <ChangeLangSelect />
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <CustomButton
                handler={() => {
                  navigate("/registration");
                }}
                shownText={t("Register")}
                variant={"primary"}
                type="button"
                // https://stackoverflow.com/questions/73484680/pressing-enter-key-on-input-field-triggers-button-click-function
                // When you have a button in a form, 
                // it defaults to type "submit" which means the first button in a form will have its onclick event triggered 
                // by the ENTER key. To prevent this from happening, simply assign type="button" to the button, 
                // and enter key will no longer affect it.
              />
              <CustomButton
                type="submit"
                shownText={t("Login")}
                variant={"primary"}
                disabled={status === "pending"}
                handler={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};
export default LoginView;
