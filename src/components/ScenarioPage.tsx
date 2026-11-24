import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ScenarioPage.css";

type Language = "ar" | "en";

type Credit = {
  roleAr: string;
  roleEn: string;
  namesAr: string[];
  namesEn: string[];
  icon: "story" | "direction" | "script" | "supervision";
};

const credits: Credit[] = [
  {
    roleAr: "قصة",
    roleEn: "Story",
    namesAr: ["سارة حسني", "صَبا محمد"],
    namesEn: ["Sara Hosny", "Saba Mohamed"],
    icon: "story",
  },
  {
    roleAr: "إخراج",
    roleEn: "Direction",
    namesAr: ["عادل محمد"],
    namesEn: ["Adel Mohamed"],
    icon: "direction",
  },
  {
    roleAr: "سيناريو وحوار",
    roleEn: "Screenplay & Dialogue",
    namesAr: ["إسراء أحمد"],
    namesEn: ["Esraa Ahmed"],
    icon: "script",
  },
  {
    roleAr: "تحت إشراف",
    roleEn: "Supervised by",
    namesAr: ["د. محمود عبد اللطيف"],
    namesEn: ["Dr. Mahmoud Abdel Latif"],
    icon: "supervision",
  },
];

const copy = {
  ar: {
    breadcrumb: "السيناريو",
    back: "العودة إلى الأرشيف",
    eyebrow: "ملف من أرشيف الإنتاج",
    title: "السيناريو",
    englishTitle: "THE SCRIPT",
    lead: "قبل ما الحكاية تبقى صورة وصوت… كانت سطور على ورق.",
    description:
      "هنا اتكتبت ملامح «بعين صَبا»، واتجمعت الشخصيات والكلمات في أول شكل للحكاية. الصفحة دي مش مجرد غلاف سيناريو؛ دي أثر من اللحظة اللي بدأت فيها الفكرة تتحول لفيلم.",
    imageLabel: "صفحة السيناريو الأصلية",
    imageCaption: "الغلاف الأصلي — بعين صَبا",
    imageHint: "اضغط على الورقة لمشاهدتها بوضوح أكبر",
    creditsEyebrow: "الأسماء وراء النص",
    creditsTitle: "مين صنع الحكاية؟",
    closing: "من أول سطر… بدأت الحكاية تاخد شكلها.",
    closingSmall: "ON AIR / THE SCRIPT ARCHIVE",
    close: "إغلاق الصورة",
    imageError: "تعذر تحميل صورة السيناريو",
  },

  en: {
    breadcrumb: "THE SCRIPT",
    back: "BACK TO ARCHIVE",
    eyebrow: "A FILE FROM THE PRODUCTION ARCHIVE",
    title: "The Script",
    englishTitle: "THE SCRIPT",
    lead: "Before the story became image and sound… it lived on paper.",
    description:
      "This is where the first shape of “Through Saba's Eyes” came together. Characters and words began to form the story. More than a script cover, this page holds a trace of the moment an idea started becoming a film.",
    imageLabel: "Original script page",
    imageCaption: "Original cover — Through Saba's Eyes",
    imageHint: "Select the page to see it in greater detail",
    creditsEyebrow: "THE NAMES BEHIND THE WORDS",
    creditsTitle: "The people who shaped the story",
    closing: "From the first line, the story began to take shape.",
    closingSmall: "ON AIR / THE SCRIPT ARCHIVE",
    close: "Close image",
    imageError: "Could not load the script image",
  },
};

const base = import.meta.env.BASE_URL;
const scriptImage = `${base}images/final-script.jpeg`;
const backgroundImage = `${base}images/on-air-global.png`;

/* =====================================================
   CREDIT ICONS
===================================================== */

function CreditIcon({
  type,
}: {
  type: Credit["icon"];
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 32 32"
      width="29"
      height="29"
      {...common}
      aria-hidden="true"
    >
      {type === "story" && (
        <>
          <path d="M5 7.5c4-1.5 8-.5 11 2v17c-3-2.5-7-3.5-11-2z" />
          <path d="M27 7.5c-4-1.5-8-.5-11 2v17c3-2.5 7-3.5 11-2z" />
          <path d="M9 12h3M9 16h3M20 12h3M20 16h3" />
        </>
      )}

      {type === "direction" && (
        <>
          <path d="M5 12h22v15H5z" />
          <path d="m5 12 3-7 7 3-3 7z" />
          <path d="m16 8 3-5 7 3-3 6" />
          <path d="M10 18h12M10 22h8" />
        </>
      )}

      {type === "script" && (
        <>
          <path d="M7 4h12l6 6v18H7z" />
          <path d="M19 4v7h6" />
          <path d="M11 16h10M11 20h10M11 24h6" />
        </>
      )}

      {type === "supervision" && (
        <>
          <path d="m3 12 13-7 13 7-13 7z" />
          <path d="M9 15.5v6c4.5 3.3 9.5 3.3 14 0v-6" />
          <path d="M29 13v8" />
        </>
      )}
    </svg>
  );
}

/* =====================================================
   SCENARIO PAGE
===================================================== */

