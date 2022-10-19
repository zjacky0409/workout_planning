import DietView from "./View/DietView";
import ProgramView from "./View/ProgramView";
import ExercisesView from "./View/ExercisesView";
import UsefulResourceView from "./View/UsefulResourceView";
import ProgressView from "./View/ProgressView";
import { RouteObject } from "react-router-dom";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <DietView />,
    //   children: [
    //     {
    //       path: "messages",
    //       element: <DashboardMessages />,
    //     },
    //     { path: "tasks", element: <DashboardTasks /> },
    //   ],
  },
  { path: "diet", element: <DietView /> },
    { path: "progress", element: <ProgressView /> },
    { path: "exercises", element: <ExercisesView /> },
    { path: "useful_resources", element: <UsefulResourceView /> },
    { path: "program", element: <ProgramView/> }
  ]

export default routes;
