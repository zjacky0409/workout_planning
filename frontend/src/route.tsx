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
import FoodView from "./view/FoodView";
import StudentManView from "./view/StudentMan";
import RoleCheckLayout from "./layout/RoleCheckLayout";
// To define different route
// ref: https://reactrouter.com/en/main/hooks/use-routes
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet></Outlet>,
    children: [
      { path: "/", element: <LoginView /> },
      { path: "/login", element: <LoginView /> },
      // { path: '401', element: <UnauthorizedView /> },
      { path: "/registration", element: <RegistrationView /> },
      { path: "*", element: <LoginView /> },
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
      { path: "/diet/food", element: <FoodView day="rest_day" /> },
    ],
  },
  {
    path: "progress",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/progress",
        element: <Navigate to="/progress/trainning" replace={true} />,
      },
      {
        path: "/progress/trainning",
        element: <ProgressView key={'/progress/trainning'}/>,
      },
      {
        path: "/progress/weight",
        element: <ProgressView key={'/progress/weight'}/>,
      },
    ],
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
        element: <ExercisesView type={"Back"} subtype={"Summary"} />,
      },
      {
        path: "/exercises/back/upper",
        element: <ExercisesView type={"Back"} subtype={"Upper"} />,
      },
      {
        path: "/exercises/back/lat",
        element: <ExercisesView type={"Back"} subtype={"Lat"} />,
      },
      {
        path: "/exercises/back/trap",
        element: <ExercisesView type={"Back"} subtype={"Trap"} />,
      },
      {
        path: "/exercises/chest/summary",
        element: <ExercisesView type={"Chest"} subtype={"Summary"} />,
      },
      {
        path: "/exercises/chest/upper_chest",
        element: <ExercisesView type={"Chest"} subtype={"Upper"} />,
      },
      {
        path: "/exercises/chest/lower_chest",
        element: <ExercisesView type={""} subtype={"Lower"} />,
      },
      {
        path: "/exercises/chest/middle_chest",
        element: <ExercisesView type={"Chest"} subtype={"Middle"} />,
      },
      {
        path: "/exercises/chest/inner_chest",
        element: <ExercisesView type={"Chest"} subtype={"Inner"} />,
      },
      {
        path: "/exercises/chest/outer_chest",
        element: <ExercisesView type={"Chest"} subtype={"Outter"} />,
      },
      {
        path: "/exercises/chest",
        element: <ExercisesView type={"Chest"} subtype={"Summary"} />,
      },
      {
        path: "/exercises/arm",
        element: <Navigate to="/exercises/arm/summary" replace={true} />,
      },
      {
        path: "/exercises/arm/summary",
        element: <ExercisesView type={"Arms"} subtype={"Summary"} />,
      },
      {
        path: "/exercises/arm/former",
        element: <ExercisesView type={"Arms"} subtype={"Former"} />,
      },
      {
        path: "/exercises/arm/bi",
        element: <ExercisesView type={"Arms"} subtype={"Bicept"} />,
      },
      {
        path: "/exercises/arm/tri",
        element: <ExercisesView type={"Arms"} subtype={"Tricept"} />,
      },
      {
        path: "/exercises/leg",
        element: <Navigate to="/exercises/leg/summary" replace={true} />,
      },
      {
        path: "/exercises/leg/summary",
        element: <ExercisesView type={"Legs"} subtype={"Summary"} />,
      },
      {
        path: "/exercises/leg/quad",
        element: <ExercisesView type={"Legs"} subtype={"Quad"} />,
      },
      {
        path: "/exercises/leg/harmstring",
        element: <ExercisesView type={"Legs"} subtype={"Harmstring"} />,
      },
      {
        path: "/exercises/leg/hip",
        element: <ExercisesView type={"Legs"} subtype={"Hip"} />,
      },
      {
        path: "/exercises/shoulder/summary",
        element: <ExercisesView type={"Shoulder"} subtype={"Summary"} />,
      },
      {
        path: "/exercises/shoulder/rear_delt",
        element: <ExercisesView type={"Shoulder"} subtype={"Rear Delt"} />,
      },
      {
        path: "/exercises/shoulder/front_delt",
        element: <ExercisesView type={"Shoulder"} subtype={"Front Delt"} />,
      },
      {
        path: "/exercises/shoulder/side_delt",
        element: <ExercisesView type={"Shoulder"} subtype={"Side Delt"} />,
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
        element: <ExercisesView type={"Core"} subtype={"Upper"} />,
      },
      {
        path: "/exercises/core/lower",
        element: <ExercisesView type={"Core"} subtype={"Lower"} />,
      },
      {
        path: "/exercises/core/summary",
        element: <ExercisesView type={"Core"} subtype={"Summary"} />,
      },
      {
        path: "/exercises/core/full",
        element: <ExercisesView type={"Core"} subtype={"Full"} />,
      },
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
    ],
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
      },
    ],
  },
  {
    path: "coach",
    element: (
      <ProtectedRoute>
        <RoleCheckLayout requiredRole={"coach"}>
          <Outlet />
        </RoleCheckLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/coach",
        element: <Navigate to="/coach/student_management" replace={true} />,
      },
      {
        path: "/coach/student_management",
        element: <StudentManView />,
      },
    ],
  },
];

export default routes;
