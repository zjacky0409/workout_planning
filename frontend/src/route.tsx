import DietView from "./View/DietView";
import ProgramView from "./View/ProgramView";
import ExercisesView from "./View/ExercisesView";
import UsefulResourceView from "./View/UsefulResourceView";
import ProgressView from "./View/ProgressView";
import { RouteObject } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <DietView day="test" />,
    //   children: [
    //     {
    //       path: "messages",
    //       element: <DashboardMessages />,
    //     },
    //     { path: "tasks", element: <DashboardTasks /> },
    //   ],
  },
  {
    path: "/diet", element: <Outlet></Outlet>,
    children: [
      {
        path: "/diet",
        element: <Navigate to='/diet/trainning_day' replace={true} />
      },
      {
        path: "/diet/trainning_day",
        element: <DietView day="trainning_day" />,
      },
      { path: "/diet/rest_day", element: <DietView day="rest_day" /> },
    ],
  },
  { path: "progress", element: <ProgressView /> },
  { path: "exercises", element: <ExercisesView /> },
  { path: "useful_resources", element: <UsefulResourceView /> },
  { path: "program", element: <ProgramView /> }
]

export default routes;
