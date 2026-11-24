
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// نحتفظ بتصميم شاشة التحميل الأصلي
import "./components/Hero.css";

import ArchivePage from "./components/ArchivePage";
import IdeaPage from "./components/IdeaPage";
import ScenarioPage from "./components/ScenarioPage";
import ShootingPage from "./components/ShootingPage";

// شاشة التحميل فقط
function EntryLoader() {
  const navigate = useNavigate();

  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    let navigationTimer: number | undefined;

    const hideTimer = window.setTimeout(() => {
      setLoaderVisible(false);

      navigationTimer = window.setTimeout(() => {
        navigate("/archive", { replace: true });
      }, 750);

    }, 1800);

    return () => {
      window.clearTimeout(hideTimer);

      if (navigationTimer !== undefined) {
        window.clearTimeout(navigationTimer);
      }
    };
  }, [navigate]);

  return (
    <div
      id="loader"
      className={`loader ${loaderVisible ? "" : "hidden"}`}
      aria-label="Loading ON AIR"
      role="status"
    >
      <div className="loader-logo">
        ON AIR
      </div>

      <div className="loader-line">
        <span />
      </div>

      <div className="loader-status">
        INITIALIZING...
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* تحميل ثم دخول الأرشيف مباشرة */}
        <Route path="/" element={<EntryLoader />} />

        {/* الصفحات الداخلية */}
        <Route
          path="/archive"
          element={<ArchivePage />}
        />

        <Route
          path="/ideas"
          element={<IdeaPage />}
        />

        <Route
          path="/scenario"
          element={<ScenarioPage />}
        />

        <Route
          path="/story"
          element={<ScenarioPage />}
        />

        <Route
          path="/shooting"
          element={<ShootingPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
