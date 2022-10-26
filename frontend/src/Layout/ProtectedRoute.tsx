import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Typography from "@mui/material/Typography";
import { selectCount } from "../store/counterSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface PropsType {
  children: JSX.Element;
}

const ProtectedRoute = (props: PropsType) => {
  const count = useAppSelector(selectCount);
  const navigate = useNavigate();

  useEffect(() => {
    if (count < 10) {
      navigate("/login");
    }
  }, [count, navigate]);

  return <>{props.children}</>;
}
export default ProtectedRoute;
