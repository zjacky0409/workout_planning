import "./App.css";
import DietView from "./View/DietView";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import ProgramView from "./View/ProgramView";
import ExercisesView from "./View/ExercisesView";
import UsefulResourceView from "./View/UsefulResourceView";

function App() {
  return (
    <BrowserRouter>
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
