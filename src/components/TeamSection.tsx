import { useEffect, useState } from "react";
import "./TeamSection.css";

type Language = "ar" | "en";

type TeamMember = {
  nameAr: string;
  nameEn: string;
  photo: string;
  rolesAr: string[];
  rolesEn: string[];
};

const teamMembers: TeamMember[] = [
  {
    nameAr: "عادل محمد",
    nameEn: "Adel Mohamed",
    photo: "images/team/adel-mohamed.jpeg",
    rolesAr: ["إخراج", "مونتاج"],
    rolesEn: ["Direction", "Editing"],
  },
  {
    nameAr: "آيه بسيوني",
    nameEn: "Aya Bassiouni",
    photo: "images/team/aya-bassiouni.jpeg",
    rolesAr: ["مساعد مخرج", "هندسة صوتية"],
    rolesEn: ["Assistant Director", "Sound Engineering"],
  },
  {
    nameAr: "يوسف حسن",
    nameEn: "Youssef Hassan",
    photo: "images/team/youssef-hassan.jpeg",
    rolesAr: ["مدير التصوير"],
    rolesEn: ["Director of Photography"],
  },
  {
    nameAr: "إسراء أحمد",
    nameEn: "Esraa Ahmed",
    photo: "images/team/esraa-ahmed.jpeg",
    rolesAr: ["سيناريست", "ديكور"],
    rolesEn: ["Screenwriting", "Set Design"],
  },
  {
    nameAr: "بسملة رضا",
    nameEn: "Basmala Reda",
    photo: "images/team/basmala-reda.jpeg",
    rolesAr: ["راكور", "ديكور"],
    rolesEn: ["Script Continuity", "Set Design"],
  },
  {
    nameAr: "مريم محمد",
    nameEn: "Mariam Mohamed",
    photo: "images/team/mariam-mohamed.jpeg",
    rolesAr: ["ستايلست", "تصوير"],
    rolesEn: ["Styling", "Camera"],
  },
  {
    nameAr: "مريم مسعد",
    nameEn: "Mariam Messaad",
    photo: "images/team/mariam-messaad.jpeg",
    rolesAr: ["تصوير", "مونتاج"],
    rolesEn: ["Camera", "Editing"],
  },
  {
    nameAr: "روان عماد",
    nameEn: "Rawan Emad",
    photo: "images/team/rawan-emad.jpeg",
    rolesAr: ["ستايلست", "تصوير"],
    rolesEn: ["Styling", "Camera"],
  },
  {
    nameAr: "ياسمين هاني",
    nameEn: "Yasmin Hany",
    photo: "images/team/yasmin-hany.jpeg",
    rolesAr: ["ميكاب", "ديزاينر"],
    rolesEn: ["Makeup", "Designer"],
  },
  {
    nameAr: "الاء بكر",
    nameEn: "Alaa Bakr",
    photo: "images/team/alaa-bakr.jpeg",
    rolesAr: ["إنتاج", "راكور"],
    rolesEn: ["Production", "Script Continuity"],
  },
  {
    nameAr: "تقي المناخلي",
    nameEn: "Toqa El-Manakhly",
    photo: "images/team/toqa-elmanakhly.jpeg",
    rolesAr: ["تسويق", "ميديا"],
    rolesEn: ["Marketing", "Media"],
  },
  {
    nameAr: "رويدا صيام",
    nameEn: "Rowaida Siam",
    photo: "images/team/rowaida-siam.jpeg",
    rolesAr: ["تصوير", "إضاءة"],
    rolesEn: ["Camera", "Lighting"],
  },
];

type Position = -2 | -1 | 0 | 1 | 2;

function CrewImage({
  member,
  language,
  variant = "main",
}: {
  member: TeamMember;
  language: Language;
  variant?: "main" | "thumbnail";
}) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = `${import.meta.env.BASE_URL}${member.photo}`;
  const displayName =
    language === "ar" ? member.nameAr : member.nameEn;

  if (imageError) {
    return (
      <div
        className={`oa-carousel-fallback oa-carousel-fallback-${variant}`}
        aria-label={displayName}
      >
        <span>{displayName.charAt(0)}</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={variant === "main" ? displayName : ""}
      className={`oa-carousel-photo oa-carousel-photo-${variant}`}
      loading="eager"
      draggable={false}
      onError={() => setImageError(true)}
    />
  );
}

