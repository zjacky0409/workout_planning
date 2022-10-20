import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBar from './SideBar'
import TopBar from './TopBar'
interface Route {
  name: string;
  path: string;
}
const pages: Route[] = [
  { name: "Diet", path: "/diet" },
  { name: "Program", path: "/program" },
  { name: "Exercises", path: "/exercises" },
  { name: "Useful Resource", path: "/useful_resources" },
  { name: "Progress", path: "/progress" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout", "Change Lang"];

interface PropsType {
  children: JSX.Element;
}

const MainLayout = (props: PropsType) => {
  return (
    <>
      <TopBar/>
      <SideBar/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
      {props.children}
      </Box>
    </>
  );
};
export default MainLayout;