export default function ScenarioPage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("onair-language");
    return saved === "en" ? "en" : "ar";
  });

  const [viewerOpen, setViewerOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isArabic = language === "ar";
  const t = copy[language];

  // Keep page language synchronized
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    localStorage.setItem("onair-language", language);
  }, [language, isArabic]);

  // Listen to website language changes
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

  // Image viewer: lock page scrolling and support Escape
  useEffect(() => {
    if (!viewerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [viewerOpen]);

  // Language switch
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
      className="oa-scenario"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      {/* BACKGROUND */}

      <div
        className="oa-scenario-bg"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
        aria-hidden="true"
      />

      <div
        className="oa-scenario-bg-depth"
        aria-hidden="true"
      />

      {/* HEADER */}

      <header className="oa-scenario-header">
        <Link
          to="/archive"
          className="oa-scenario-brand"
          aria-label="ON AIR Archive"
        >
          <strong>ON AIR</strong>
          <span>بِالعَافيَه</span>
        </Link>

        <div className="oa-scenario-breadcrumb" dir="ltr">
          <span>ON AIR</span>
          <i>/</i>
          <span>ARCHIVE</span>
          <i>/</i>
          <strong>{t.breadcrumb}</strong>
        </div>

        <div className="oa-scenario-header-actions">
          <div
            className="oa-scenario-lang"
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

          <Link to="/archive" className="oa-scenario-back">
            {t.back}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <div className="oa-scenario-inner">

        {/* HERO */}

        <section className="oa-scenario-hero">

          {/* TEXT */}

          <div
            className="oa-scenario-intro"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div className="oa-scenario-eyebrow">
              <span />
              {t.eyebrow}
            </div>

            <h1>{t.title}</h1>

            <div
              className="oa-scenario-title-en"
              dir="ltr"
            >
              {t.englishTitle}
            </div>

            <div className="oa-scenario-intro-rule">
              <span />
            </div>

            <h2>{t.lead}</h2>

            <p>{t.description}</p>

            <div
              className="oa-scenario-document-meta"
              dir="ltr"
            >
              <span>ORIGINAL SCRIPT</span>
              <i />
              <span>ON AIR ARCHIVE</span>
            </div>
          </div>

          {/* ORIGINAL SCRIPT PAPER */}

          <figure className="oa-scenario-paper-area">
            <div
              className="oa-scenario-paper-label"
              dir="ltr"
            >
              <span>THE ORIGINAL DOCUMENT</span>
              <span>ON AIR / ARCHIVE</span>
            </div>

            <button
              type="button"
              className="oa-scenario-paper"
              onClick={() => {
                if (!imageError) setViewerOpen(true);
              }}
              disabled={imageError}
              aria-label={t.imageLabel}
            >
              {!imageError ? (
                <img
                  src={scriptImage}
                  alt={t.imageLabel}
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="oa-scenario-paper-error">
                  {t.imageError}
                </span>
              )}

              <span className="oa-scenario-paper-zoom">
                <span>＋</span>
                {t.imageHint}
              </span>
            </button>

            <figcaption className="oa-scenario-paper-caption">
              <span>{t.imageCaption}</span>
              <i aria-hidden="true">✳</i>
            </figcaption>
          </figure>
        </section>

        {/* SCRIPT CREDITS */}

        <section className="oa-scenario-credits">
          <div className="oa-scenario-credits-heading">
            <div>
              <span>{t.creditsEyebrow}</span>
              <h2>{t.creditsTitle}</h2>
            </div>

            <span
              className="oa-scenario-credits-decoration"
              dir="ltr"
            >
              ON AIR / SCRIPT
            </span>
          </div>

          <div className="oa-scenario-credits-list">
            {credits.map((credit, index) => (
              <article
                className="oa-scenario-credit"
                key={credit.roleEn}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="oa-scenario-credit-icon">
                  <CreditIcon type={credit.icon} />
                </div>

                <span className="oa-scenario-credit-role">
                  {isArabic ? credit.roleAr : credit.roleEn}
                </span>

                <div className="oa-scenario-credit-names">
                  {(isArabic
                    ? credit.namesAr
                    : credit.namesEn
                  ).map((name) => (
                    <strong key={name}>{name}</strong>
                  ))}
                </div>

                <span className="oa-scenario-credit-underline" />
              </article>
            ))}
          </div>
        </section>

        {/* FOOTER */}

        <footer className="oa-scenario-footer">
          <div className="oa-scenario-footer-line" />

          <p>{t.closing}</p>

          <span dir="ltr">{t.closingSmall}</span>
        </footer>
      </div>

      {/* FULL IMAGE VIEWER */}

      {viewerOpen && (
        <div
          className="oa-scenario-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={t.imageLabel}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewerOpen(false);
            }
          }}
        >
          <div className="oa-scenario-viewer-top" dir="ltr">
            <span>ON AIR / ORIGINAL SCRIPT</span>

            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              aria-label={t.close}
            >
              ×
            </button>
          </div>

          <img
            src={scriptImage}
            alt={t.imageLabel}
          />
        </div>
      )}
    </main>
  );
}