import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface PropsType {
  children: JSX.Element;
  content: string; // for showing the navgation bar to user
}

const MainLayout = (props: PropsType) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      {/* <CssBaseline /> */}

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
            {props.children}
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
