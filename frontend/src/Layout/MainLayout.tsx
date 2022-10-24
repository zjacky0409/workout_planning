import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
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
        sx={{ p: 0, display: 'flex', flexDirection: 'row', gap: '3px', minHeight: '100vh' }}
      >
        <SideBar content={props.content} />
        <div
          style={{
            width: "100%",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div style={{ height: 65 }}></div>
          <div style={{ minHeight: `calc(100% - ${170}px)`, padding:20 }}>{props.children}</div>
          <div style={{
            height: '60px', backgroundColor: 'white', display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
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
