import "./App.css";
import DietView from "./View/DietView";
import { Routes, Route, useRoutes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import ProgramView from "./View/ProgramView";
import ExercisesView from "./View/ExercisesView";
import UsefulResourceView from "./View/UsefulResourceView";
import ProgressView from "./View/ProgressView";
import routes from "./route";

function App() {

  const routing = useRoutes(routes)
  return (
    <BrowserRouter>
     {routing}
      <Routes>
        <Route
          index
          element={
            <MainLayout>
              <p>Main Page2</p>
            </MainLayout>
          }
        />
        <Route path="diet" element={<DietView />} />
        <Route path="useful_resource" element={<UsefulResourceView />} />
        <Route path="exercises" element={<ExercisesView />} />
        <Route path="program" element={<ProgramView />} />
        <Route path="progress" element={<ProgressView />} />

       

        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        <Route
          path="*"
          element={
            <MainLayout>
              <p>Main Page3</p>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
