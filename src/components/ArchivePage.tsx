import { useEffect, useState } from "react";
import ArchiveIntro from "./ArchiveIntro";
import ProductionDays from "./ProductionDays";
import TeamSection from "./TeamSection";
import ProductionJourney from "./ProductionJourney";
import "./ArchivePage.css";

type Language = "ar" | "en";

export default function ArchivePage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("onair-language");

    return saved === "en" ? "en" : "ar";
  });

  /* ---------------------------------------------
     Set document language immediately
  --------------------------------------------- */

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  /* ---------------------------------------------
     Change language
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
              className={
                language === "ar"
                  ? "active"
                  : ""
              }
              onClick={() =>
                changeLanguage("ar")
              }
            >
              AR
            </button>

            <span>/</span>

            <button
              type="button"
              className={
                language === "en"
                  ? "active"
                  : ""
              }
              onClick={() =>
                changeLanguage("en")
              }
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

          {/* REC */}

          <div className="archive-global-rec">

            <span />

            <b>REC</b>

          </div>

        </header>

        {/* GLOBAL FRAME */}

        <div
          className="archive-global-frame"
          aria-hidden="true"
        >

          <span
            className="global-corner global-tl"
          />

          <span
            className="global-corner global-tr"
          />

          <span
            className="global-corner global-bl"
          />

          <span
            className="global-corner global-br"
          />

        </div>

      </div>

      <ArchiveIntro />

      <ProductionJourney />
<ProductionDays />
<TeamSection />
    </main>
  );
}