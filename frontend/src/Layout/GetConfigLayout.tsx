import { selectAuth } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { getUserWithJwt } from "../store/authSlice";
import { useEffect } from "react";

interface PropsType {
  children: JSX.Element;
}

const GetConfigLayout = (props: PropsType) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  console.log("HIHI");

  useEffect(() => {
    if (auth === true) {
      dispatch(getUserWithJwt());
    }
  }, [auth, dispatch]);

  return <>{props.children}</>;
};
export default GetConfigLayout;
