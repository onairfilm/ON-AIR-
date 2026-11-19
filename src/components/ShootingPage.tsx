import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShootingPage.css";

type Language = "ar" | "en";

const translations = {
  ar: {
    breadcrumb: "التصوير",
    back: "العودة إلى الأرشيف",
    eyebrow: "من كواليس الرحلة",
    title: "التصوير",
    englishTitle: "THE SHOOT",

    lead: "هنا، خرجت الحكاية من الورق… وبقت لحظة عشناها سوا.",

    description:
      "كل تفصيلة استنيناها، وكل خطوة قرّبتنا من الفيلم، اجتمعت في اليوم ده. وجوه كتير، وإحساس واحد، وذكرى هتفضل جزء من رحلتنا مع بعين صبا.",

    photoLabel: "صورة جماعية من يوم التصوير",

    closing:
      "يمكن الكادر يخلص… لكن اليوم ده هيفضل عايش في ذاكرة الحكاية.",

    footer: "ON AIR / SHOOTING ARCHIVE",

    expand: "عرض الصورة كاملة",
    close: "إغلاق الصورة",
    imageError: "تعذر تحميل الصورة",
  },

  en: {
    breadcrumb: "SHOOTING",
    back: "BACK TO ARCHIVE",
    eyebrow: "A MOMENT FROM THE JOURNEY",
    title: "Shooting",
    englishTitle: "THE SHOOT",

    lead:
      "Here, the story left the page… and became a moment we lived together.",

    description:
      "Every detail we had been waiting for, every step that brought us closer to the film, came together on this day. Different faces, one shared feeling, and a memory that will always be part of our journey with Through Saba's Eyes.",

    photoLabel: "A group photograph from the shooting day",

    closing:
      "The frame may end… but this day will always live on in the story.",

    footer: "ON AIR / SHOOTING ARCHIVE",

    expand: "VIEW FULL IMAGE",
    close: "Close image",
    imageError: "Could not load the image",
  },
};

const base = import.meta.env.BASE_URL;

const shootingImage = `${base}images/shooting-day.jpeg`;
const backgroundImage = `${base}images/on-air-global.png`;

export default function ShootingPage() {
  const [language, setLanguage] = useState<Language>("ar");

  const [viewerOpen, setViewerOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isArabic = language === "ar";
  const t = translations[language];

  // Synchronize with website language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    localStorage.setItem("onair-language", language);
  }, [language, isArabic]);

  // Listen for language changes from other pages
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<Language>).detail;

      if (nextLanguage === "ar" || nextLanguage === "en") {
        setLanguage(nextLanguage);
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

  // Image viewer keyboard and scroll handling
  useEffect(() => {
    if (!viewerOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [viewerOpen]);

  // Change language
  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);

    document.documentElement.lang = nextLanguage;

    document.documentElement.dir =
      nextLanguage === "ar" ? "rtl" : "ltr";

    localStorage.setItem("onair-language", nextLanguage);

    window.dispatchEvent(
      new CustomEvent("onair-language-change", {
        detail: nextLanguage,
      })
    );
  };

  return (
    <main
      className="oa-shooting-page"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      {/* BACKGROUND */}

      <div
        className="oa-shooting-bg"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
        aria-hidden="true"
      />

      <div
        className="oa-shooting-bg-overlay"
        aria-hidden="true"
      />

      {/* HEADER */}

      <header className="oa-shooting-topbar">

        <Link
          to="/archive"
          className="oa-shooting-brand"
          aria-label="ON AIR Archive"
        >
          <strong>ON AIR</strong>
          <span>بِالعَافيَه</span>
        </Link>

        <div
          className="oa-shooting-breadcrumb"
          dir="ltr"
        >
          <span>ON AIR</span>
          <i>/</i>
          <span>ARCHIVE</span>
          <i>/</i>
          <strong>{t.breadcrumb}</strong>
        </div>

        <div className="oa-shooting-actions">

          <div
            className="oa-shooting-language"
            dir="ltr"
            aria-label="Language"
          >
            <button
              type="button"
              className={language === "ar" ? "active" : ""}
              onClick={() => changeLanguage("ar")}
              aria-pressed={language === "ar"}
            >
              AR
            </button>

            <span>/</span>

            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>

          <Link
            to="/archive"
            className="oa-shooting-back"
          >
            {t.back}
            <span aria-hidden="true">↗</span>
          </Link>

        </div>
      </header>

      {/* MAIN CONTENT */}

      <div className="oa-shooting-inner">

        {/* INTRODUCTION */}

        <section className="oa-shooting-intro">

          <div
            className="oa-shooting-heading"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div className="oa-shooting-eyebrow">
              <span />
              {t.eyebrow}
            </div>

            <h1>{t.title}</h1>

            <div
              className="oa-shooting-title-en"
              dir="ltr"
            >
              {t.englishTitle}
            </div>
          </div>

          <div
            className="oa-shooting-intro-copy"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <h2>{t.lead}</h2>

            <p>{t.description}</p>
          </div>

        </section>

        {/* ORIGINAL GROUP PHOTO */}

        <figure className="oa-shooting-photo-figure">

          <button
            type="button"
            className="oa-shooting-photo-button"
            onClick={() => {
              if (!imageError) {
                setViewerOpen(true);
              }
            }}
            disabled={imageError}
            aria-label={t.expand}
          >
            {!imageError ? (
              <img
                src={shootingImage}
                alt={t.photoLabel}
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="oa-shooting-image-error">
                {t.imageError}
              </span>
            )}

            {!imageError && (
              <span className="oa-shooting-zoom-hint">
                <span>＋</span>
                {t.expand}
              </span>
            )}
          </button>

        </figure>

        {/* CLOSING */}

        <footer className="oa-shooting-footer">

          <span className="oa-shooting-footer-rule" />

          <p dir={isArabic ? "rtl" : "ltr"}>
            {t.closing}
          </p>

          <span
            className="oa-shooting-footer-brand"
            dir="ltr"
          >
            {t.footer}
          </span>

        </footer>

      </div>

      {/* FULL-SCREEN IMAGE VIEWER */}

      {viewerOpen && (
        <div
          className="oa-shooting-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={t.photoLabel}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewerOpen(false);
            }
          }}
        >
          <div
            className="oa-shooting-viewer-top"
            dir="ltr"
          >
            <span>ON AIR / SHOOTING DAY</span>

            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              aria-label={t.close}
            >
              ×
            </button>
          </div>

          <img
            src={shootingImage}
            alt={t.photoLabel}
          />
        </div>
      )}
    </main>
  );
}