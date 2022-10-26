import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MailIcon from "@mui/icons-material/Mail";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import { SideBarContext } from "../Context/SideBarContext";
import { Link, useLocation } from "react-router-dom";
import { navigations } from "../navgation";
const drawerWidth = 240;

interface SideBarProp {
  content?: string;
}

// Drawer aka side bar

export default function SideBar({ content = "Diet" }: SideBarProp) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const currentSideBar = React.useContext(SideBarContext);

  const location = useLocation();

  // console.log(navigations.filter((value :any) => value.name === content))

  const drawer = (
    <div>
      <Toolbar sx={{ bgcolor: "white", height: 100 }}>
        <Stack direction="row" spacing={1}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="/Logo.svg" alt="Logo" width="200" height="100" />
          </Typography>
        </Stack>
      </Toolbar>
      <Divider />
      <Box sx={{ height: 20 }} />

      <Stack spacing={1} direction="column">
        {/* {
          navigation.filter((value :any) => value.name === content)
        } */}
        {navigations
          .filter((value: any) => value.name === content)[0]
          .children.map((text: any) => (
            <ListItem
              key={text.path}
              disablePadding
              sx={
                {
                  // bgcolor: location.pathname === text.path ? "#cacbcc" : "white",
                }
              }
            >
              <ListItemButton component={Link} to={text.path}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  // sx={{margin: 'auto'}}
                >
                  {/* <Icon fontSize="small"> {text.icon}</Icon> */}
                  {/* <ListItemText primary={text.name} /> */}
                  {/* {
                    location.pathname === text.path ? "#cacbcc" : "white" && 
                  } */}
                  <Divider
                    orientation="vertical"
                    // variant="middle"
                    flexItem
                    sx={{
                      background: location.pathname === text.path ? "skyblue" : "white",
                      borderRightWidth: 5,
                      // height: "100%",
                    }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    <span>{text.icon} </span>
                    {text.name}
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
      </Stack>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="side bar"
    >
      <Drawer // Drawer in mui, the default value of anchor is left
        variant="temporary"
        open={mobileOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "white",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer // Drawer in mui, the default value of anchor is left
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "white",
            overflow: "hidden",
          },
        }}
        open
        PaperProps={{ elevation: 4 }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
