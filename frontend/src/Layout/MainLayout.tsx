import Box from "@mui/material/Box";
import SideBar from './SideBar'
import TopBar from './TopBar'
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

interface PropsType {
  children: JSX.Element;
}

const MainLayout = (props: PropsType) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar />
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
export default MainLayout;
