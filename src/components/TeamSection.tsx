import { useEffect, useRef, useState } from "react";
import "./TeamSection.css";

type Language = "ar" | "en";

type IconName =
  | "clapper"
  | "headset"
  | "camera"
  | "pen"
  | "layers"
  | "hanger"
  | "edit"
  | "styleCamera"
  | "makeup"
  | "production"
  | "megaphone"
  | "spotlight";

type TeamMember = {
  number: string;
  name: string;
  icon: IconName;
  rolesAr: string[];
  rolesEn: string[];
  photo?: string;
};

const teamMembers: TeamMember[] = [
  {
    number: "01",
    name: "عادل محمد",
    icon: "clapper",
    rolesAr: ["إخراج", "مونتاج"],
    rolesEn: ["Direction", "Editing"],
  },
  {
    number: "02",
    name: "آيه بسيوني",
    icon: "headset",
    rolesAr: ["مساعد مخرج", "هندسة صوتية"],
    rolesEn: ["Assistant Director", "Sound Engineering"],
  },
  {
    number: "03",
    name: "يوسف حسن",
    icon: "camera",
    rolesAr: ["مدير التصوير"],
    rolesEn: ["Director of Photography"],
  },
  {
    number: "04",
    name: "إسراء أحمد",
    icon: "pen",
    rolesAr: ["سيناريست", "ديكور"],
    rolesEn: ["Screenwriting", "Set Design"],
  },
  {
    number: "05",
    name: "بسملة رضا",
    icon: "layers",
    rolesAr: ["راكور", "ديكور"],
    rolesEn: ["Script Continuity", "Set Design"],
  },
  {
    number: "06",
    name: "مريم محمد",
    icon: "hanger",
    rolesAr: ["ستايلست", "تصوير"],
    rolesEn: ["Styling", "Camera"],
  },
  {
    number: "07",
    name: "مريم مسعد",
    icon: "edit",
    rolesAr: ["تصوير", "مونتاج"],
    rolesEn: ["Camera", "Editing"],
  },
  {
    number: "08",
    name: "روان عماد",
    icon: "styleCamera",
    rolesAr: ["ستايلست", "تصوير"],
    rolesEn: ["Styling", "Camera"],
  },
  {
    number: "09",
    name: "ياسمين هاني",
    icon: "makeup",
    rolesAr: ["ميكاب", "ديزاينر"],
    rolesEn: ["Makeup", "Designer"],
  },
  {
    number: "10",
    name: "الاء بكر",
    icon: "production",
    rolesAr: ["إنتاج", "راكور"],
    rolesEn: ["Production", "Script Continuity"],
  },
  {
    number: "11",
    name: "تقي المناخلي",
    icon: "megaphone",
    rolesAr: ["تسويق", "ميديا"],
    rolesEn: ["Marketing", "Media"],
  },
  {
    number: "12",
    name: "رويدا صيام",
    icon: "spotlight",
    rolesAr: ["تصوير", "إضاءة"],
    rolesEn: ["Camera", "Lighting"],
  },
];

