import { useEffect, useState } from "react";
import "./ArchiveIntro.css";

type Language = "ar" | "en";

export default function ArchiveIntro() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("onair-language");
    return saved === "en" ? "en" : "ar";
  });

  const [soundOn, setSoundOn] = useState(false);

  const isArabic = language === "ar";

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;

      if (
        customEvent.detail === "ar" ||
        customEvent.detail === "en"
      ) {
        setLanguage(customEvent.detail);
      }
    };

    window.addEventListener(
      "onair-language-change",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "onair-language-change",
        handleLanguageChange
      );
    };
  }, []);

  const scrollToNext = () => {
    const nextSection =
      document.getElementById("productionSection");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToMemory = () => {
    const section =
      document.getElementById("leaveMarkSection");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToSocial = () => {
    const section =
      document.getElementById("socialSection");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main
      id="archive"
      className="archive-page cinematic-archive"
      lang={language}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className="archive-intro-screen">

        <div
          className="archive-background"
          aria-hidden="true"
        />

        <div
          className="archive-atmosphere"
          aria-hidden="true"
        />

        <div
          className="archive-grid"
          aria-hidden="true"
        />

        <div
          className="archive-vignette"
          aria-hidden="true"
        />

        <div
          className="archive-grain"
          aria-hidden="true"
        />

        <div
          className="archive-scanline"
          aria-hidden="true"
        />

        <div className="cinematic-tech">

          <div className="cinematic-sound" dir="ltr">
            <button
              type="button"
              className={
                soundOn ? "sound-active" : ""
              }
              onClick={() =>
                setSoundOn((current) => !current)
              }
              aria-pressed={soundOn}
            >
              <span
                className="sound-symbol"
                aria-hidden="true"
              >
                {soundOn ? "◉" : "◌"}
              </span>

              <span>
                {soundOn
                  ? "SOUND ON"
                  : "SOUND OFF"}
              </span>
            </button>
          </div>

        </div>

        <div className="archive-content">

          <div className="archive-label">
            PROJECT ARCHIVE / 002
          </div>

          <div
            className="archive-line-top"
            aria-hidden="true"
          />

            <div
             className="archive-logo"
             aria-label="ON AIR بِالعَافيَه"
               >
            
            
<svg
  className="archive-wordmark-svg"
  viewBox="0 0 900 250"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="ON AIR"
>
  <g
    fill="none"
    stroke="#112548"
    strokeWidth="14"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* O */}
    <circle cx="105" cy="125" r="76" />

    {/* N */}
    <path d="
      M 225 205
      V 112
      C 225 72, 250 49, 290 49
      C 330 49, 355 72, 355 112
      V 205
    " />

    {/* A - Tall rounded arch */}
    <path d="
      M 415 205
      V 76
      C 415 28, 449 5, 495 5
      C 541 5, 575 28, 575 76
      V 205
    " />

    {/* A - Inner vertical */}
    <path d="
      M 495 153
      V 205
    " />

    {/* I */}
    <path d="
      M 650 105
      V 205
    " />

    {/* R */}
    <path d="
      M 705 205
      V 112
      C 705 72, 730 49, 770 49
      H 860
    " />

    {/* R - Dot */}
    <path
      d="M 650 49 V 49"
      strokeWidth="0"
    />
  </g>

  {/* A dot */}
  <circle cx="495" cy="126" r="7" fill="#112548" />

  {/* I dot */}
  <circle cx="650" cy="70" r="7" fill="#112548" />
</svg>
         <div className="archive-arabic" dir="rtl">
          بِالعَافيَه
          </div>

          <div
       className="archive-logo-line"
       aria-hidden="true"
        />
         </div>


          <div className="cinematic-hero-actions">

            <button
              type="button"
              className="hero-action hero-action-notes"
              onClick={scrollToMemory}
            >
              <span
                className="hero-action-icon"
                aria-hidden="true"
              >
                ↙
              </span>

              <span className="hero-action-copy">
                <strong>
                  {isArabic ? "اضغط" : "CLICK"}
                </strong>

                <small>
                  {isArabic
                    ? "متنساش تسيب لينا ذكرى"
                    : "Don't forget to leave us a memory"}
                </small>
              </span>
            </button>

            <button
              type="button"
              className="cinematic-scroll"
              onClick={scrollToNext}
            >
              <span
                className="cinematic-scroll-line"
                aria-hidden="true"
              />

              <span className="cinematic-scroll-text">
                {isArabic
                  ? "انزل عشان تكمل الحكاية"
                  : "SCROLL TO CONTINUE"}
              </span>

              <span
                className="cinematic-mouse"
                aria-hidden="true"
              >
                <span />
              </span>

              <span
                className="cinematic-arrow"
                aria-hidden="true"
              >
                ↓
              </span>
            </button>

            <button
              type="button"
              className="hero-action hero-action-social"
              onClick={scrollToSocial}
            >
              <span className="hero-action-copy">
                <strong>
                  {isArabic ? "اضغط" : "CLICK"}
                </strong>

                <small>
                  {isArabic
                    ? "تابعنا عشان نكمل الحكاية"
                    : "Follow us to continue the story"}
                </small>
              </span>

              <span
                className="hero-action-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </button>

          </div>

          <div className="cinematic-statement">

            <span
              className="quote-mark quote-left"
              aria-hidden="true"
            >
              “
            </span>

            {isArabic ? (
              <p>
                كل مشهد هنا كان تعب، وضحك، وسهر...
                <br />
                وحلم كبير اسمه{" "}
                <strong>ON AIR بِالعَافيَه.</strong>
              </p>
            ) : (
              <p dir="ltr">
                Every frame here carried effort,
                laughter, sleepless nights...
                <br />
                and one big dream called{" "}
                <strong>ON AIR.</strong>
              </p>
            )}

            <span
              className="quote-mark quote-right"
              aria-hidden="true"
            >
              ”
            </span>

          </div>

          <div
            className="cinematic-divider"
            aria-hidden="true"
          />

          <div className="cinematic-status">

            <span className="status-dot" />

            <span>
              {isArabic
                ? "ملف الفريق مفتوح"
                : "TEAM FILE OPEN"}
            </span>

          </div>

        </div>

        <div className="cinematic-bottom-meta">
          <span>FILE OPENED</span>
          <span>/</span>
          <span>ON AIR بِالعَافيَه</span>
        </div>

      </section>
    </main>
  );
}