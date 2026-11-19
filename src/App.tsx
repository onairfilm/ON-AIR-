import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import ArchivePage from "./components/ArchivePage";
import IdeaPage from "./components/IdeaPage";
import ScenarioPage from "./components/ScenarioPage";
import ShootingPage from "./components/ShootingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/archive" element={<ArchivePage />} />

        <Route path="/ideas" element={<IdeaPage />} />

        <Route path="/scenario" element={<ScenarioPage />} />

        <Route path="/story" element={<ScenarioPage />} />

        <Route path="/shooting" element={<ShootingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;