
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./ProductionJourney.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Language = "ar" | "en";

type ProjectFile = {
  number: string;
  arTitle: string;
  enTitle: string;
  arDescription: string;
  enDescription: string;
  arState: string;
  enState: string;
};

type ProductionStage = {
  number: string;
  arTitle: string;
  enTitle: string;
  arDescription: string;
  enDescription: string;
  type: "open" | "progress" | "soon" | "secret";
  href?: string;
  active?: boolean;
};

/* =========================================
   PROJECT FILES
========================================= */

const projectFiles: ProjectFile[] = [
  {
    number: "01",
    arTitle: "الإعلان التشويقي",
    enTitle: "Trailer",
    arDescription: "لمحة قبل أن تبدأ الحكاية.",
    enDescription: "A glimpse before the story begins.",
    arState: "قريبًا",
    enState: "Soon",
  },
  {
    number: "02",
    arTitle: "الفيلم النهائي",
    enTitle: "Final Film",
    arDescription: "الحكاية حين تكتمل كل تفاصيلها.",
    enDescription: "The story when every detail is complete.",
    arState: "قريبًا",
    enState: "Soon",
  },
  {
    number: "03",
    arTitle: "البوسترات",
    enTitle: "Posters",
    arDescription: "الهوية البصرية التي تحمل الحكاية.",
    enDescription: "The visual identity carrying the story.",
    arState: "قريبًا",
    enState: "Soon",
  },
  {
    number: "04",
    arTitle: "العرض التقديمي",
    enTitle: "Pitch Deck",
    arDescription: "الفكرة قبل أن تصبح فيلمًا.",
    enDescription: "The idea before it becomes a film.",
    arState: "قريبًا",
    enState: "Soon",
  },
  {
    number: "05",
    arTitle: "خلف الكادر",
    enTitle: "Behind the Frame",
    arDescription:
      "ما حدث خارج الكادر، والتفاصيل التي لم تصل إلى الشاشة.",
    enDescription:
      "What happened behind the scenes, including what never reached the screen.",
    arState: "قريبًا",
    enState: "Soon",
  },
  {
    number: "06",
    arTitle: "معرض الصور",
    enTitle: "Photo Gallery",
    arDescription: "كادرات جمعتها الرحلة.",
    enDescription: "Frames collected throughout the journey.",
    arState: "قريبًا",
    enState: "Soon",
  },
  {
    number: "07",
    arTitle: "لوحات المشاهد",
    enTitle: "Storyboard",
    arDescription: "الفيلم قبل أن تراه الكاميرا.",
    enDescription: "The film before the camera sees it.",
    arState: "قريبًا",
    enState: "Soon",
  },
];

/* =========================================
   PRODUCTION STAGES
========================================= */

const productionStages: ProductionStage[] = [
  {
    number: "01",
    arTitle: "الفكرة",
    enTitle: "The Idea",
    arDescription:
      "بداية الحكاية، والبحث الذي بنى عالمها.",
    enDescription:
      "The first idea and the research that shaped its world.",
    type: "open",
    href: "/ideas",
  },
  {
    number: "02",
    arTitle: "السيناريو",
    enTitle: "The Script",
    arDescription:
      "كتابة الحكاية، وبناء الشخصيات، وصياغة المشاهد.",
    enDescription:
      "Writing the story, building characters, and shaping scenes.",
    type: "open",
    href: "/scenario",
  },
  {
    number: "03",
    arTitle: "التحضير",
    enTitle: "Pre-Production",
    arDescription:
      "اختيار الكاست والمواقع وتجهيز كل تفصيلة قبل أول كادر.",
    enDescription:
      "Casting, choosing locations, and preparing every detail before the first frame.",
    type: "open",
    href: "/preparation",
  },
  {
    number: "04",
    arTitle: "التصوير",
    enTitle: "Shooting",
    arDescription:
      "هنا تتحول الكلمات والتحضيرات إلى كادرات حقيقية.",
    enDescription:
      "Where the words and preparation become real frames.",
    type: "open",
    href: "/shooting",
  },
  {
    number: "05",
    arTitle: "المونتاج",
    enTitle: "Editing",
    arDescription:
      "ترتيب اللقطات وضبط الإيقاع وتجميع الحكاية.",
    enDescription:
      "Shaping the cuts, the rhythm, and the story.",
    type: "secret",
    active: true,
  },
  {
    number: "06",
    arTitle: "النسخة النهائية",
    enTitle: "Final Cut",
    arDescription:
      "المراجعة واللمسات الأخيرة قبل أن تكتمل الحكاية.",
    enDescription:
      "The final review and finishing touches before the story is complete.",
    type: "secret",
  },
];

