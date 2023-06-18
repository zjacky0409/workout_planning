import { selectAuth, selectRole, selectStatus } from "../store/authSlice";
import { useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { useGoTo } from "../customHook/useGoTo";

interface PropsType {
  children: JSX.Element;
  requiredRole: string;
}

const RoleCheckLayout = (props: PropsType) => {
  const auth = useAppSelector(selectAuth);

  // status for vertify the jet token and get the user info from the server
  const status = useAppSelector(selectStatus);
  const role = useAppSelector(selectRole);

  const navigate = useGoTo();


  useEffect(() => {
    // if user role is not match the required role, we redirect the user to the main page
    if (!role.includes(props.requiredRole)) {
      navigate("/");
    }
  }, [auth, navigate, props.requiredRole, role]);

  return <>{props.children}</>;
};
export default RoleCheckLayout;
