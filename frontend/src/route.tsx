import DietView from "./view/DietView";
import ProgramView from "./view/ProgramView";
import ExercisesView from "./view/ExercisesView";
import UsefulResourceView from "./view/UsefulResourceView";
import ProgressView from "./view/ProgressView";
import { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginView from "./view/LoginView";
import ProtectedRoute from "./layout/ProtectedRoute";
import RegistrationView from "./view/RegistrationView";

// To define different route
// ref: https://reactrouter.com/en/main/hooks/use-routes
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Outlet></Outlet>
    ),
    children: [
      { path: '/', element: <LoginView /> },
      { path: '/login', element: <LoginView /> },
      // { path: '401', element: <UnauthorizedView /> },
      { path: '/registration', element: <RegistrationView /> },
      { path: '*', element: <LoginView /> },
    ],
  },
  // {
  //   path: "/login",
  //   element: <LoginView />,
  //   //   children: [
  //   //     {
  //   //       path: "messages",
  //   //       element: <DashboardMessages />,
  //   //     },
  //   //     { path: "tasks", element: <DashboardTasks /> },
  //   //   ],
  // },
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
  {
    path: "progress", element: <ProtectedRoute><Outlet /></ProtectedRoute>,
    children:
      [
        {
          path: "/progress",
          element: <Navigate to="/progress/trainning" replace={true} />,
        },
        {
          path: "/progress/trainning",
          element: <ProgressView />,
        },
        {
          path: "/progress/weight",
          element: <ProgressView />,
        }
      ]

  },
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
        element: <Navigate to="/exercises/back/summary" replace={true} />,
      },
      {
        path: "/exercises/back/summary",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/back/upper",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/back/lat",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/back/trap",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/chest/summary",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/chest/upper_chest",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/chest/lower_chest",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/chest",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/arm",
        element: <Navigate to="/exercises/arm/summary" replace={true} />,

      },
      {
        path: "/exercises/arm/summary",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/arm/former",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/arm/bi",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/arm/tri",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/leg",
        element: <Navigate to="/exercises/leg/summary" replace={true} />,
      },
      {
        path: "/exercises/leg/summary",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/leg/quad",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/leg/harmstring",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/leg/hip",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/shoulder/summary",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/shoulder/rear_delt",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/shoulder/front_delt",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/shoulder/side_delt",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/shoulder/summary",
        element: <Navigate to="/diet/trainning_day" replace={true} />,
      },
      {
        path: "/exercises/core",
        element: <Navigate to="/exercises/core/summary" replace={true} />,
      },
      {
        path: "/exercises/core/upper",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/core/lower",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/core/summary",
        element: <ExercisesView />,
      },
      {
        path: "/exercises/core/full",
        element: <ExercisesView />,
      }
    ],
  },
  {
    path: "useful_resources",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/useful_resources",
        element: <Navigate to="/useful_resources/exercise" replace={true} />,
      },
      {
        path: "/useful_resources/exercise",
        element: <UsefulResourceView />,
      },
      {
        path: "/useful_resources/other",
        element: <UsefulResourceView />,
      },
    ]
  },
  {
    path: "program",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/program",
        element: <Navigate to="/program/pull_day" replace={true} />,
      },
      {
        path: "/program/pull_day",
        element: <ProgramView />,
      },
      {
        path: "/program/push_day",
        element: <ProgramView />,
      },
      {
        path: "/program/legs_day",
        element: <ProgramView />,
      },
      {
        path: "/program/arms_day",
        element: <ProgramView />,
      }
    ]
  },
];

export default routes;
