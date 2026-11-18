import { useEffect, useMemo, useRef, useState } from "react";
import "./ProductionDays.css";

type Language = "ar" | "en";

type ProductionDay = {
  number: string;
  date: string;
  enDate: string;
  arTitle: string;
  enTitle: string;
  arStory: string;
  enStory: string;
  arDetails: string[];
  enDetails: string[];
  video: string;
  photos: [string, string];
  locked?: boolean;
};

function createDay(
  number: string,
  date: string,
  enDate: string,
  arTitle: string,
  enTitle: string,
  arStory: string,
  enStory: string,
  arDetails: string[] = [],
  enDetails: string[] = [],
  locked = false
): ProductionDay {
  const id = number.padStart(2, "0");

  return {
    number: id,
    date,
    enDate,
    arTitle,
    enTitle,
    arStory,
    enStory,
    arDetails,
    enDetails,

    video: `/videos/production-days/day-${id}.mp4`,

    photos: [
      `/images/production-days/day-${id}-01.jpg`,
      `/images/production-days/day-${id}-02.jpg`,
    ],

    locked,
  };
}

/* =====================================================
   PRODUCTION DAYS
===================================================== */

const productionDays: ProductionDay[] = [
  createDay(
    "01",
    "29/6",
    "29 JUN",
    "أول مرة قعدنا فيها سوا",
    "OUR FIRST MEETING",
    "فاكرين أول قعدة لينا؟ كنا لسه بنحاول نتخيل شكل الحكاية اللي عايزين نحكيها. اتجمعنا وبدأنا نتكلم عن فكرة الفيلم، وكل واحد فينا كان عنده حاجة عايز يضيفها. مكنّاش عارفين كل اللي مستنينا، بس كنا عارفين إن دي بداية حاجة نفسنا نعملها بجد.",
    "Remember our first meeting? We were still imagining the story we wanted to tell. We gathered, talked about the film idea, and each of us had something to add. We didn't know everything waiting ahead, but we knew this was the beginning of something we truly wanted to make.",
    ["أول اجتماع جمعنا كفريق", "اتكلمنا عن فكرة الفيلم", "حددنا أول مهامنا"],
    ["Our first team meeting", "Discussing the film idea", "Setting our first tasks"]
  ),

  createDay(
    "02",
    "7/8",
    "07 AUG",
    "رجعنا نكمّل الحكاية",
    "PICKING UP THE STORY",
    "ومع كل مرة كنا بنرجع فيها للفكرة، كنا بنشوفها من زاوية مختلفة. بدأنا نفهم أكتر إحنا عايزين نوصل إيه للناس، وإزاي نخلي الحكاية قريبة منهم ومش مجرد موضوع بيتحكي.",
    "Every time we returned to the idea, we saw it from a different angle. We began to understand what we wanted people to take away, and how to make the story feel close to them rather than just another subject being told."
  ),

  createDay(
    "03",
    "29/8",
    "29 AUG",
    "الصورة بتوضح واحدة واحدة",
    "THE PICTURE GETS CLEARER",
    "في الرحلة دي مفيش حاجة بتتظبط من أول مرة. كنا بنفكر ونسأل ونرجع نبص على الصورة الكبيرة. ومع الوقت، الأفكار اللي كانت متفرقة بدأت تقرب من بعض وتاخد شكل أوضح.",
    "Nothing in this journey came together all at once. We kept thinking, asking questions, and looking at the bigger picture. Little by little, the ideas that once felt scattered began to find their place."
  ),

  createDay(
    "04",
    "2/9",
    "02 SEP",
    "كل سؤال كان بيفتح باب",
    "EVERY QUESTION OPENED A DOOR",
    "كان عندنا أسئلة أكتر من الإجابات، وده كان جزء من الرحلة. كنا بنحاول نفهم الحكاية كويس قبل ما نحكيها، لأننا عارفين إن أي تفصيلة صغيرة ممكن تغيّر إحساس المشهد كله.",
    "We had more questions than answers, and that was part of the journey. We wanted to understand the story before telling it, because even the smallest detail could change the feeling of an entire scene."
  ),

  createDay(
    "05",
    "5/9",
    "05 SEP",
    "مش كل الشغل بيبان",
    "NOT ALL THE WORK IS SEEN",
    "في حاجات كتير بتحصل قبل ما أي حد يشوف نتيجة. كلام، تفكير، محاولات، وتفاصيل بنرجع لها أكتر من مرة. يمكن اللحظات دي مش كلها هتظهر في الفيلم، لكنها جزء أساسي من حكايته.",
    "A lot happens before anyone gets to see a result: conversations, thinking, attempts, and details we revisit more than once. These moments may not all appear in the film, but they are an essential part of its story."
  ),

  createDay(
    "06",
    "14/9",
    "14 SEP",
    "بنقرب من اللي في دماغنا",
    "CLOSER TO THE IDEA",
    "كل ما بنكمّل، بنحس إن الحكاية اللي كانت في دماغنا بقت أقرب إنها تبقى حقيقة. لسه في تفاصيل محتاجة وقت، ولسه في قرارات لازم ناخدها، بس بقينا شايفين الطريق بشكل أوضح.",
    "As we kept going, the story that once lived only in our minds started to feel more real. There were still details to work through and decisions to make, but the road ahead was becoming clearer."
  ),

  createDay(
    "07",
    "18/9",
    "18 SEP",
    "خطوة ورا خطوة",
    "ONE STEP AT A TIME",
    "يمكن الرحلة من برّه تبان مجموعة تواريخ، لكن بالنسبة لنا كل تاريخ وراه كلام وتفكير ومجهود. إحنا كنا بنبني حاجة واحدة، حتى لو كل واحد فينا شايف جزء مختلف منها.",
    "From the outside, this journey may look like a series of dates. For us, every date carries conversations, thought, and effort. We were building one thing together, even when each of us was seeing a different part of it."
  ),

  createDay(
    "08",
    "23/9",
    "23 SEP",
    "بدأنا نحس إننا قربنا",
    "WE COULD FEEL IT GETTING CLOSER",
    "في المرحلة دي بقينا بنبص لكل اللي فات ونحاول نجمعه في صورة واحدة. الفكرة محتاجة تبقى واضحة، وكل حاجة لازم تخدم الحكاية اللي اتفقنا إننا نحكيها.",
    "At this point, we started looking back at everything so far and bringing it into one picture. The idea needed to be clear, and every part had to serve the story we had chosen to tell."
  ),

  createDay(
    "09",
    "3/10",
    "03 OCT",
    "اليوم اللي ختمنا فيه السيناريو",
    "THE SCRIPT GOT ITS FINAL APPROVAL",
    "اليوم ده كان من اللحظات اللي مش هننساها. بعد وقت من الكتابة والمراجعة والتعديل، ختمنا السيناريو أخيرًا، وخدنا موافقة الدكتور. الورق اللي كنا بنشتغل عليه بقى هو الحكاية اللي هنبدأ نحضّر لتنفيذها. ساعتها حسّينا إننا عدّينا خطوة كبيرة فعلًا.",
    "This is one of the moments we won't forget. After writing, reviewing, and revising, we finally completed the script and received the doctor's approval. The pages we had been working on became the story we would prepare to bring to life. It felt like a real milestone.",
    ["ختمنا السيناريو", "أخدنا موافقة الدكتور", "قفلنا مرحلة مهمة من التحضير"],
    ["Finalised the script", "Received the doctor's approval", "Completed a major preparation milestone"]
  ),

  createDay(
    "10",
    "7/10",
    "07 OCT",
    "أول بروفة وأول كاست",
    "FIRST REHEARSAL, FIRST CAST",
    "هنا بدأنا نشوف الحكاية قدامنا بشكل مختلف. كانت أول بروفة وأول كاست، والشخصيات اللي كنا بنكتب عنها بدأت تبقى أشخاص واقفين قدامنا. اللحظة دي فرّقت معانا، لأنها قرّبتنا من الفيلم اللي تخيلناه على الورق.",
    "This was the first time we saw the story differently. Our first rehearsal and our first cast. The characters we had been writing about were now people standing in front of us. It brought us closer to the film we had imagined on paper.",
    ["أول بروفة للفيلم", "أول كاست", "بدأنا نشوف الشخصيات على أرض الواقع"],
    ["Our first rehearsal", "Our first cast", "Seeing the characters come to life"]
  ),

  createDay(
    "11",
    "10/10",
    "10 OCT",
    "كل تفصيلة ليها حساب",
    "EVERY DETAIL MATTERS",
    "قعدنا نراجع تفاصيل الديكورات والاستايلست. كنا عايزين العالم اللي هيظهر قدام الكاميرا يبقى متماسك، وكل حاجة فيه في مكانها. لأن أوقات تفصيلة صغيرة هي اللي بتخلّي المشهد مقنع وتخلّي الناس تصدّق الحكاية.",
    "We sat down to review the set design and styling details. We wanted the world in front of the camera to feel coherent, with everything in its right place. Sometimes a small detail is what makes a scene believable and helps people believe the story.",
    ["مراجعة تفاصيل الديكورات", "مراجعة الاستايلست", "ضبط الشكل البصري للفيلم"],
    ["Reviewing set design", "Reviewing styling details", "Refining the film's visual direction"]
  ),

  createDay(
    "12",
    "14/10",
    "14 OCT",
    "خطوات قبل أول كادر",
    "STEPS BEFORE THE FIRST FRAME",
    "كل ما بنقرب من التصوير، إحساس المسؤولية بيكبر. بنبص على اللي اتعمل، ونفتكر إن كل تفصيلة وصلتنا لهنا كانت محتاجة وقت ومجهود. ولسه في حاجات كتير مستنيانا قبل ما الكاميرا تشتغل.",
    "The closer we got to filming, the greater the responsibility felt. We looked at what we had done and remembered that every detail had taken time and effort. There was still plenty waiting for us before the camera started rolling."
  ),

  createDay(
    "13",
    "21/10",
    "21 OCT",
    "بقى الموضوع حقيقي أكتر",
    "IT STARTED FEELING REAL",
    "بعد كل اللي فات، بقينا بنحس إن الفيلم مش مجرد فكرة بنتكلم عنها. بقى له شكل وتفاصيل وناس مستنياه. وكل ما بنقرب من التنفيذ، بنفتكر أول يوم بدأنا فيه ونسأل نفسنا: معقول وصلنا لكل ده؟",
    "After everything so far, the film no longer felt like just an idea we talked about. It had a shape, details, and people waiting for it. As production got closer, we kept thinking about the first day and asking ourselves: did we really make it this far?"
  ),

  createDay(
    "14",
    "24/10",
    "24 OCT",
    "قبل ما نبدأ مرحلة جديدة",
    "BEFORE A NEW CHAPTER",
    "وصلنا لآخر محطة قبل ما ندخل على أيام التصوير. وراينا شهور من التفكير والتحضير والتجهيز. يمكن لسه في توتر وحاجات كتير في دماغنا، لكن في نفس الوقت في حماس كبير إننا نشوف كل اللي بنيناه وهو بيتحوّل لحقيقة.",
    "We reached the last stop before entering the filming days. Behind us were months of thinking, planning, and preparation. There was still a little nervousness and plenty on our minds, but also a huge excitement to see everything we had built become real."
  ),

  // الأيام المقفولة

  createDay("15", "27/10", "27 OCT", "", "", "", "", [], [], true),
  createDay("16", "28/10", "28 OCT", "", "", "", "", [], [], true),
  createDay("17", "31/10", "31 OCT", "", "", "", "", [], [], true),
  createDay("18", "2/11", "02 NOV", "", "", "", "", [], [], true),
  createDay("19", "4/11", "04 NOV", "", "", "", "", [], [], true),
  createDay("20", "5/11", "05 NOV", "", "", "", "", [], [], true),
  createDay("21", "6/11", "06 NOV", "", "", "", "", [], [], true),
  createDay("22", "7/11", "07 NOV", "", "", "", "", [], [], true),
  createDay("23", "11/11", "11 NOV", "", "", "", "", [], [], true),
  createDay("24", "12/11", "12 NOV", "", "", "", "", [], [], true),
  createDay("25", "13/11", "13 NOV", "", "", "", "", [], [], true),
];

