/*
  To be improved
*/

import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { PageObject } from "../common";
import { useTranslation } from "react-i18next";

interface SideBarProp {
  shownText: string;
  content: PageObject[];
  action: () => void;
}

// Drawer aka side bar

export default function NestListItem({
  shownText,
  content,
  action,
}: SideBarProp) {
  const [open, setOpen] = React.useState(false);

  const { i18n } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  const SubChildren = (
    subShownText: string,
    subContent: any[]
  ): JSX.Element => {
    const [subOpen, setSubOpen] = React.useState(false);

    const subHandleClick = () => {
      //   setOpen(!open);
      setSubOpen(!subOpen);
    };

    return (
      <>
        <ListItemButton onClick={subHandleClick} sx={{ width: "100%" }}>
          <ListItemText primary={subShownText} sx={{ pl: 2 }} />
          {subOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={subOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subContent.map((val) => {
              if (val.children) {
                console.log("DONE, we have children here");
                console.log(val.children);
              }
              return (
                <ListItemButton
                  key={val.path + "_nest_item"}
                  sx={{ pl: 8 }}
                  onClick={action}
                  component={Link}
                  to={"/" + i18n.language + val.path}
                >
                  {val.name}
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <ListItemButton onClick={handleClick} sx={{ width: "100%" }}>
        <ListItemText primary={shownText} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {content.map((val) => {
            if (val.children) {
              return SubChildren(val.icon + val.name, val.children);
            }
            return (
              <ListItemButton
                key={val.path + "_nest_item"}
                sx={{ pl: 4 }}
                onClick={action}
                component={Link}
                to={"/" + i18n.language + val.path}
              >
                {/* {val.icon} */}
                {val.name}
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
}
