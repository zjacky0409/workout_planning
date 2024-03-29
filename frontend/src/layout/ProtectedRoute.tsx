import { selectAuth, selectRole, selectStatus } from "../store/authSlice";
import { useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from 'react-i18next'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import { useGoTo } from "../customHook/useGoTo";

interface PropsType {
  children: JSX.Element;
}

const ProtectedRoute = (props: PropsType) => {
  const auth = useAppSelector(selectAuth);

  // status for vertify the jet token and get the user info from the server
  const status = useAppSelector(selectStatus);
  
  const { t } = useTranslation()

  const navigate = useGoTo();

  // if the auth state is false, we redirect to the login page
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  // when we vertify the jet token and get the user info from the server, we show loading page to the user
  if (status !== "idle") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100vh',
          flexDirection: 'column'
        }}
      >
        {/* <CircularProgress /> */}
        <LoadingSpinner variant="primary" size="medium" />
        <h2>{t('Loading...')}</h2>
      </div>
    );
  }


  // when we vertify the jwt token, everything are correct
  return <>{props.children}</>;
};
export default ProtectedRoute;