/* =========================================
   COMPONENT
========================================= */

export default function ProductionJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof document === "undefined") return "ar";

    return document.documentElement.lang === "en"
      ? "en"
      : "ar";
  });

  const [selectedStage, setSelectedStage] =
    useState<ProductionStage | null>(null);

  const isArabic = language === "ar";

  /* =========================================
     LANGUAGE SYNC
  ========================================= */

  useEffect(() => {
    const syncLanguage = () => {
      setLanguage(
        document.documentElement.lang === "en"
          ? "en"
          : "ar"
      );
    };

    syncLanguage();

    const observer = new MutationObserver(syncLanguage);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "dir"],
    });

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
      observer.disconnect();

      window.removeEventListener(
        "onair-language-change",
        handleLanguageChange
      );
    };
  }, []);

  /* =========================================
     MODAL — SCROLL LOCK
  ========================================= */

  useEffect(() => {
    if (!selectedStage) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedStage(null);
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
  }, [selectedStage]);

  /* =========================================
     SECTION VISIBILITY
     Preserves existing camera corner effects
  ========================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle(
          "is-visible",
          entry.isIntersecting
        );
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================
     GSAP — CINEMATIC ANIMATIONS
  ========================================= */

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const selectAll = (selector: string) =>
        Array.from(
          section.querySelectorAll<HTMLElement>(selector)
        );

      const header = section.querySelector<HTMLElement>(
        ".oa-production-header"
      );

      const tables = selectAll(
        ".oa-production-table"
      );

      const stageTrack = section.querySelector<HTMLElement>(
        ".oa-stage-track"
      );

      const stageCards = selectAll(
        ".oa-stage-card"
      );

      const filesTrack = section.querySelector<HTMLElement>(
        ".oa-files-track"
      );

      const fileFrames = selectAll(
        ".oa-file-frame"
      );

      const footer = section.querySelector<HTMLElement>(
        ".oa-production-footer"
      );

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /* -------------------------------------
         REDUCED MOTION
      ------------------------------------- */

      if (reducedMotion) {
        gsap.set(
          [
            ...(header ? [header] : []),
            ...tables,
            ...stageCards,
            ...fileFrames,
            ...(footer ? [footer] : []),
          ],
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            filter: "none",
          }
        );

        section.style.setProperty(
          "--timeline-progress",
          "1"
        );

        section.style.setProperty(
          "--character-progress",
          "1"
        );

        return;
      }

      /* -------------------------------------
         01 — HEADER ENTRANCE
      ------------------------------------- */

      if (header) {
        gsap.fromTo(
          header,
          {
            autoAlpha: 0,
            y: 65,
            scale: 0.94,
            filter: "blur(15px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.35,
            ease: "power4.out",

            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      /* -------------------------------------
         02 — PANELS REVEAL
      ------------------------------------- */

      tables.forEach((table, index) => {
        gsap.fromTo(
          table,
          {
            autoAlpha: 0,
            y: 75,
            scale: 0.93,
            filter: "blur(10px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.15,
            delay: index * 0.12,
            ease: "power3.out",

            scrollTrigger: {
              trigger: table,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* -------------------------------------
         03 — STAGES STAGGER
      ------------------------------------- */

      if (stageTrack && stageCards.length > 0) {
        gsap.fromTo(
          stageCards,
          {
            autoAlpha: 0,
            y: 45,
            x: (index: number) =>
              index % 2 === 0 ? -22 : 22,
            rotation: (index: number) =>
              index % 2 === 0 ? -2 : 2,
            scale: 0.92,
            filter: "blur(8px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            rotation: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.13,
            ease: "power3.out",

            scrollTrigger: {
              trigger: stageTrack,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      /* -------------------------------------
         04 — FILM STRIP REVEAL
      ------------------------------------- */

      if (filesTrack && fileFrames.length > 0) {
        gsap.fromTo(
          fileFrames,
          {
            autoAlpha: 0,
            y: 48,
            scale: 0.87,
            rotation: (index: number) =>
              index % 2 === 0 ? -4 : 4,
            filter: "blur(8px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.11,
            ease: "back.out(1.3)",

            scrollTrigger: {
              trigger: filesTrack,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      /* -------------------------------------
         05 — FOOTER ENTRANCE
      ------------------------------------- */

      if (footer) {
        gsap.fromTo(
          footer,
          {
            autoAlpha: 0,
            y: 35,
            filter: "blur(6px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
              trigger: footer,
              start: "top 96%",
              once: true,
            },
          }
        );
      }

      /* -------------------------------------
         06 — SCROLL TIMELINE
      ------------------------------------- */

      const progress = {
        value: 0,
      };

      section.style.setProperty(
        "--timeline-progress",
        "0"
      );

      section.style.setProperty(
        "--character-progress",
        "0"
      );

      gsap.to(progress, {
        value: 1,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },

        onUpdate: () => {
          const p = progress.value;

          const clamp = (value: number) =>
            Math.max(0, Math.min(1, value));

          const timelineProgress = clamp(
            (p - 0.16) / 0.56
          );

          const characterIn = clamp(
            (p - 0.08) / 0.18
          );

          const characterOut = clamp(
            (0.86 - p) / 0.18
          );

          const characterProgress =
            characterIn * characterOut;

          section.style.setProperty(
            "--timeline-progress",
            timelineProgress.toFixed(4)
          );

          section.style.setProperty(
            "--character-progress",
            characterProgress.toFixed(4)
          );
        },
      });

      /* -------------------------------------
         REFRESH AFTER LAYOUT
      ------------------------------------- */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    {
      scope: sectionRef,
    }
  );

  /* =========================================
     STAGE STATUS
  ========================================= */

  const renderStageStatus = (
    stage: ProductionStage
  ) => {
    if (stage.type === "open") {
      return (
        <span className="oa-status-live open-status">
          <i />
          {isArabic ? "مفتوح" : "OPEN"}
        </span>
      );
    }

    if (stage.type === "progress") {
      return (
        <div className="oa-status-state">
          {isArabic ? "قيد التجهيز" : "In progress"}
        </div>
      );
    }

    if (stage.type === "secret") {
      return (
        <span className="oa-status-secret">
          <i />
          {isArabic ? "سرّ" : "CLASSIFIED"}
        </span>
      );
    }

    return (
      <div className="oa-status-state">
        {isArabic ? "قريبًا" : "Soon"}
      </div>
    );
  };

  /* =========================================
     PAGE
  ========================================= */

  return (
    <section
      ref={sectionRef}
      id="productionSection"
      className="oa-production"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      {/* CINEMATIC BACKGROUND */}

      <div
        className="oa-production-bg"
        aria-hidden="true"
      />

      <div
        className="oa-production-overlay"
        aria-hidden="true"
      />

      <div
        className="oa-production-scanline"
        aria-hidden="true"
      />

      <div
        className="oa-production-light"
        aria-hidden="true"
      />

      {/* CAMERA FRAME */}

      <span className="oa-prod-corner oa-prod-tl" />
      <span className="oa-prod-corner oa-prod-tr" />
      <span className="oa-prod-corner oa-prod-bl" />
      <span className="oa-prod-corner oa-prod-br" />

      {/* CHARACTERS */}

      <div
        className="production-character production-mr-bean"
        aria-hidden="true"
      >
        <img
          src="/images/mr-bean.png"
          alt=""
        />
      </div>

      <div
        className="production-character production-teddy"
        aria-hidden="true"
      >
        <img
          src="/images/teddy.png"
          alt=""
        />
      </div>

      {/* PRODUCTION HEADER */}

      <header className="oa-production-header">
        <div
          className="oa-production-index"
          dir="ltr"
        >
          <span>02</span>
          <i aria-hidden="true" />
          <span>05</span>
        </div>

        <div className="oa-production-label">
          {isArabic
            ? "رحلة الإنتاج"
            : "PRODUCTION JOURNEY"}
        </div>

        <h2>
          {isArabic
            ? "رحلة الإنتاج"
            : "Production Journey"}
        </h2>

        <p>
          {isArabic
            ? "من الفكرة الأولى إلى آخر كادر"
            : "From the first idea to the final frame"}
        </p>

        <div
          className="oa-production-title-line"
          aria-hidden="true"
        />
      </header>

      {/* MAIN CONTENT */}

      <div className="oa-production-content">

        {/* PRODUCTION TIMELINE */}

        <section
          className="oa-production-table oa-status-table"
          aria-labelledby="production-status-title"
        >
          <header className="oa-table-header">
            <div>
              <span>
                {isArabic
                  ? "حالة الإنتاج"
                  : "PRODUCTION STATUS"}
              </span>

              <h3 id="production-status-title">
                {isArabic
                  ? "مراحل الإنتاج"
                  : "Production Stages"}
              </h3>
            </div>

            <small dir="ltr">06</small>
          </header>

          <div className="oa-stage-track" role="list">
            {productionStages.map((stage, index) => {
              const style = {
                "--row-delay": `${0.16 + index * 0.08}s`,
                "--stage-index": index,
              } as CSSProperties;

              const stageContent = (
                <>
                  <div
                    className="oa-stage-node-wrap"
                    aria-hidden="true"
                  >
                    <span
                      className="oa-stage-number"
                      dir="ltr"
                    >
                      {stage.number}
                    </span>

                    <span className="oa-stage-node" />
                  </div>

                  <div className="oa-stage-copy">
                    <span className="oa-stage-en">
                      {stage.enTitle}
                    </span>

                    <h4>
                      {isArabic
                        ? stage.arTitle
                        : stage.enTitle}
                    </h4>

                    <p>
                      {isArabic
                        ? stage.arDescription
                        : stage.enDescription}
                    </p>
                  </div>

                  <div className="oa-stage-state">
                    {renderStageStatus(stage)}
                  </div>
                </>
              );

              if (stage.href) {
                return (
                  <a
                    key={stage.number}
                    role="listitem"
                    href={stage.href}
                    className={`oa-stage-card clickable ${
                      stage.active ? "active" : ""
                    }`}
                    style={style}
                  >
                    {stageContent}
                  </a>
                );
              }

              if (
                stage.type === "open" ||
                stage.type === "secret"
              ) {
                return (
                  <button
                    key={stage.number}
                    type="button"
                    role="listitem"
                    className={`oa-stage-card clickable ${
                      stage.active ? "active" : ""
                    } ${
                      stage.type === "secret"
                        ? "secret-stage"
                        : ""
                    }`}
                    style={style}
                    onClick={() => setSelectedStage(stage)}
                    aria-haspopup="dialog"
                  >
                    {stageContent}
                  </button>
                );
              }

              return (
                <article
                  key={stage.number}
                  role="listitem"
                  className={`oa-stage-card ${
                    stage.active ? "active" : ""
                  }`}
                  style={style}
                >
                  {stageContent}
                </article>
              );
            })}
          </div>
        </section>

        {/* PROJECT FILES — FILM STRIP */}

        <section
          className="oa-production-table oa-files-table"
          aria-labelledby="project-files-title"
        >
          <header className="oa-table-header">
            <div>
              <span>
                {isArabic
                  ? "مخرجات الرحلة"
                  : "PROJECT DELIVERABLES"}
              </span>

              <h3 id="project-files-title">
                {isArabic
                  ? "ملفات المشروع"
                  : "Project Files"}
              </h3>
            </div>

            <small dir="ltr">07</small>
          </header>

          <div className="oa-files-track" role="list">
            {projectFiles.map((file, index) => {
              const style = {
                "--row-delay": `${0.18 + index * 0.06}s`,
                "--file-index": index,
              } as CSSProperties;

              return (
                <article
                  key={file.number}
                  role="listitem"
                  className="oa-file-frame"
                  style={style}
                >
                  <div className="oa-file-frame-top">
                    <span
                      className="oa-file-number"
                      dir="ltr"
                    >
                      {file.number}
                    </span>

                    <span className="oa-file-state">
                      {isArabic
                        ? file.arState
                        : file.enState}
                    </span>
                  </div>

                  <div className="oa-file-info">
                    <span className="oa-file-en">
                      {file.enTitle}
                    </span>

                    <h4>
                      {isArabic
                        ? file.arTitle
                        : file.enTitle}
                    </h4>

                    <p>
                      {isArabic
                        ? file.arDescription
                        : file.enDescription}
                    </p>
                  </div>

                  <div
                    className="oa-file-frame-bottom"
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {/* FOOTER */}

      <footer className="oa-production-footer">
        <span dir="ltr">
          {isArabic
            ? "ملف الإنتاج / 002"
            : "PRODUCTION FILE / 002"}
        </span>

        <p>
          {isArabic
            ? "كل مرحلة بتقربنا من الكادر الأخير"
            : "Every stage brings us closer to the final frame"}
        </p>

        <span dir="ltr">
          {isArabic
            ? "أون إير / الأرشيف"
            : "ON AIR / ARCHIVE"}
        </span>
      </footer>

      {/* CLASSIFIED MODAL */}

      {selectedStage && (
        <div
          className="oa-stage-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedStage(null);
            }
          }}
        >
          <div
            className="oa-stage-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="oa-stage-modal-title"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <button
              type="button"
              className="oa-stage-modal-close"
              onClick={() => setSelectedStage(null)}
              aria-label={isArabic ? "إغلاق" : "Close"}
            >
              ×
            </button>

            <div
              className="oa-stage-modal-symbol"
              aria-hidden="true"
            >
              {selectedStage.type === "secret" ? "✳" : "✦"}
            </div>

            <span
              className="oa-stage-modal-eyebrow"
              dir="ltr"
            >
              {selectedStage.type === "secret"
                ? isArabic
                  ? "ملف سري / ON AIR"
                  : "CLASSIFIED FILE / ON AIR"
                : isArabic
                  ? "مرحلة متاحة / ON AIR"
                  : "OPEN STAGE / ON AIR"}
            </span>

            <h3 id="oa-stage-modal-title">
              {selectedStage.type === "secret"
                ? isArabic
                  ? "لسه دول سر..."
                  : "Some things are still a secret..."
                : isArabic
                  ? selectedStage.arTitle
                  : selectedStage.enTitle}
            </h3>

            <p>
              {selectedStage.type === "secret"
                ? isArabic
                  ? "المونتاج والنسخة النهائية لسه مخبيين تفاصيل كتير. مش كل حاجة ينفع تتكشف دلوقتي… خلي المفاجأة لوقتها."
                  : "Editing and the final cut still hold details we are not ready to reveal. Not everything can be shown yet. Let the surprise come at the right time."
                : isArabic
                  ? selectedStage.arDescription
                  : selectedStage.enDescription}
            </p>

            <div
              className="oa-stage-modal-bottom"
              dir="ltr"
            >
              <span />
              <small>ON AIR بِالعَافيَه</small>
              <span />
            </div>

            <button
              type="button"
              className="oa-stage-modal-confirm"
              onClick={() => setSelectedStage(null)}
            >
              {isArabic ? "تمام، مستنيين" : "GOT IT"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
