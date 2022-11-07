import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";
import { navigations } from "../navgation";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import { SideBarContext } from "../context/SideBarContext";
import { useLocation } from "react-router-dom";
import NestListItem from "../components/NestListItem";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { clearAuthentication, selectUsername } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { PageObject } from "../common";
const lang_choice = [
  { name: "English", value: "en" },
  { name: "繁體中文", value: "zh_hk" },
  { name: "简体中文", value: "zh_cn" },
];

// interface PropsType {
//   children: JSX.Element;
// }

const TopBar = () => {

  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectUsername)
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

  const [popperContent, setPopperContent] = React.useState<PageObject[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, children: PageObject[]) => {
    setPopperContent(children);
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

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    dispatch(clearAuthentication())
    setAnchorElUser(null);
  }

  const settings = [{ name: "Logout", action: handleLogout }];


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
        bgcolor: "#ffffff",
      }}
      elevation={4}
    >
      <Box>
        <Toolbar sx={{ bgcolor: "#ffffff" }}>
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
            >
              <MenuIcon />
            </IconButton>
            <Dialog
              fullScreen
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            // TransitionComponent={Transition}
            >
              <AppBar sx={{ position: "relative", bgcolor: '#ffffff' }}>
                <Toolbar sx={{ bgcolor: '#ffffff' }}>
                  <IconButton
                    edge="start"
                    // color="inherit"
                    onClick={handleCloseNavMenu}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              {navigations.map((page) => (
                <MenuItem key={page.name} sx={{ p: 0 }}>
                  {page.children.length > 0 ? (
                    <NestListItem
                      shownText={page.icon + page.name}
                      content={page.children}
                      action={handleCloseNavMenu}
                    />
                  ) : (
                    <MenuItem
                      key={page.path + "_menuItem"}
                      component={Link}
                      onClick={handleCloseNavMenu}
                      to={page.path}
                    >
                      <ListItemText sx={{ fontWeight: 'bold' }}>
                        {page.icon}{" "}
                        {t(page.name as unknown as TemplateStringsArray)}
                      </ListItemText>
                    </MenuItem>
                  )}
                </MenuItem>
              ))}
            </Dialog>
          </Box>

          {
            // If the screen size is small, we show the  Logo instead of the meun item
          }
          <>
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
              <img src="/Logo.svg" alt="Logo" width="200" height="100" />
            </Typography>
          </>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navigations.map((page) => (
              <Tooltip
                key={page.path}
                placement="bottom-start"
                title={
                  <Paper elevation={2} sx={{ width: "40vh" }}>
                    <MenuList sx={{ display: "flex", flexWrap: "wrap" }}>
                      {popperContent.map((value: PageObject) => {
                        return (
                          <MenuItem
                            key={value.path + "_menuItem"}
                            component={Link}
                            to={value.path}
                            sx={{ width: "50%" }}
                          >
                            <ListItemText>
                              {value.icon} {value.name}
                            </ListItemText>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Paper>
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "transparent",
                      "& .MuiTooltip-arrow": {
                        color: "transparent",
                      },
                    },
                  },
                }}
              // sx={{backgroundColor: 'transparent'}}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: "black",
                      display: "block",
                      px: 3,
                      // "&:hover": {
                      //   backgroundColor: "#cacbcc",
                      // },
                      // bgcolor:
                      //   location.pathname.split("/")[1] ===
                      //   page.path.split("/")[1]
                      //     ? "#cacbcc"
                      //     : "none",
                      borderRadius: 0,
                    }}
                    component={Link}
                    to={page.path}
                    onMouseOver={(e: React.MouseEvent<HTMLElement>) =>
                      handleClick(e, page.children)
                    }
                  >
                    {page.icon}
                    {t(page.name as unknown as TemplateStringsArray)}
                  </Button>
                  {location.pathname.split("/")[1] ===
                    page.path.split("/")[1] && (
                      <Divider
                        sx={{ background: "skyblue", borderBottomWidth: 5 }}
                      />
                    )}
                </div>
              </Tooltip>
            ))}
          </Box>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Typography sx={{ color: 'black' }}>Welcome, {userName}</Typography>

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
                    handleCloseLangMenu();
                  }}
                  sx={{ py: 0, px: 1 }}
                >
                  <Checkbox
                    checked={i18n.language === setting.value}
                    inputProps={{
                      "aria-label": "Language change To " + setting.name,
                    }}
                    size="small"
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
                <MenuItem key={setting.name+'_setting'} onClick={setting.action}>
                  <Typography textAlign="center">{setting.name}</Typography>
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