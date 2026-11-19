import { useEffect, useRef, useState } from "react";
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

  const hangingTeddyRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------------------------
     Set document language immediately
  --------------------------------------------- */

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  /* ---------------------------------------------
     Hanging teddy — scroll rope + section visibility
  --------------------------------------------- */

  useEffect(() => {
    const teddy = hangingTeddyRef.current;
    const productionSection =
      document.getElementById("productionSection");

    if (!teddy) return;

    let animationFrame = 0;
    let observer: IntersectionObserver | null = null;

    const updateTeddy = () => {
      animationFrame = 0;

      const scrollTop = Math.max(
        0,
        window.scrollY || document.documentElement.scrollTop || 0
      );

      const isMobile = window.innerWidth <= 700;
      const maxExtraLength = isMobile
        ? Math.min(window.innerHeight * 0.22, 90)
        : Math.min(window.innerHeight * 0.34, 260);

      const extraLength = Math.min(
        scrollTop * (isMobile ? 0.09 : 0.075),
        maxExtraLength
      );

      teddy.style.setProperty(
        "--teddy-rope-height",
        `${Math.round(135 + extraLength)}px`
      );

      /* Fallback for browsers without IntersectionObserver. */
      if (productionSection && !observer) {
        const rect = productionSection.getBoundingClientRect();
        const isInsideProduction =
          rect.bottom > 0 && rect.top < window.innerHeight;

        teddy.classList.toggle(
          "is-hidden",
          isInsideProduction
        );
      }
    };

    const requestTeddyUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateTeddy);
    };

    if (
      productionSection &&
      "IntersectionObserver" in window
    ) {
      observer = new IntersectionObserver(
        ([entry]) => {
          teddy.classList.toggle(
            "is-hidden",
            entry.isIntersecting
          );
        },
        {
          root: null,
          threshold: 0,
        }
      );

      observer.observe(productionSection);
    }

    requestTeddyUpdate();

    window.addEventListener(
      "scroll",
      requestTeddyUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestTeddyUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestTeddyUpdate
      );

      window.removeEventListener(
        "resize",
        requestTeddyUpdate
      );

      observer?.disconnect();

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

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

      {/* HANGING TEDDY — FIXED TO THE RIGHT SIDE */}

      <div
        ref={hangingTeddyRef}
        className="archive-hanging-teddy"
        aria-hidden="true"
      >
        <span className="archive-hanging-teddy__rope" />

        <img
          className="archive-hanging-teddy__bear"
          src="/images/teddy-hanging.png"
          alt=""
          draggable={false}
        />
      </div>

      <ArchiveIntro />

      <ProductionJourney />
      <ProductionDays />
      <TeamSection />
    </main>
  );
}