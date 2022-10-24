import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import { navigations } from "../navgation";
import Popper from "@mui/material/Popper";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import { SideBarContext } from "../Context/SideBarContext";
import { useLocation } from "react-router-dom";

interface Route {
  name: string;
  path: string;
}
const pages: Route[] = [
  { name: "Diet", path: "/diet" },
  { name: "Program", path: "/program" },
  { name: "Exercises", path: "/exercises" },
  { name: "Resource", path: "/useful_resources" },
  { name: "Progress", path: "/progress" },
];
const settings = ["Profile", "Account", "Logout"];
const lang_choice = [
  { name: "English", value: "en" },
  { name: "繁體中文", value: "zh_hk" },
  { name: "简体中文", value: "zh_cn" },
];

// interface PropsType {
//   children: JSX.Element;
// }

const TopBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );

  const currentSideBar = React.useContext(SideBarContext);

  const location = useLocation();

  const [openPopper, setOpenPopper] = React.useState(false);
  const [anchorElPopper, setAnchorElPopper] =
    React.useState<null | HTMLElement>(null);
  const [popperContent, setPopperContent] = React.useState([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, children: any) => {
    setAnchorElPopper(event.currentTarget);
    setOpenPopper(true);
    setPopperContent(children);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPopper(event.currentTarget);
    setOpenPopper(false);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${240}px)` },
        ml: { sm: `${240}px` },
        height: 63,
        bgcolor: "#fcfafa",
      }}
      elevation={4}
    >
      <Box >
        <Toolbar sx={{ bgcolor: "#fcfafa" }}>
          {
            // If the screen size is small, we show the meun icon
          }
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                >
                  <Typography textAlign="center">
                    {t(page.name as unknown as TemplateStringsArray)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {
            // If the screen size is small, we show the Logo instead of the meun item
          }
          <>
            <FitnessCenterIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src="/Logo.png" alt="Logo" width="200" height="100" />
            </Typography>
          </>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navigations.map((page) => (
              <Tooltip
                title={
                  <Paper elevation={2}>
                    <MenuList>
                      {popperContent.map((value: any) => {
                        return (
                          <MenuItem
                            component={Link}
                            to={value.path}
                            onClick={() => {
                              currentSideBar?.setSideContent(popperContent);
                            }}
                          >
                            <ListItemText>{value.name}</ListItemText>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Paper>
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'transparent',
                      '& .MuiTooltip-arrow': {
                        color: 'transparent',
                      },
                    },
                  },
                }}
                // sx={{backgroundColor: 'transparent'}}
              >
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "black",
                    display: "block",
                    px: 5,
                    "&:hover": {
                      backgroundColor: "#cacbcc",
                    },
                    bgcolor:
                      location.pathname.split("/")[1] ===
                      page.path.split("/")[1]
                        ? "#cacbcc"
                        : "none",
                    borderRadius: 0,
                  }}
                  component={Link}
                  to={page.path}
                  onMouseOver={(e: React.MouseEvent<HTMLElement>) =>
                    handleClick(e, page.children)
                  }
                >
                  {t(page.name as unknown as TemplateStringsArray)}
                </Button>
              </Tooltip>
            ))}
          </Box>
          {/* <Box sx={{ flexGrow: 1 }} /> */}

          <Box sx={{ xs: "flex" }}>
            <Tooltip title="Change Language">
              <IconButton
                onClick={handleOpenLangMenu}
                sx={{ p: 2 }}
                size="large"
                edge="end"
                // color="inherit"
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="change-lang-appbar"
              anchorEl={anchorElLang}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              {lang_choice.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    changeLanguage(setting.value);
                  }}
                  sx={{ py: 0, px: 0.5 }}
                >
                  <Checkbox
                    checked={i18n.language === setting.value}
                    inputProps={{
                      "aria-label": "Language change To " + setting.name,
                    }}
                  />
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ xs: "flex" }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 2 }}
                size="large"
                edge="end"
                // color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default TopBar;