function CrewCard({
  member,
  language,
  position,
  onSelect,
}: {
  member: TeamMember;
  language: Language;
  position: Position;
  onSelect: () => void;
}) {
  const positionClass = [
    "far-left",
    "left",
    "center",
    "right",
    "far-right",
  ][position + 2];

  const displayName =
    language === "ar" ? member.nameAr : member.nameEn;

  const roles =
    language === "ar" ? member.rolesAr : member.rolesEn;

  return (
    <button
      type="button"
      className={`oa-carousel-card oa-card-${positionClass} ${
        position === 0 ? "is-center" : ""
      }`}
      onClick={onSelect}
      aria-label={displayName}
      aria-pressed={position === 0}
      tabIndex={0}
    >
      <div className="oa-carousel-image">
        <CrewImage
          member={member}
          language={language}
        />

        <div className="oa-carousel-shade" />

        {/* Main card caption */}
        <div className="oa-carousel-main-caption">
          <h3>{displayName}</h3>
          <p>{roles.join(" / ")}</p>
        </div>

        {/* Side card caption */}
        <div className="oa-carousel-mini-caption">
          <strong>{displayName}</strong>
          <span>{roles.join(" / ")}</span>
        </div>
      </div>
    </button>
  );
}

export default function TeamSection() {
  const [language, setLanguage] = useState<Language>("ar");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isArabic = language === "ar";

  // Sync with website language
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

    window.addEventListener(
      "onair-language-change",
      onLanguageChange
    );

    return () => {
      mutationObserver.disconnect();

      window.removeEventListener(
        "onair-language-change",
        onLanguageChange
      );
    };
  }, []);

  // Automatic carousel rotation
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSelectedIndex((current) =>
        (current + 1) % teamMembers.length
      );
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  // Five visible positions around the center
  const visibleMembers = ([-2, -1, 0, 1, 2] as Position[]).map(
    (position) => {
      const index =
        (selectedIndex + position + teamMembers.length) %
        teamMembers.length;

      return {
        member: teamMembers[index],
        index,
        position,
      };
    }
  );

  return (
    <section
      id="team"
      className="oa-team"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      <div className="oa-carousel-container">

        {/* HEADER */}
        <header className="oa-carousel-header">
          <div className="oa-carousel-overline" dir="ltr">
            <span>ON AIR</span>
            <i />
            <span>THE CREW ARCHIVE</span>
          </div>

          <span className="oa-carousel-kicker">
            {isArabic ? "وراء الكواليس" : "BEHIND THE SCENES"}
          </span>

          <h2>
            {isArabic
              ? "الناس اللي ورا الحكاية"
              : "THE PEOPLE BEHIND THE STORY"}
          </h2>

          <p>
            {isArabic
              ? "كل واحد فينا كان له دور في صناعة الحكاية، من أول فكرة لحد آخر كادر."
              : "Every person played a part in bringing this story to life."}
          </p>
        </header>

        {/* CINEMATIC CAROUSEL */}
        <div className="oa-carousel-stage" dir="ltr">
          <div className="oa-carousel-glow" />

          <div className="oa-carousel-track">
            {visibleMembers.map(({ member, index, position }) => (
              <CrewCard
                key={member.nameEn}
                member={member}
                language={language}
                position={position}
                onSelect={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* AUTO PROGRESS */}
        <div className="oa-carousel-progress" aria-hidden="true">
          <span key={selectedIndex} />
        </div>

        {/* FOOTER */}
        <footer className="oa-carousel-footer">
          <span className="oa-carousel-footer-line" />

          <p>
            {isArabic
              ? "مختلفين في أدوارنا… لكن جمعنا نفس الحلم."
              : "Different roles. One shared vision."}
          </p>

          <span dir="ltr">ON AIR بِالعَافيَه</span>
        </footer>

      </div>
    </section>
  );
}