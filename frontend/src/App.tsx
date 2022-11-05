import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./route";
import { SideBarContext } from "./context/SideBarContext";
import { useState } from "react";
import GetConfigLayout from "./layout/GetConfigLayout";
import { SideBarObject } from "./common";
import RoutingLayout from "./layout/RoutingLayout";
function App() {
  // const routing = useRoutes(routes); // if we change the route, we will triger the rerander
  const [sideContent, setSideContent] = useState<SideBarObject[]>([]);
  console.log("HIHI");
  return (
    <SideBarContext.Provider value={{ sideContent, setSideContent }}>
      <GetConfigLayout>
        <RoutingLayout />
        {/* <>{routing}</>  */}
      </GetConfigLayout>
    </SideBarContext.Provider>
  );
}

export default App;
