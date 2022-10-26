import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
const LoginView = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card raised sx={{ width: {xs: "90%", md: "30%" } }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:3
          }}
        >
          <img src="/Logo.svg" alt="Logo" width="200" height="100" />
          <FormControl variant="standard" sx={{width:'90%'}}>
            <InputLabel htmlFor="input-with-icon-adornment">
              Account Name: 
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{width:'90%'}}>
            <InputLabel htmlFor="input-with-icon-adornment">
              Password: 
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
            />
          </FormControl>
        </CardContent>
        <CardActions sx={{ float: "right" }}>
          <Button size="small">Register</Button>
          <Button size="small">Login</Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default LoginView;
