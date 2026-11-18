import { useEffect, useState } from "react";
import "./ProjectStatus.css";

type Language = "ar" | "en";

export default function ProjectStatus() {
  const [language, setLanguage] = useState<Language>("ar");

  const isArabic = language === "ar";

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("onair-language");

      if (savedLanguage === "ar" || savedLanguage === "en") {
        setLanguage(savedLanguage);
      }
    } catch {
      // Ignore storage errors.
    }
  }, []);

  return (
    <section
      id="projectStatus"
      className="project-status"
      lang={language}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Background */}
      <div
        className="status-background"
        aria-hidden="true"
      />

      <div
        className="status-overlay"
        aria-hidden="true"
      />

      <div
        className="status-grid"
        aria-hidden="true"
      />

      <div
        className="status-frame"
        aria-hidden="true"
      />

      {/* Technical marker */}
      <div className="status-index" dir="ltr">
        03 / 05
      </div>

      <div className="status-content">
        {/* Technical label */}
        <div className="status-eyebrow">
          PROJECT STATUS
        </div>

        {/* Title */}
        <h2 className="status-title">
          {isArabic
            ? "حالة المشروع"
            : "PROJECT STATUS"}
        </h2>

        <div
          className="status-title-line"
          aria-hidden="true"
        />

        {/* Main copy */}
        <div className="status-copy">
          {isArabic ? (
            <>
              <p className="status-main-line">
                لسّه بنبني
              </p>

              <p className="status-main-line">
                ولسه بدري على الحكاية.
              </p>

              <p className="status-description">
                المشروع لسه في مرحلة التحضير.
                التفاصيل بتتجمع، والكادرات لسه ما اتصورتش،
                والملف مفتوح.
              </p>

              <p className="status-secret">
                مش هنحرق حاجة دلوقتي —
                هنسيب الأرشيف يحكي وقتها.
              </p>
            </>
          ) : (
            <>
              <p className="status-main-line">
                Still building.
              </p>

              <p className="status-main-line">
                It is still too early for the story.
              </p>

              <p className="status-description">
                The project is still in preparation.
                Details are coming together, the frames
                have not been shot yet, and the file is open.
              </p>

              <p className="status-secret">
                Nothing will be revealed yet —
                the archive will tell the story when it is time.
              </p>
            </>
          )}
        </div>

        {/* Status rows */}
        <div className="status-table">

          <div className="status-row">
            <span className="status-row-number">
              01
            </span>

            <span className="status-row-label">
              {isArabic
                ? "الفكرة قيد التطوير"
                : "IDEA IN DEVELOPMENT"}
            </span>

            <span className="status-row-state">
              ACTIVE
            </span>
          </div>

          <div className="status-row">
            <span className="status-row-number">
              02
            </span>

            <span className="status-row-label">
              {isArabic
                ? "التحضير مستمر"
                : "PREPARATION IN PROGRESS"}
            </span>

            <span className="status-row-state">
              ACTIVE
            </span>
          </div>

          <div className="status-row">
            <span className="status-row-number">
              03
            </span>

            <span className="status-row-label">
              {isArabic
                ? "التفاصيل: سرية مؤقتًا"
                : "DETAILS: TEMPORARILY CLASSIFIED"}
            </span>

            <span className="status-row-state classified">
              CLASSIFIED
            </span>
          </div>

        </div>

        {/* Bottom signal */}
        <div className="status-bottom">
          <span className="status-dot" />

          <span>
            {isArabic
              ? "الملف مفتوح"
              : "FILE OPEN"}
          </span>
        </div>
      </div>
    </section>
  );
}