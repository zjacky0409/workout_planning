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
    path: "/:lng/",
    element: <Outlet></Outlet>,
    children: [
      { path: "", element: <LoginView /> },
      { path: "login", element: <LoginView /> },
      // { path: '401', element: <UnauthorizedView /> },
      { path: "registration", element: <RegistrationView /> },
      // { path: "*", element: <DietView day="trainning_day" /> },
    ],
  },
  {
    path: "/:lng/diet/",
    element: (
      <ProtectedRoute>
        <Outlet></Outlet>
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "",
      //   element: <Navigate to="/:lng/diet/trainning_day" replace={true} />,
      // },
      {
        path: "trainning_day",
        element: <DietView day="trainning_day" />,
      },
      { path: "rest_day", element: <DietView day="rest_day" /> },
      { path: "food", element: <FoodView day="rest_day" /> },
    ],
  },
  {
    path: "/:lng/progress/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "",
      //   element: <Navigate to="/progress/trainning" replace={true} />,
      // },
      {
        path: "trainning",
        element: <ProgressView key={'/progress/trainning'}/>,
      },
      {
        path: "weight",
        element: <ProgressView key={'/progress/weight'}/>,
      },
    ],
  },
  {
    path: "/:lng/exercises/",
    element: (
      <ProtectedRoute>
        <Outlet></Outlet>
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "",
      //   element: <Navigate to="/exercises/back" replace={true} />,
      // },
      // {
      //   path: "back",
      //   element: <Navigate to="/exercises/back/summary" replace={true} />,
      // },
      {
        path: "back/summary",
        element: <ExercisesView type={"Back"} subtype={"Summary"} />,
      },
      {
        path: "back/upper",
        element: <ExercisesView type={"Back"} subtype={"Upper"} />,
      },
      {
        path: "back/lat",
        element: <ExercisesView type={"Back"} subtype={"Lat"} />,
      },
      {
        path: "back/trap",
        element: <ExercisesView type={"Back"} subtype={"Trap"} />,
      },
      {
        path: "chest/summary",
        element: <ExercisesView type={"Chest"} subtype={"Summary"} />,
      },
      {
        path: "chest/upper_chest",
        element: <ExercisesView type={"Chest"} subtype={"Upper"} />,
      },
      {
        path: "chest/lower_chest",
        element: <ExercisesView type={""} subtype={"Lower"} />,
      },
      {
        path: "chest/middle_chest",
        element: <ExercisesView type={"Chest"} subtype={"Middle"} />,
      },
      {
        path: "chest/inner_chest",
        element: <ExercisesView type={"Chest"} subtype={"Inner"} />,
      },
      {
        path: "chest/outer_chest",
        element: <ExercisesView type={"Chest"} subtype={"Outter"} />,
      },
      {
        path: "chest",
        element: <ExercisesView type={"Chest"} subtype={"Summary"} />,
      },
      // {
      //   path: "arm",
      //   element: <Navigate to="/exercises/arm/summary" replace={true} />,
      // },
      {
        path: "arm/summary",
        element: <ExercisesView type={"Arms"} subtype={"Summary"} />,
      },
      {
        path: "arm/former",
        element: <ExercisesView type={"Arms"} subtype={"Former"} />,
      },
      {
        path: "arm/bi",
        element: <ExercisesView type={"Arms"} subtype={"Bicept"} />,
      },
      {
        path: "arm/tri",
        element: <ExercisesView type={"Arms"} subtype={"Tricept"} />,
      },
      // {
      //   path: "leg",
      //   element: <Navigate to="/exercises/leg/summary" replace={true} />,
      // },
      {
        path: "leg/summary",
        element: <ExercisesView type={"Legs"} subtype={"Summary"} />,
      },
      {
        path: "leg/quad",
        element: <ExercisesView type={"Legs"} subtype={"Quad"} />,
      },
      {
        path: "leg/harmstring",
        element: <ExercisesView type={"Legs"} subtype={"Harmstring"} />,
      },
      {
        path: "leg/hip",
        element: <ExercisesView type={"Legs"} subtype={"Hip"} />,
      },
      {
        path: "shoulder/summary",
        element: <ExercisesView type={"Shoulder"} subtype={"Summary"} />,
      },
      {
        path: "shoulder/rear_delt",
        element: <ExercisesView type={"Shoulder"} subtype={"Rear Delt"} />,
      },
      {
        path: "shoulder/front_delt",
        element: <ExercisesView type={"Shoulder"} subtype={"Front Delt"} />,
      },
      {
        path: "shoulder/side_delt",
        element: <ExercisesView type={"Shoulder"} subtype={"Side Delt"} />,
      },
      // {
      //   path: "shoulder/summary",
      //   element: <Navigate to="/diet/trainning_day" replace={true} />,
      // },
      // {
      //   path: "core",
      //   element: <Navigate to="/exercises/core/summary" replace={true} />,
      // },
      {
        path: "core/upper",
        element: <ExercisesView type={"Core"} subtype={"Upper"} />,
      },
      {
        path: "core/lower",
        element: <ExercisesView type={"Core"} subtype={"Lower"} />,
      },
      {
        path: "core/summary",
        element: <ExercisesView type={"Core"} subtype={"Summary"} />,
      },
      {
        path: "core/full",
        element: <ExercisesView type={"Core"} subtype={"Full"} />,
      },
    ],
  },
  {
    path: "/:lng/useful_resources",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "",
      //   element: <Navigate to="/useful_resources/exercise" replace={true} />,
      // },
      {
        path: "exercise",
        element: <UsefulResourceView />,
      },
      {
        path: "other",
        element: <UsefulResourceView />,
      },
    ],
  },
  {
    path: "/:lng/program",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      // {
      //   path: "",
      //   element: <Navigate to="/program/pull_day" replace={true} />,
      // },
      {
        path: "pull_day",
        element: <ProgramView />,
      },
      {
        path: "push_day",
        element: <ProgramView />,
      },
      {
        path: "legs_day",
        element: <ProgramView />,
      },
      {
        path: "arms_day",
        element: <ProgramView />,
      },
    ],
  },
  {
    path: "/:lng/coach",
    element: (
      <ProtectedRoute>
        <RoleCheckLayout requiredRole={"coach"}>
          <Outlet />
        </RoleCheckLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/coach/student_management" replace={true} />,
      },
      {
        path: "student_management",
        element: <StudentManView />,
      },
    ],
  },
];

export default routes;