function TeamIcon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 64 64"
      className="oa-team-icon"
      aria-hidden="true"
    >
      {name === "clapper" && (
        <>
          <rect x="9" y="23" width="46" height="32" rx="3" {...common} />
          <path d="M9 23 13 11h43l-4 12" {...common} />
          <path d="m21 11 7 12 M35 11l7 12 M49 11l7 12" {...common} />
          <path d="M19 34h26 M19 41h18" {...common} />
        </>
      )}

      {name === "headset" && (
        <>
          <path d="M12 34v-5a20 20 0 0 1 40 0v5" {...common} />
          <rect x="10" y="31" width="9" height="17" rx="4" {...common} />
          <rect x="45" y="31" width="9" height="17" rx="4" {...common} />
          <path d="M49 48c-2 6-8 8-16 8h-4" {...common} />
          <path d="M29 56h-5" {...common} />
        </>
      )}

      {name === "camera" && (
        <>
          <rect x="7" y="19" width="50" height="34" rx="5" {...common} />
          <path d="M19 19l4-7h17l5 7" {...common} />
          <circle cx="32" cy="36" r="11" {...common} />
          <circle cx="32" cy="36" r="5" {...common} />
          <circle cx="49" cy="26" r="2" fill="currentColor" />
        </>
      )}

      {name === "pen" && (
        <>
          <path d="m15 48 4-13L43 11l10 10-24 24-14 3Z" {...common} />
          <path d="m37 17 10 10 M19 35l10 10" {...common} />
          <path d="m15 48 10-3" {...common} />
          <path d="M12 56h40" {...common} />
        </>
      )}

      {name === "layers" && (
        <>
          <path d="m32 10 22 12-22 12L10 22 32 10Z" {...common} />
          <path d="m10 31 22 12 22-12" {...common} />
          <path d="m10 40 22 12 22-12" {...common} />
        </>
      )}

      {name === "hanger" && (
        <>
          <path d="M30 18a5 5 0 1 1 8 4c-3 2-5 3-5 7" {...common} />
          <path d="m32 29-22 19a3 3 0 0 0 2 5h40a3 3 0 0 0 2-5L32 29Z" {...common} />
        </>
      )}

      {name === "edit" && (
        <>
          <circle cx="17" cy="47" r="6" {...common} />
          <circle cx="17" cy="17" r="6" {...common} />
          <path d="m22 20 30 27 M22 44l30-27" {...common} />
          <path d="M47 47l7 7 M47 17l7-7" {...common} />
        </>
      )}

      {name === "styleCamera" && (
        <>
          <path d="M18 17a4 4 0 1 1 7 3c-3 2-4 4-4 6" {...common} />
          <path d="m22 28-12 11a3 3 0 0 0 2 5h21" {...common} />
          <rect x="32" y="27" width="24" height="24" rx="4" {...common} />
          <circle cx="44" cy="39" r="7" {...common} />
        </>
      )}

      {name === "makeup" && (
        <>
          <path d="m17 48 23-29 9 7-23 29-9-7Z" {...common} />
          <path d="m36 23 9 7 M17 48l-5 9 10-2" {...common} />
          <path d="M43 12c5-3 9 1 8 5l-5 6-8-7 5-4Z" {...common} />
        </>
      )}

      {name === "production" && (
        <>
          <rect x="13" y="12" width="38" height="44" rx="4" {...common} />
          <path d="M24 12v-3h16v3" {...common} />
          <path d="m21 27 3 3 5-6 M33 28h10" {...common} />
          <path d="m21 40 3 3 5-6 M33 41h10" {...common} />
          <path d="M21 50h22" {...common} />
        </>
      )}

      {name === "megaphone" && (
        <>
          <path d="M10 27h12l27-12v34L22 37H10z" {...common} />
          <path d="m22 37 5 15h10l-8-18" {...common} />
          <path d="M53 25l5-3 M54 33h6 M53 41l5 3" {...common} />
        </>
      )}

      {name === "spotlight" && (
        <>
          <path d="M20 11h24l-5 12H25l-5-12Z" {...common} />
          <path d="M25 23 12 52 M39 23l13 29" {...common} />
          <path d="M18 52h28 M32 23v22" {...common} />
          <path d="m27 45 5 6 5-6" {...common} />
        </>
      )}
    </svg>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [language, setLanguage] = useState<Language>("ar");

  const isArabic = language === "ar";

  // Sync with the website language switch
  useEffect(() => {
    const syncLanguage = () => {
      setLanguage(
        document.documentElement.lang === "en" ? "en" : "ar"
      );
    };

    syncLanguage();

    const mutationObserver = new MutationObserver(syncLanguage);

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "dir"],
    });

    const onLanguageChange = (event: Event) => {
      const value = (event as CustomEvent<Language>).detail;

      if (value === "ar" || value === "en") {
        setLanguage(value);
      }
    };

    window.addEventListener("onair-language-change", onLanguageChange);

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener("onair-language-change", onLanguageChange);
    };
  }, []);

  // Reveal the section when it enters the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      section.classList.add("oa-team-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("oa-team-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="oa-team"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      {/* Background image and subtle grain */}
      <div className="oa-team-background" aria-hidden="true" />
      <div className="oa-team-grain" aria-hidden="true" />

      <div className="oa-team-container">

        <header className="oa-team-header">
          <div className="oa-team-overline" dir="ltr">
            <span>ON AIR</span>
            <i />
            <span>THE CREW</span>
            <i />
            <span>12 PEOPLE</span>
          </div>

          <span className="oa-team-kicker">
            <span className="oa-team-dot" />
            {isArabic
              ? "وراء كل كادر حكاية"
              : "BEHIND EVERY FRAME"}
          </span>

          <h2>
            {isArabic
              ? "الناس اللي ورا الحكاية"
              : "THE PEOPLE BEHIND THE FRAME"}
          </h2>

          <p>
            {isArabic
              ? "كل واحد فينا كان شايل جزء من الحكاية. من أول فكرة لحد آخر كادر، كل دور كان ليه أثر في إن الفيلم يبقى بالشكل اللي تخيلناه."
              : "Every person carried a part of this story. From the first idea to the final frame, every role helped bring our film to life."}
          </p>

          <div className="oa-team-count">
            <strong dir="ltr">12</strong>
            <span>
              {isArabic
                ? "عضو — حكاية واحدة"
                : "MEMBERS — ONE STORY"}
            </span>
          </div>
        </header>

        <div className="oa-team-grid">
          {teamMembers.map((member, index) => {
            const roles = isArabic ? member.rolesAr : member.rolesEn;

            return (
              <article
                className="oa-team-card"
                key={member.number}
                style={{
                  animationDelay: `${index * 85}ms`,
                }}
              >
                <div className="oa-team-card-top">
                  <span className="oa-team-card-number" dir="ltr">
                    CREW / {member.number}
                  </span>

                  <span className="oa-team-card-mark" aria-hidden="true">
                    ✳
                  </span>
                </div>

                <div className="oa-team-portrait">
                  <span
                    className="oa-team-portrait-watermark"
                    aria-hidden="true"
                  >
                    {member.number}
                  </span>

                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="oa-team-icon-wrap">
                      <TeamIcon name={member.icon} />
                    </div>
                  )}

                  <span className="oa-team-photo-corner corner-tl" />
                  <span className="oa-team-photo-corner corner-tr" />
                  <span className="oa-team-photo-corner corner-bl" />
                  <span className="oa-team-photo-corner corner-br" />
                </div>

                <div className="oa-team-member-info">
                  <span className="oa-team-member-label">
                    {isArabic ? "من فريق الفيلم" : "FILM CREW"}
                  </span>

                  <h3>{member.name}</h3>

                  <div className="oa-team-roles">
                    {roles.map((role) => (
                      <span key={role}>{role}</span>
                    ))}
                  </div>
                </div>

                <div className="oa-team-card-footer">
                  <span dir="ltr">ON AIR / 2026</span>
                  <span dir="ltr">{member.number} — 12</span>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="oa-team-footer">
          <span className="oa-team-footer-line" />

          <p>
            {isArabic
              ? "مختلفين في أدوارنا… لكن جمعنا نفس الحلم."
              : "Different roles. One shared vision."}
          </p>

          <span className="oa-team-footer-brand" dir="ltr">
            ON AIR بِالعَافيَه
          </span>
        </footer>

      </div>
    </section>
  );
}