import { selectAuth } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { getUserWithJwt } from "../store/authSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PropsType {
  children: JSX.Element;
}

const GetConfigLayout = (props: PropsType) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();


  // when the auth state is true(i.e. the jwt token exist on the localstorage or we login successfully)
  // we need to get the user info and the config from the server
  useEffect(() => {
    if (auth === true) {
      dispatch(getUserWithJwt());
    }
  }, [auth, dispatch]);

  return <>{props.children}</>;
};
export default GetConfigLayout;
