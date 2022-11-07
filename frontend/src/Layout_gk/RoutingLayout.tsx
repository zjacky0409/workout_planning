import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routes from "../route";

const RoutingLayout = () => {
  const routing = useRoutes(routes);
  useEffect(() => {
    console.log('routing == ', routing)
  },[routing])
  return <>{routing}</>;
};
export default RoutingLayout;