/* =====================================================
   COMPONENT
===================================================== */

export default function ProductionDays() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [language, setLanguage] = useState<Language>("ar");
  const [activeNumber, setActiveNumber] = useState("01");

  const isArabic = language === "ar";

  const activeDay = useMemo(
    () =>
      productionDays.find(
        (day) => day.number === activeNumber
      ) ?? productionDays[0],
    [activeNumber]
  );

  const activeIndex = productionDays
    .filter((day) => !day.locked)
    .findIndex((day) => day.number === activeNumber);

  /* LANGUAGE SYNC */

  useEffect(() => {
    const syncLanguage = () => {
      setLanguage(
        document.documentElement.lang === "en" ? "en" : "ar"
      );
    };

    syncLanguage();

    const observer = new MutationObserver(syncLanguage);

    observer.observe(document.documentElement, {
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
      observer.disconnect();

      window.removeEventListener(
        "onair-language-change",
        onLanguageChange
      );
    };
  }, []);

  /* SECTION REVEAL */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reveal = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle(
          "oa-diary-visible",
          entry.isIntersecting
        );
      },
      { threshold: 0.1 }
    );

    reveal.observe(section);

    return () => reveal.disconnect();
  }, []);

  /* PREVIOUS / NEXT */

  const moveDay = (step: number) => {
    const openDays = productionDays.filter(
      (day) => !day.locked
    );

    const current = openDays.findIndex(
      (day) => day.number === activeNumber
    );

    const next = Math.max(
      0,
      Math.min(openDays.length - 1, current + step)
    );

    setActiveNumber(openDays[next].number);
  };

  const story = isArabic
    ? activeDay.arStory
    : activeDay.enStory;

  const title = isArabic
    ? activeDay.arTitle
    : activeDay.enTitle;

  const details = isArabic
    ? activeDay.arDetails
    : activeDay.enDetails;

  return (
    <section
      ref={sectionRef}
      id="production-days"
      className="oa-diary"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
    >
      <div className="oa-diary-bg" aria-hidden="true" />
      <div className="oa-diary-grain" aria-hidden="true" />

      <span className="oa-diary-frame frame-top-left" />
      <span className="oa-diary-frame frame-top-right" />
      <span className="oa-diary-frame frame-bottom-left" />
      <span className="oa-diary-frame frame-bottom-right" />

      <div className="oa-diary-container">

        {/* INTRO */}

        <header className="oa-diary-intro">
          <div className="oa-diary-overline" dir="ltr">
            <span>ON AIR</span>
            <i />
            <span>OUR PRODUCTION DIARY</span>
            <i />
            <span>25 DATES</span>
          </div>

          <span className="oa-diary-kicker">
            <span className="oa-diary-dot" />

            {isArabic
              ? "من يوميات فريق ON AIR"
              : "A JOURNEY BY ON AIR"}
          </span>

          <h2>
            {isArabic
              ? "دي حكايتنا… يوم ورا يوم"
              : "THIS IS OUR STORY, DAY BY DAY"}
          </h2>

          <p>
            {isArabic
              ? "مش بنحكيلكم عن فيلم وبس… بنحكيلكم عن أيام عشناها، وتفاصيل تعبنا فيها، ولحظات قربتنا من الحكاية اللي نفسنا توصل لكم."
              : "We are not just telling you about a film. We are sharing the days, the details, and the moments that brought us closer to the story we want you to see."}
          </p>

          <div className="oa-diary-intro-quote">
            {isArabic
              ? "تعالوا نرجع لأول يوم… ونحكيلكم إحنا وصلنا لهنا إزاي."
              : "Let's go back to day one and show you how we got here."}
          </div>
        </header>

        {/* DATE TIMELINE */}

        <div className="oa-diary-navigation">
          <div className="oa-diary-nav-heading">
            <span>
              {isArabic
                ? "اختاروا يوم من رحلتنا"
                : "EXPLORE OUR DATES"}
            </span>

            <span dir="ltr">01 — 25</span>
          </div>

          <div
            className="oa-diary-date-track"
            role="tablist"
            dir={isArabic ? "rtl" : "ltr"}
            aria-label={
              isArabic ? "أيام الإنتاج" : "Production days"
            }
          >
            {productionDays.map((day) => {
              const selected = day.number === activeNumber;

              return (
                <button
                  key={day.number}
                  type="button"
                  className={`oa-diary-date ${
                    selected ? "selected" : ""
                  } ${day.locked ? "locked" : ""}`}
                  disabled={day.locked}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveNumber(day.number)}
                >
                  <span className="oa-diary-date-number">
                    {day.number}
                  </span>

                  <span className="oa-diary-date-value">
                    {isArabic ? day.date : day.enDate}
                  </span>

                  {day.locked && (
                    <span
                      className="oa-diary-lock"
                      aria-hidden="true"
                    >
                      ⌑
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="oa-diary-nav-hint">
            {isArabic
              ? "الأيام المقفولة لسه مستنية دورها في الحكاية"
              : "The locked dates are waiting for their turn in the story"}
          </div>
        </div>

        {/* ACTIVE DAY */}

        <article
          className="oa-diary-story"
          key={activeDay.number}
        >
          {/* STORY CONTENT */}

          <section className="oa-diary-story-content">
            <div className="oa-diary-story-meta">
              <span dir="ltr">
                CHAPTER {activeDay.number}
              </span>

              <span>
                <i />
                {isArabic ? "من حكايتنا" : "FROM OUR STORY"}
              </span>
            </div>

            <div className="oa-diary-story-title">
              <span
                className="oa-diary-big-number"
                aria-hidden="true"
              >
                {activeDay.number}
              </span>

              <span
                className="oa-diary-story-date"
                dir="ltr"
              >
                {isArabic ? activeDay.date : activeDay.enDate}
              </span>

              <h3>{title}</h3>
            </div>

            <p className="oa-diary-story-text">
              {story}
            </p>

            {details.length > 0 && (
              <div className="oa-diary-moments">
                <div className="oa-diary-moments-title">
                  <span>
                    {isArabic
                      ? "ومن اليوم ده فاكرين…"
                      : "WE REMEMBER"}
                  </span>

                  <i />
                </div>

                <ul>
                  {details.map((detail, index) => (
                    <li key={`${activeDay.number}-${index}`}>
                      <span dir="ltr">
                        0{index + 1}
                      </span>

                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="oa-diary-signature">
              <span>
                {isArabic ? "مننا ليكم" : "FROM US TO YOU"}
              </span>

              <strong>ON AIR بِالعَافيَه</strong>
            </div>
          </section>

          {/* VIDEO AND PHOTOS */}

          <section
            className="oa-diary-media"
            aria-label={
              isArabic
                ? "فيديو وصور اليوم"
                : "Day video and photos"
            }
          >
            <div className="oa-diary-media-heading">
              <span>
                {isArabic
                  ? "اللي وثّقناه في اليوم ده"
                  : "CAPTURED THAT DAY"}
              </span>

              <span dir="ltr">VIDEO + 02 FRAMES</span>
            </div>

            {/* VIDEO PLAYER */}

            <div className="oa-diary-video-wrap">
              <video
                key={activeDay.video}
                className="oa-diary-video"
                src={activeDay.video}
                controls
                playsInline
                preload="metadata"
              >
                {isArabic
                  ? "المتصفح لا يدعم تشغيل الفيديو."
                  : "Your browser does not support video playback."}
              </video>

              <span className="oa-diary-video-corner">
                REC
              </span>
            </div>

            {/* PHOTO HEADING */}

            <div className="oa-diary-photo-heading">
              <span>
                {isArabic
                  ? "وصورتين من نفس اليوم"
                  : "TWO MORE MOMENTS"}
              </span>

              <span dir="ltr">PHOTO 01 / 02</span>
            </div>

            {/* PHOTO GALLERY */}

            <div className="oa-diary-photos">
              {activeDay.photos.map((photo, index) => (
                <figure
                  className="oa-diary-photo"
                  key={photo}
                >
                  <div className="oa-diary-photo-placeholder">
                    <span>{`PHOTO 0${index + 1}`}</span>

                    <small dir="ltr">
                      {`day-${activeDay.number}-0${index + 1}.jpg`}
                    </small>
                  </div>

                  <img
                    src={photo}
                    alt={
                      isArabic
                        ? `صورة ${index + 1} من يوم ${activeDay.date}`
                        : `Photo ${index + 1} from ${activeDay.enDate}`
                    }
                    loading="lazy"
                    onError={(event) =>
                      event.currentTarget.classList.add("is-missing")
                    }
                  />

                  <figcaption dir="ltr">
                    FRAME 0{index + 1}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* MEDIA FOOTER */}

            <div
              className="oa-diary-media-footer"
              dir="ltr"
            >
              <span>ON AIR / ARCHIVE</span>
              <span>24 FPS</span>
              <span>DAY {activeDay.number}</span>
            </div>
          </section>
        </article>

        {/* FOOTER */}

        <footer className="oa-diary-footer">
          <span
            className="oa-diary-footer-label"
            dir="ltr"
          >
            ON AIR / PRODUCTION LOG
          </span>

          <div className="oa-diary-footer-controls">
            <button
              type="button"
              disabled={activeIndex <= 0}
              onClick={() => moveDay(-1)}
            >
              {isArabic ? "اليوم السابق" : "PREVIOUS"}
            </button>

            <span dir="ltr">
              {activeDay.number} / 14
            </span>

            <button
              type="button"
              disabled={activeIndex >= 13}
              onClick={() => moveDay(1)}
            >
              {isArabic ? "اليوم التالي" : "NEXT"}
            </button>
          </div>

          <span className="oa-diary-footer-note">
            {isArabic
              ? "والحكاية لسه مكملة…"
              : "OUR STORY CONTINUES…"}
          </span>
        </footer>
      </div>
    </section>
  );
}