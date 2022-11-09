import { useRoutes } from "react-router-dom";
import routes from "../route";

// why I need this Layout:
// because i dont want web app enter/call GetConfigLayout when the route changed
const RoutingLayout = () => {
  const routing = useRoutes(routes);
  return <>{routing}</>;
};
export default RoutingLayout;
