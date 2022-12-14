import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import { SideBarContext } from "../context/SideBarContext";
import { Link, useLocation } from "react-router-dom";
import { navigations } from "../navgation";
import { SideBarObject, PageObject } from "../common";
import { useTranslation } from "react-i18next";
const drawerWidth = 240;

interface SideBarProp {
  content?: string;
}

// Drawer aka side bar

export default function SideBar({ content = "Diet" }: SideBarProp) {
  const { t } = useTranslation();

  const location = useLocation();

  const sideBarContent = React.useMemo(() => {
    let tempContent: SideBarObject[] = [];

    let subNavContent = navigations.filter((value) => value.name === content);

    if (subNavContent.length > 0) {
      let toBeProcessed = subNavContent[0];
      if (toBeProcessed.path === location.pathname) {
        return toBeProcessed.children;
      }
      toBeProcessed.children.forEach((child: PageObject) => {
        if (child.path === location.pathname) {
          tempContent = toBeProcessed.children;
        }

        // https://stackoverflow.com/questions/49610779/typescript-error-ts2532-object-is-possibly-undefined-even-after-undefined-c
        // if(child.children !== undefined){
        //   child.children.forEach((subChild) => {
        //     if (subChild.path === location.pathname) {
        //       if(child.children !== undefined){
        //         tempContent = child.children;
        //       }
        //     }
        //   })
        // }

        if (child.children !== undefined) {
          for (var subChild of child.children) {
            if (subChild.path === location.pathname) {
              tempContent = child.children;
            }
          }
        }
      });
      return tempContent;
    } else {
      return [];
    }
  }, [location, content]);
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
        {sideBarContent.map((text: SideBarObject) => (
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
              >
                <Divider
                  orientation="vertical"
                  // variant="middle"
                  flexItem
                  sx={{
                    background:
                      location.pathname === text.path ? "skyblue" : "white",
                    borderRightWidth: 5,
                  }}
                />
                <Typography variant="subtitle2" gutterBottom>
                  {/* <span>{text.icon} </span> */}
                  {t(text.name as unknown as TemplateStringsArray)}
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
