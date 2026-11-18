import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import ArchivePage from "./components/ArchivePage";
import IdeaPage from "./components/IdeaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/ideas" element={<IdeaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;