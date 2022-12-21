import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  clearAuthentication,
  selectIsVertified,
  selectRole,
} from "../store/authSlice";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions } from "@mui/material";
import CustomButton from "../components/Button/CustomButton";

interface PropsType {
  children: JSX.Element;
  content: string; // for showing the navgation bar to user
}

const MainLayout = (props: PropsType) => {
  const { t } = useTranslation();

  const isVertified = useAppSelector(selectIsVertified);
  const role = useAppSelector(selectRole);
  // console.log('role in mainlayout -> ', role)
  const dispatch = useAppDispatch();

  // when we logout, we remove the access_token and set auth state to false
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(clearAuthentication());
  };

  return (
    <div>
      <TopBar />
      <Box
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "row",
          gap: "3px",
          minHeight: "100vh",
        }}
      >
        <SideBar content={props.content} />
        <div
          style={{
            width: "100%",
            backgroundColor: "#f5f5f5",
            display: "flex",
            // overflow: 'scroll',
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ height: 65 }}></div>
          <div
            style={{
              // height: `calc(100% - ${170}px)`,
              // https://stackoverflow.com/questions/58548583/why-does-height-100-on-a-child-element-not-apply-when-the-parent-element-has-a
              // minHeight: `calc(100% - ${170}px)`,
              padding: 20,
              flexGrow: 0.9,
            }}
          >
            {(role.includes("student") && isVertified) ||
            role.includes("coach") ? (
              props.children
            ) : (
              <Dialog open={true}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ fontSize: 15 }}
                  >
                    {t("Please contact your coach to verify your account.")}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <CustomButton
                    shownText={"Logout"}
                    variant={"primary"}
                    onClick={handleLogout}
                  />
                </DialogActions>
              </Dialog>
            )}
            {/* {props.children} */}
          </div>
          <div
            style={{
              minHeight: "60px",
              backgroundColor: "white",
              display: "flex",
              flexGrow: 0.05,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              {t("Copyright")}
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default MainLayout;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
