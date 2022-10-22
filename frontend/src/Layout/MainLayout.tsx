import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
interface PropsType {
  children: JSX.Element;
  content: string;
}

const MainLayout = (props: PropsType) => {
  return (
    <Box sx={{ display: "flex", flexDirection: 'row' }}>
      <CssBaseline />
      <TopBar />
      <SideBar content={props.content} />
      <Box
        component="main"
        sx={{ p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
        <Toolbar />
        <div
          style={{
            width: "100%",
            height: `calc(100vh - ${140}px)`,
            backgroundColor: "#f5f5f5",
          }}
        >
          {props.children}
        </div>

        <div style={{position: 'fixed', bottom: 0, height: 30, width: `calc(100% - ${240}px)`}}>
          <Typography variant="subtitle2" gutterBottom sx={{textAlign: 'center'}}>
            Copyright © Jacky Luo. Just For Fun
          </Typography>
        </div>
      </Box>
    </Box>
  );
};
export default MainLayout;
