import DietView from "./View/DietView";
import ProgramView from "./View/ProgramView";
import ExercisesView from "./View/ExercisesView";
import UsefulResourceView from "./View/UsefulResourceView";
import ProgressView from "./View/ProgressView";
import { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginView from "./View/LoginView";
import ProtectedRoute from "./Layout/ProtectedRoute";
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DietView day="test" />
      </ProtectedRoute>
    ),
    //   children: [
    //     {
    //       path: "messages",
    //       element: <DashboardMessages />,
    //     },
    //     { path: "tasks", element: <DashboardTasks /> },
    //   ],
  },
  {
    path: "/login",
    element: <LoginView />,
    //   children: [
    //     {
    //       path: "messages",
    //       element: <DashboardMessages />,
    //     },
    //     { path: "tasks", element: <DashboardTasks /> },
    //   ],
  },
  {
    path: "/diet",
    element: (
      <ProtectedRoute>
        <Outlet></Outlet>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/diet",
        element: <Navigate to="/diet/trainning_day" replace={true} />,
      },
      {
        path: "/diet/trainning_day",
        element: <DietView day="trainning_day" />,
      },
      { path: "/diet/rest_day", element: <DietView day="rest_day" /> },
    ],
  },
  { path: "progress", element: <ProgressView /> },
  {
    path: "exercises",
    element: (
      <ProtectedRoute>
        <Outlet></Outlet>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/exercises",
        element: <Navigate to="/exercises/back" replace={true} />,
      },
      {
        path: "/exercises/back",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/chest",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/arm",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/leg",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/shoulder",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/core",
        element: <ExercisesView />,
      },
    ],
  },
  {
    path: "useful_resources",
    element: (
      <ProtectedRoute>
        <UsefulResourceView />
      </ProtectedRoute>
    ),
  },
  {
    path: "program",
    element: (
      <ProtectedRoute>
        <ProgramView />
      </ProtectedRoute>
    ),
  },
];

export default routes;
