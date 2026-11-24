
import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// شاشة التحميل الأصلية
import "./components/Hero.css";


// صفحات الموقع الأصلية
import ArchivePage from "./components/ArchivePage";
import IdeaPage from "./components/IdeaPage";
import ScenarioPage from "./components/ScenarioPage";
import ShootingPage from "./components/ShootingPage";

// ==========================================
// ENTRY LOADER
// ==========================================

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

// ==========================================
// MAIN APP
// ==========================================

function App() {
  return (
    <BrowserRouter>


      {/* الصفحات الأصلية بدون تغيير */}
      <Routes>

        {/* شاشة التحميل */}
        <Route
          path="/"
          element={<EntryLoader />}
        />

        {/* الأرشيف */}
        <Route
          path="/archive"
          element={<ArchivePage />}
        />

        {/* الفكرة */}
        <Route
          path="/ideas"
          element={<IdeaPage />}
        />

        {/* السيناريو */}
        <Route
          path="/scenario"
          element={<ScenarioPage />}
        />

        {/* مسار بديل للسيناريو */}
        <Route
          path="/story"
          element={<ScenarioPage />}
        />

        {/* التصوير */}
        <Route
          path="/shooting"
          element={<ShootingPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
