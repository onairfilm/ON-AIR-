import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

type Language = "ar" | "en";

export default function Hero() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem("onair-language");

      if (savedLanguage === "en") return "en";
      if (savedLanguage === "ar") return "ar";
    } catch {
      // Storage is optional.
    }

    return "ar";
  });

  const [loaderVisible, setLoaderVisible] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showCaptured, setShowCaptured] = useState(false);

  const isArabic = language === "ar";

  /* =====================================================
     INITIAL LANGUAGE + LOADER
  ===================================================== */

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    try {
      localStorage.setItem("onair-language", language);
    } catch {
      // Storage is optional.
    }

    window.dispatchEvent(
      new CustomEvent("onair-language-change", {
        detail: language,
      })
    );
  }, [language, isArabic]);

  useEffect(() => {
    const hideLoaderTimer = window.setTimeout(() => {
      setLoaderVisible(false);

      const readyTimer = window.setTimeout(() => {
        setHeroReady(true);
        document.body.classList.add("page-loaded");
      }, 750);

      return () => {
        window.clearTimeout(readyTimer);
      };
    }, 1800);

    return () => {
      window.clearTimeout(hideLoaderTimer);
    };
  }, []);

  /* =====================================================
     PARALLAX
  ===================================================== */

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const background =
      document.querySelector<HTMLElement>(".hero-background");

    if (!hero || !background) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (window.matchMedia("(hover: none)").matches) {
        return;
      }

      if (window.innerWidth <= 700) {
        return;
      }

      const x =
        event.clientX / window.innerWidth - 0.5;

      const y =
        event.clientY / window.innerHeight - 0.5;

      background.style.transform =
        `translate3d(${x * 8}px, ${y * 8}px, 0) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      background.style.transform =
        "translate3d(0, 0, 0) scale(1)";
    };

    const handleResize = () => {
      if (window.innerWidth <= 700) {
        background.style.transform =
          "translate3d(0, 0, 0) scale(1)";
      }
    };

    hero.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    hero.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      hero.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =====================================================
     LANGUAGE
  ===================================================== */

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  /* =====================================================
     CAMERA SOUND
     OPTIONAL
  ===================================================== */

  const playCameraSound = () => {
    try {
      const cameraSound =
        new Audio("/sounds/camera.mp4");

      cameraSound.preload = "auto";
      cameraSound.volume = 0.8;

      const playPromise = cameraSound.play();

      playPromise?.catch(() => {
        // Audio is optional.
      });
    } catch {
      // Audio is optional.
    }
  };

  /* =====================================================
     ENTER ARCHIVE
  ===================================================== */

  const handleEnterArchive = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    playCameraSound();

    setShowFlash(true);
    setShowCaptured(true);

    document.body.classList.add("camera-shake");

    const shakeTimer = window.setTimeout(() => {
      document.body.classList.remove("camera-shake");
    }, 180);

    const flashTimer = window.setTimeout(() => {
      setShowFlash(false);
    }, 180);

    const capturedTimer = window.setTimeout(() => {
      setShowCaptured(false);
    }, 600);

    const navigationTimer = window.setTimeout(() => {
      navigate("/archive");
    }, 650);

    // Cleanup timers if component unmounts.
    return () => {
      window.clearTimeout(shakeTimer);
      window.clearTimeout(flashTimer);
      window.clearTimeout(capturedTimer);
      window.clearTimeout(navigationTimer);
    };
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =================================================
          LOADER
      ================================================== */}

      <div
        id="loader"
        className={`loader ${loaderVisible ? "" : "hidden"}`}
        aria-hidden={!loaderVisible}
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

      {/* =================================================
          CAMERA FLASH
      ================================================== */}

      <div
        className={`camera-flash ${
          showFlash ? "active" : ""
        } ${!showFlash && showCaptured ? "fade" : ""}`}
        aria-hidden="true"
      >
        <div className="camera-focus-frame" />

        <div
          className={`camera-flash-text ${
            showCaptured ? "visible" : ""
          }`}
        >
          FRAME CAPTURED
        </div>
      </div>

      {/* =================================================
          LANDING PAGE
      ================================================== */}

      <main
        id="website"
        className="landing-page"
        lang={language}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <section
          id="hero"
          className={`hero ${
            isTransitioning ? "click-effect" : ""
          }`}
          tabIndex={0}
        >
          {/* BACKGROUND */}

          <div className="hero-background" />

          {/* CAMERA CORNERS */}

          <div
            className="camera-corner top-left"
            aria-hidden="true"
          />

          <div
            className="camera-corner top-right"
            aria-hidden="true"
          />

          <div
            className="camera-corner bottom-left"
            aria-hidden="true"
          />

          <div
            className="camera-corner bottom-right"
            aria-hidden="true"
          />

          {/* CENTER MARK */}

          <div
            className="cross cross-center"
            aria-hidden="true"
          />

          {/* =================================================
              TOP BAR
          ================================================== */}

          <header className="top-bar">
            {/* REC */}

            <div className="rec">
              <span className="rec-dot" />
              <span>REC</span>
            </div>

            {/* TECHNICAL */}

            <div className="technical-info">
              <span>FRAME 001</span>

              <span className="separator">|</span>

              <span>ISO 800</span>

              <span className="separator">|</span>

              <span>24 FPS</span>
            </div>

            {/* LANGUAGE */}

            <nav
              className="language"
              aria-label="Language selector"
              dir="ltr"
            >
              <button
                type="button"
                className={
                  isArabic ? "active" : ""
                }
                aria-pressed={isArabic}
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
                  !isArabic ? "active" : ""
                }
                aria-pressed={!isArabic}
                onClick={() =>
                  changeLanguage("en")
                }
              >
                EN
              </button>
            </nav>
          </header>

          {/* =================================================
              HERO CONTENT
          ================================================== */}

          <div
            className={`hero-content ${
              heroReady
                ? "hero-ready"
                : "hero-locked"
            }`}
          >
            {/* SIGNAL */}

            <div className="intro-signal">
              <span className="signal-dot" />

              <span>
                SIGNAL DETECTED
              </span>
            </div>

            {/* =================================================
                LOGO
            ================================================== */}

            <div className="animated-logo">
              <span className="track-point point-1" />
              <span className="track-point point-2" />
              <span className="track-point point-3" />
              <span className="track-point point-4" />

              <span className="track-line line-top" />
              <span className="track-line line-bottom" />

              <div
                className="logo-english"
                dir="ltr"
              >
                <span className="logo-letter letter-o">
                  O
                </span>

                <span className="logo-letter letter-n">
                  N
                </span>

                <span className="logo-space" />

                <span className="logo-letter letter-a">
                  A
                </span>

                <span className="logo-letter letter-i">
                  I
                </span>

                <span className="logo-letter letter-r">
                  R
                </span>
              </div>

              <div
                className="logo-arabic"
                dir="rtl"
              >
                بِالعَافيَه
              </div>

              <div className="logo-rule">
                <span />
              </div>
            </div>

            {/* =================================================
                TEAM STATEMENT
            ================================================== */}

            <div className="intro-statement">
              {isArabic ? (
                <>
                  <span>
                    فريق واحد، حكاية واحدة
                  </span>

                  <span>
                    اتعملت رغم كل حاجة
                  </span>
                </>
              ) : (
                <>
                  <span>
                    One Team, One Story
                  </span>

                  <span>
                    Made Anyway
                  </span>
                </>
              )}
            </div>

            {/* =================================================
                FINAL STATEMENT
            ================================================== */}

            <div className="intro-final-statement">
              {isArabic
                ? "لو الخطة نجحت، يبقى بالصدفة"
                : "If the plan worked, it was probably by accident"}
            </div>

            {/* =================================================
                ENTER BUTTON
            ================================================== */}

            <div className="enter-wrapper">
              <button
                id="enterExperience"
                className="enter-button"
                type="button"
                disabled={isTransitioning}
                onClick={handleEnterArchive}
              >
                <span className="enter-icon">
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      className="clapper-top"
                      d="
                        M10 17
                        L14 8
                        H54
                        L58 17
                        Z
                      "
                    />

                    <path
                      className="clapper-stripe"
                      d="M20 8 L25 17"
                    />

                    <path
                      className="clapper-stripe"
                      d="M33 8 L38 17"
                    />

                    <path
                      className="clapper-stripe"
                      d="M46 8 L51 17"
                    />

                    <rect
                      className="clapper-body"
                      x="10"
                      y="17"
                      width="48"
                      height="38"
                      rx="1"
                    />

                    <line
                      className="clapper-line"
                      x1="17"
                      y1="29"
                      x2="51"
                      y2="29"
                    />

                    <line
                      className="clapper-line"
                      x1="17"
                      y1="39"
                      x2="42"
                      y2="39"
                    />

                    <line
                      className="clapper-line"
                      x1="17"
                      y1="47"
                      x2="35"
                      y2="47"
                    />

                    <circle
                      className="clapper-dot"
                      cx="48"
                      cy="46"
                      r="2"
                    />
                  </svg>
                </span>

                <span className="enter-main">
                  {isArabic ? "دخول" : "ENTER"}
                </span>

                <span className="enter-sub">
                  {isArabic
                    ? "دخول إلى الأرشيف"
                    : "ENTER THE ARCHIVE"}
                </span>

                <span
                  className="enter-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}