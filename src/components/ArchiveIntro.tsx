import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./ArchiveIntro.css";
import "./ArchiveTeddy.css";

type Language = "ar" | "en";

const teddyImage =
  `${import.meta.env.BASE_URL}images/teddy-hanging.png`;

export default function ArchiveIntro() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("onair-language");
    return saved === "en" ? "en" : "ar";
  });

  const [soundOn, setSoundOn] = useState(false);

  const isArabic = language === "ar";

  /* =========================================
     LANGUAGE SYNC
  ========================================= */

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

  /* =========================================
     TEDDY — ORIGINAL ROPE + INTRO ONLY
  ========================================= */

  useEffect(() => {
    const intro = document.querySelector<HTMLElement>(
      ".archive-intro-screen"
    );

    const teddy = document.querySelector<HTMLElement>(
      ".archive-teddy-follow"
    );

    if (!intro || !teddy) return;

    const rope = teddy.querySelector<HTMLElement>(
      ".archive-teddy-rope"
    );

    const ropeImage = teddy.querySelector<HTMLImageElement>(
      ".archive-teddy-rope-image"
    );

    const bodyImage = teddy.querySelector<HTMLImageElement>(
      ".archive-teddy-body-image"
    );

    if (!rope || !ropeImage || !bodyImage) return;

    // نقطة الفصل بين الحبل والدبدوب في الصورة الأصلية.
    // نستخدم نفس الصورة مرتين، من غير رسم حبل جديد.
    const ROPE_SPLIT = 0.43;

    let animationFrame = 0;

    /* -----------------------------------------
       UPDATE ROPE LENGTH
    ----------------------------------------- */

    const updateTeddy = () => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;

        const width = rope.clientWidth;

        const naturalWidth = ropeImage.naturalWidth || 403;
        const naturalHeight = ropeImage.naturalHeight || 1533;

        if (!width) return;

        // الحجم الطبيعي للصورة
        const imageHeight =
          width * (naturalHeight / naturalWidth);

        // طول الحبل الأصلي
        const ropeBase =
          imageHeight * ROPE_SPLIT;

        // تقدم السكرول داخل الانترو فقط
        const introRect = intro.getBoundingClientRect();

        const progress = Math.min(
          Math.max(
            -introRect.top /
              Math.max(introRect.height, window.innerHeight),
            0
          ),
          1
        );

        // أقصى مقدار لزيادة طول الحبل
        const maximumDrop = Math.min(
          window.innerHeight * 0.22,
          180
        );

        const drop = progress * maximumDrop;

        const ropeHeight = ropeBase + drop;

        const ropeScale =
          ropeHeight / ropeBase;

        // إعداد أبعاد الصورة الأصلية
        teddy.style.setProperty(
          "--archive-teddy-image-height",
          `${imageHeight}px`
        );

        // طول الحبل قبل وبعد السكرول
        teddy.style.setProperty(
          "--archive-teddy-rope-base",
          `${ropeBase}px`
        );

        teddy.style.setProperty(
          "--archive-teddy-rope-height",
          `${ropeHeight}px`
        );

        // تمديد الجزء الأصلي الخاص بالحبل فقط
        teddy.style.setProperty(
          "--archive-teddy-rope-scale",
          String(ropeScale)
        );
      });
    };

    /* -----------------------------------------
       SHOW TEDDY INSIDE INTRO ONLY
    ----------------------------------------- */

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        teddy.classList.toggle(
          "is-intro-visible",
          entry.isIntersecting
        );

        if (entry.isIntersecting) {
          updateTeddy();
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(intro);

    /* -----------------------------------------
       EVENT LISTENERS
    ----------------------------------------- */

    window.addEventListener(
      "scroll",
      updateTeddy,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateTeddy
    );

    ropeImage.addEventListener("load", updateTeddy);
    bodyImage.addEventListener("load", updateTeddy);

    updateTeddy();

    /* -----------------------------------------
       CLEANUP
    ----------------------------------------- */

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        updateTeddy
      );

      window.removeEventListener(
        "resize",
        updateTeddy
      );

      ropeImage.removeEventListener("load", updateTeddy);
      bodyImage.removeEventListener("load", updateTeddy);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  /* =========================================
     SCROLL FUNCTIONS
  ========================================= */

  const scrollToNext = () => {
    const nextSection =
      document.getElementById("productionSection");

    nextSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToMemory = () => {
    const section =
      document.getElementById("leaveMarkSection");

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToSocial = () => {
    const section =
      document.getElementById("socialSection");

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main
      id="archive"
      className="archive-page cinematic-archive"
      lang={language}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className="archive-intro-screen">

        {/* BACKGROUND */}

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

        {/* =====================================
            CINEMATIC TECH
        ===================================== */}

        <div className="cinematic-tech">

          <div className="cinematic-sound" dir="ltr">

            <button
              type="button"
              className={soundOn ? "sound-active" : ""}
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
                {soundOn ? "SOUND ON" : "SOUND OFF"}
              </span>

            </button>

          </div>

        </div>

        {/* =====================================
            MAIN CONTENT
        ===================================== */}

        <div className="archive-content">

          <div className="archive-label">
            PROJECT ARCHIVE / 002
          </div>

          <div
            className="archive-line-top"
            aria-hidden="true"
          />

          {/* ANIMATED LOGO */}

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

                <g className="archive-logo-letter archive-letter-o">
                  <circle cx="105" cy="125" r="76" />
                </g>

                {/* N */}

                <g className="archive-logo-letter archive-letter-n">
                  <path
                    d="
                      M 225 205
                      V 112
                      C 225 72, 250 49, 290 49
                      C 330 49, 355 72, 355 112
                      V 205
                    "
                  />
                </g>

                {/* A */}

                <g className="archive-logo-letter archive-letter-a">

                  <path
                    d="
                      M 415 205
                      V 76
                      C 415 28, 449 5, 495 5
                      C 541 5, 575 28, 575 76
                      V 205
                    "
                  />

                  <path d="M 495 153 V 205" />

                  <circle
                    cx="495"
                    cy="126"
                    r="7"
                    fill="#112548"
                    stroke="none"
                  />

                </g>

                {/* I */}

                <g className="archive-logo-letter archive-letter-i">

                  <path d="M 650 105 V 205" />

                  <circle
                    cx="650"
                    cy="70"
                    r="7"
                    fill="#112548"
                    stroke="none"
                  />

                </g>

                {/* R */}

                <g className="archive-logo-letter archive-letter-r">

                  <path
                    d="
                      M 705 205
                      V 112
                      C 705 72, 730 49, 770 49
                      H 860
                    "
                  />

                </g>

              </g>

            </svg>

            {/* ARABIC BRAND */}

            <div className="archive-arabic" dir="rtl">
              بِالعَافيَه
            </div>

            <div
              className="archive-logo-line"
              aria-hidden="true"
            />

          </div>

          {/* =================================
              HERO ACTIONS
          ================================= */}

          <div className="cinematic-hero-actions">

            {/* MEMORY */}

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

            {/* SCROLL */}

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

            {/* SOCIAL */}

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

          {/* =================================
              STATEMENT
          ================================= */}

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

          {/* STATUS */}

          <div className="cinematic-status">

            <span className="status-dot" />

            <span>
              {isArabic
                ? "ملف الفريق مفتوح"
                : "TEAM FILE OPEN"}
            </span>

          </div>

        </div>

        {/* BOTTOM META */}

        <div className="cinematic-bottom-meta">

          <span>FILE OPENED</span>
          <span>/</span>
          <span>ON AIR بِالعَافيَه</span>

        </div>

      </section>

      {/* =====================================
          ORIGINAL TEDDY — INTRO ONLY
      ===================================== */}

      {createPortal(

        <div
          className="archive-teddy-follow"
          aria-hidden="true"
        >

          <div className="archive-teddy-swing">

            {/* ORIGINAL ROPE */}

            <div className="archive-teddy-rope">

              <img
                className="archive-teddy-rope-image"
                src={teddyImage}
                alt=""
                draggable={false}
              />

            </div>

            {/* ORIGINAL TEDDY BODY */}

            <div className="archive-teddy-body">

              <img
                className="archive-teddy-body-image"
                src={teddyImage}
                alt=""
                draggable={false}
              />

            </div>

          </div>

        </div>,

        document.body

      )}

    </main>
  );
}