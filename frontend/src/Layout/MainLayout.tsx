import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Typography from "@mui/material/Typography";
interface PropsType {
  children: JSX.Element;
  content: string;
}

const MainLayout = (props: PropsType) => {
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
            display:'flex',
            // overflow: 'scroll',
            flexDirection: "column",
          }}
        >
          <div style={{ height: 65 }}></div>
          <div
            style={{
              // height: `calc(100% - ${170}px)`, 
              // https://stackoverflow.com/questions/58548583/why-does-height-100-on-a-child-element-not-apply-when-the-parent-element-has-a
              // minHeight: `calc(100% - ${170}px)`,
              padding: 20,
              flexGrow:0.9
            }}
          >
            {props.children}
          </div>
          <div
            style={{
              minHeight: "60px",
              backgroundColor: "white",
              display: "flex",
              flexGrow:0.1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              Copyright © Jacky Luo. Just For Fun
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default MainLayout;
