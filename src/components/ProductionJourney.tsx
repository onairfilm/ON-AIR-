import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./ProductionJourney.css";

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
  type: "open" | "progress" | "soon";
  href?: string;
  active?: boolean;
};

/* =========================================
   PROJECT FILES — 07
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
   PRODUCTION STAGES — 06
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
    href: "/story.html",
  },
  {
    number: "03",
    arTitle: "التحضير",
    enTitle: "Pre-Production",
    arDescription:
      "اختيار الكاست والمواقع وتجهيز كل تفصيلة قبل أول كادر.",
    enDescription:
      "Casting, choosing locations, and preparing every detail before the first frame.",
    type: "progress",
    active: true,
  },
  {
    number: "04",
    arTitle: "التصوير",
    enTitle: "Shooting",
    arDescription:
      "هنا تتحول الكلمات والتحضيرات إلى كادرات حقيقية.",
    enDescription:
      "Where the words and preparation become real frames.",
    type: "soon",
  },
  {
    number: "05",
    arTitle: "المونتاج",
    enTitle: "Editing",
    arDescription:
      "ترتيب اللقطات وضبط الإيقاع وتجميع الحكاية.",
    enDescription:
      "Shaping the cuts, the rhythm, and the story.",
    type: "soon",
  },
  {
    number: "06",
    arTitle: "النسخة النهائية",
    enTitle: "Final Cut",
    arDescription:
      "المراجعة واللمسات الأخيرة قبل أن تكتمل الحكاية.",
    enDescription:
      "The final review and finishing touches before the story is complete.",
    type: "soon",
  },
];

export default function ProductionJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof document === "undefined") return "ar";

    return document.documentElement.lang === "en"
      ? "en"
      : "ar";
  });

  const isArabic = language === "ar";

  /* =========================================
     GLOBAL LANGUAGE
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
     SECTION REVEAL
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
     CINEMATIC SCROLL PROGRESS
  ========================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const updateScene = () => {
      rafRef.current = null;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalDistance =
        viewportHeight + rect.height;

      if (totalDistance <= 0) return;

      const rawProgress =
        (viewportHeight - rect.top) /
        totalDistance;

      const progress = Math.max(
        0,
        Math.min(1, rawProgress)
      );

      section.style.setProperty(
        "--scroll-progress",
        progress.toFixed(4)
      );

      const timelineProgress = Math.max(
        0,
        Math.min(
          1,
          (progress - 0.16) / 0.56
        )
      );

      section.style.setProperty(
        "--timeline-progress",
        timelineProgress.toFixed(4)
      );

      const characterIn = Math.max(
        0,
        Math.min(
          1,
          (progress - 0.08) / 0.18
        )
      );

      const characterOut = Math.max(
        0,
        Math.min(
          1,
          (0.86 - progress) / 0.18
        )
      );

      const characterProgress =
        characterIn * characterOut;

      section.style.setProperty(
        "--character-progress",
        characterProgress.toFixed(4)
      );
    };

    const requestSceneUpdate = () => {
      if (rafRef.current !== null) return;

      rafRef.current =
        window.requestAnimationFrame(updateScene);
    };

    updateScene();

    window.addEventListener(
      "scroll",
      requestSceneUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestSceneUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestSceneUpdate
      );

      window.removeEventListener(
        "resize",
        requestSceneUpdate
      );

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  /* =========================================
     STATUS
  ========================================= */

  const renderStageStatus = (
    stage: ProductionStage
  ) => {
    if (stage.type === "open") {
      return (
        <span className="oa-status-live open-status">
          <i />
          {isArabic ? "فتح" : "Open"}
        </span>
      );
    }

    if (stage.type === "progress") {
      return (
        <div className="oa-status-state">
          {isArabic
            ? "قيد التجهيز"
            : "In progress"}
        </div>
      );
    }

    return (
      <div className="oa-status-state">
        {isArabic ? "قريبًا" : "Soon"}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="productionSection"
      className="oa-production"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      {/* =====================================
          CINEMATIC BACKGROUND
      ===================================== */}

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

      {/* =====================================
          CAMERA FRAME
      ===================================== */}

      <span className="oa-prod-corner oa-prod-tl" />
      <span className="oa-prod-corner oa-prod-tr" />
      <span className="oa-prod-corner oa-prod-bl" />
      <span className="oa-prod-corner oa-prod-br" />

      {/* =====================================
          CHARACTERS
      ===================================== */}

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

      {/* =====================================
          HEADER
      ===================================== */}

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

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="oa-production-content">

        {/* ===================================
            PRODUCTION TIMELINE
        =================================== */}

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

        {/* ===================================
            PROJECT FILES — FILM STRIP
        =================================== */}

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

      {/* =====================================
          FOOTER
      ===================================== */}

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
    </section>
  );
}