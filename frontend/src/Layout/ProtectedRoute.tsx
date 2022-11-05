import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Typography from "@mui/material/Typography";
import { selectCount } from "../store/counterSlice";
import { selectAuth, selectStatus } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface PropsType {
  children: JSX.Element;
}

const ProtectedRoute = (props: PropsType) => {
  const auth = useAppSelector(selectAuth);
  const status = useAppSelector(selectStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  if (status !== "idle") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height:'100vh'
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return <>{props.children}</>;
};
export default ProtectedRoute;
