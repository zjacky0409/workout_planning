import { selectAuth, selectRole, selectStatus } from "../store/authSlice";
import { useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'

interface PropsType {
  children: JSX.Element;
  requiredRole: string;
}


// TODO: 
const RoleCheckLayout = (props: PropsType) => {
  const auth = useAppSelector(selectAuth);

  // status for vertify the jet token and get the user info from the server
  const status = useAppSelector(selectStatus);
  const role = useAppSelector(selectRole);

  const { t } = useTranslation()

  const navigate = useNavigate();

  // if the auth state is false, we redirect to the login page
  useEffect(() => {
    console.log(role)
    console.log(props.requiredRole)
    if (!role.includes(props.requiredRole)) {
      navigate("/");
    }
  }, [auth, navigate, props.requiredRole, role]);

  return <>{props.children}</>;
};
export default RoleCheckLayout;
