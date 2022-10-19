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

function App() {
  const routing = useRoutes(routes);
  return <> { routing } </>;
}

export default App;
