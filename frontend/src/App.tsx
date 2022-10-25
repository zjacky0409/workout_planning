import "./App.css";
import DietView from "./View/DietView";
import { Routes, Route, useRoutes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { BrowserRouter as Router } from "react-router-dom";
import ProgramView from "./View/ProgramView";
import ExercisesView from "./View/ExercisesView";
import UsefulResourceView from "./View/UsefulResourceView";
import ProgressView from "./View/ProgressView";
import routes from "./route";
import { SideBarContext } from "./Context/SideBarContext";
import { useState } from "react";

function App() {
  const routing = useRoutes(routes);


  interface SideBarElement {
    path: string,
    name: string,
    icon: string
  }

  const [sideContent, setSideContent] = useState<SideBarElement[]>([])
  return <SideBarContext.Provider value={{sideContent, setSideContent}} > { routing } </SideBarContext.Provider>;
}

export default App;
