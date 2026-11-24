
import { useEffect, useState } from "react";

import ArchiveIntro from "./ArchiveIntro";
import ProductionDays from "./ProductionDays";
import TeamSection from "./TeamSection";
import LeaveMemory from "./LeaveMemory";
import ProductionJourney from "./ProductionJourney";

import "./ArchivePage.css";

type Language = "ar" | "en";

export default function ArchivePage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("onair-language");
    return saved === "en" ? "en" : "ar";
  });

  /* ---------------------------------------------
     LANGUAGE SETTINGS
  --------------------------------------------- */

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  /* ---------------------------------------------
     CHANGE LANGUAGE
  --------------------------------------------- */

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);

    document.documentElement.lang = nextLanguage;
    document.documentElement.dir =
      nextLanguage === "ar" ? "rtl" : "ltr";

    localStorage.setItem(
      "onair-language",
      nextLanguage
    );

    window.dispatchEvent(
      new CustomEvent("onair-language-change", {
        detail: nextLanguage,
      })
    );
  };

  return (
    <main className="archive-page-wrapper">

      {/* GLOBAL ARCHIVE UI */}

      <div className="archive-global-chrome">

        <header
          className="archive-global-bar"
          dir="ltr"
        >

          {/* LANGUAGE */}

          <div className="archive-global-language">

            <button
              type="button"
              className={language === "ar" ? "active" : ""}
              onClick={() => changeLanguage("ar")}
            >
              AR
            </button>

            <span>/</span>

            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>

          </div>

          {/* CAMERA DATA */}

          <div className="archive-global-tech">

            <span>FRAME 002</span>

            <i>|</i>

            <span>ISO 800</span>

            <i>|</i>

            <span>24 FPS</span>

          </div>

          {/* SOCIAL MEDIA + REC */}

          <div
            className="archive-global-status"
            dir="ltr"
          >

            <nav
              className="archive-global-social"
              aria-label="ON AIR social media"
            >

              {/* TIKTOK */}

              <a
                href="https://www.tiktok.com/@on.air..12?_r=1&_t=ZS-9BgBVHwN684"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok - ON AIR"
                title="TikTok"
              >

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <path
                    fill="currentColor"
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.74 4.1 1.11 1.04 2.65 1.51 4.14 1.67v3.96c-1.39-.05-2.82-.34-4.13-.96-.57-.26-1.1-.6-1.62-.95-.01 2.96.01 5.91-.02 8.87-.08 1.42-.55 2.82-1.39 3.97-1.35 1.92-3.7 3.17-6.06 3.21-1.45.08-2.9-.32-4.13-1.06-2.04-1.21-3.43-3.42-3.64-5.79-.03-.49-.04-.98-.01-1.47.18-1.9 1.12-3.72 2.63-4.9 1.71-1.37 4.1-1.96 6.24-1.58.02 1.46-.04 2.93-.04 4.39-1.46-.47-3.16-.34-4.26.72-.8.73-1.2 1.85-1.04 2.92.15 1.09.89 2.11 1.91 2.53 1.02.44 2.26.32 3.18-.3.88-.6 1.46-1.64 1.49-2.71.07-4.87.02-9.74.04-14.6z"
                  />

                </svg>

              </a>

              {/* FACEBOOK */}

              <a
                href="https://www.facebook.com/share/1ERzsvwsZS/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook - ON AIR"
                title="Facebook"
              >

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <path
                    fill="currentColor"
                    d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.008 10.125 11.854v-8.385H7.078V12.073h3.047V9.41c0-3.023 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.96h-1.513c-1.49 0-1.956.93-1.956 1.884v2.281h3.328l-.532 3.469h-2.796v8.385C19.612 23.081 24 18.092 24 12.073Z"
                  />

                </svg>

              </a>

              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/on_air.13?fqnt=eDE1MHhyeGQ4bXVm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram - ON AIR"
                title="Instagram"
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >

                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.1"
                    fill="currentColor"
                  />

                </svg>

              </a>

            </nav>

            {/* REC INDICATOR */}

            <div className="archive-global-rec">

              <span />

              <b>REC</b>

            </div>

          </div>

        </header>

        {/* GLOBAL FRAME */}

        <div
          className="archive-global-frame"
          aria-hidden="true"
        >

          <span className="global-corner global-tl" />

          <span className="global-corner global-tr" />

          <span className="global-corner global-bl" />

          <span className="global-corner global-br" />

        </div>

      </div>

      {/* ARCHIVE CONTENT */}

      <ArchiveIntro />

      <ProductionJourney />

      <ProductionDays />

      <TeamSection />

      <LeaveMemory />

    </main>
  );
}