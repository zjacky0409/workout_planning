import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./route";
import { SideBarContext } from "./Context/SideBarContext";
import { useState } from "react";
import GetConfigLayout from "./Layout/GetConfigLayout";
import { SideBarObject } from "./common";

function App() {
  const routing = useRoutes(routes);
  const [sideContent, setSideContent] = useState<SideBarObject[]>([])
  return <SideBarContext.Provider value={{ sideContent, setSideContent }} > <GetConfigLayout><>{routing}</></GetConfigLayout> </SideBarContext.Provider>;
}

export default App;
