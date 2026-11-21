import { useEffect, useMemo, useRef, useState } from "react";
import "./ProductionDays.css";

type Language = "ar" | "en";
type PhotoOrientation = "landscape" | "portrait";

type DayMedia = {
  video?: string;
  photos?: string[];
  muted?: boolean;
  photoOrientations?: PhotoOrientation[];
};

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
  video?: string;
  photos: string[];
  muted?: boolean;
  photoOrientations?: PhotoOrientation[];
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
  locked = false,
  media?: DayMedia
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
    // Explicit media prevents the default placeholder paths from being used.
    video: media ? media.video : `/videos/production-days/day-${id}.mp4`,
    photos: media
      ? media.photos ?? []
      : [
          `/images/production-days/day-${id}-01.jpeg`,
          `/images/production-days/day-${id}-02.jpeg`,
        ],
    muted: media?.muted ?? false,
    photoOrientations: media?.photoOrientations ?? [],
    locked,
  };
}

/* =====================================================
   PRODUCTION DAYS
===================================================== */

const productionDays: ProductionDay[] = [
  /* DAY 01 — 29/6: FIRST MEETING, VIDEO MUTED */
  createDay(
    "01",
    "29/6",
    "29 JUN",
    "أول قعدة… وأول خيط في الحكاية",
    "THE FIRST MEETING, THE FIRST THREAD",
    "يوم 29/6 كان أول اجتماع لينا. دخلنا القعدة ومعانا أفكار وأسئلة كتير، وكل واحد فينا عنده تصور نفسه يشوفه في المشروع. اتكلمنا وطرحنا احتمالات مختلفة، وبدأنا ندور على الفكرة اللي نقدر نحط فيها شغفنا ومجهودنا. مكنّاش عارفين ساعتها الرحلة هتوصلنا لفين، لكن كنا عارفين إن دي أول خطوة في حكاية ON AIR.",
    "June 29 was our very first meeting. We walked in with plenty of ideas, questions, and different visions for the project. We talked through possibilities and started looking for an idea that could hold our energy and passion. We didn't know where the journey would take us, but we knew this was the first step in the ON AIR story.",
    [],
    [],
    false,
    {
      video: "/videos/production-days/day-01.mp4",
      photos: [],
      muted: true,
    }
  ),

  /* DAY 02 — 7/8: FIRST MEETING WITH SABA */
  createDay(
    "02",
    "7/8",
    "07 AUG",
    "أول لقاء مع صَبا",
    "OUR FIRST MEETING WITH SABA",
    "يوم 7/8 كان أول لقاء لمخرجنا مع صَبا، بطلة فيلمنا. لحد اليوم ده كانت صَبا جزء من شخصية بنرسم ملامحها في خيالنا وعلى الورق. اللقاء خلّى الحكاية أقرب، وبدأنا نشوف الشخصية بشكل إنساني وحقيقي أكتر. صورة واحدة من اليوم ده، لكنها بتوثّق بداية مهمة في رحلتنا.",
    "On August 7, our director met Saba, the heroine of our film, for the first time. Until then, Saba had existed in our imagination and on the page as a character we were still shaping. Meeting her brought the story closer and gave it a more human, tangible presence. One photograph, but an important beginning in our journey.",
    [],
    [],
    false,
    {
      photos: ["/images/production-days/day-02-01.jpeg"],
    }
  ),

  /* DAY 03 — 29/8: ORGANIZING THE NEXT STEPS */
  createDay(
    "03",
    "29/8",
    "29 AUG",
    "من الفكرة لخطوات واضحة",
    "FROM AN IDEA TO CLEAR NEXT STEPS",
    "في 29/8 اتجمعنا عشان نحط الصورة قدامنا بوضوح: إيه المطلوب مننا؟ إيه أول خطوة؟ وإيه اللي لازم نجهزه بعد كده؟ كانت قعدة ترتيب وتفكير في حجم الشغل اللي مستنينا، ومحاولة نحول الفكرة لخطة نقدر نمشي عليها خطوة خطوة.",
    "On August 29, we got together to see the road ahead more clearly. What was expected of us? Where should we begin? And what needed to be prepared next? It was a meeting full of planning and questions as we tried to turn the idea into a plan we could follow, one step at a time.",
    [],
    [],
    false,
    {
      photos: ["/images/production-days/day-03-01.jpeg"],
    }
  ),

  /* DAY 04 — 2/9: TEAM INTRO VIDEO, NORMAL AUDIO */
  createDay(
    "04",
    "2/9",
    "02 SEP",
    "أول فيديو تعريفي… ومفاجأة صعبة",
    "OUR FIRST TEAM INTRO VIDEO",
    "يوم 2/9 صورنا فيديو تعريفي لفريق ON AIR؛ حاولنا فيه نقدّم نفسنا ونحكي مين إحنا. حضّرنا واشتغلنا كتير، وبذلنا مجهود كبير عشان اليوم يطلع بالشكل اللي متخيلينه. لكن بعد كل التعب، اكتشفنا إن الماتريال باظت. كانت لحظة محبطة، خصوصًا إننا كنا مستنيين نشوف نتيجة شغلنا. ومع ذلك، اليوم ده فضل جزء من الرحلة… لأن مش كل لقطة بتكمل للنهاية، لكن كل محاولة بتسيب أثر.",
    "On September 2, we filmed an introduction video for the ON AIR team, trying to show who we are and tell our story. We prepared, worked hard, and put a lot into making the day turn out the way we imagined. But after all that effort, we discovered that the footage had been damaged. It was disappointing, especially when we were waiting to see the result of our work. Still, the day remains part of our journey: not every shot makes it to the final cut, but every attempt leaves something behind.",
    [
      "أول فيديو تعريفي لفريق ON AIR",
      "تحضير ومجهود كبير قبل التصوير",
      "الماتريال باظت بعد كل التعب",
    ],
    [
      "Our first ON AIR team introduction video",
      "A lot of preparation and effort",
      "The footage was damaged",
    ],
    false,
    {
      video: "/videos/production-days/day-04.mp4",
      photos: [],
      muted: false,
    }
  ),

  /* DAY 05 — 5/9: PLANNING WHAT COMES NEXT */
  createDay(
    "05",
    "5/9",
    "05 SEP",
    "قعدة نرتّب فيها اللي جاي",
    "A MEETING TO PLAN WHAT'S NEXT",
    "يوم 5/9 قعدنا نتفق على اللي هيحصل بعد كده: إيه اللي محتاج يتعمل؟ وإيه الخطوات اللي جاية؟ وإزاي نرتّب شغلنا عشان نتحرك وإحنا عارفين رايحين فين؟ كانت قعدة مهمة بنحاول فيها نجمع الأفكار ونحوّلها لخطوات أوضح للمرحلة اللي بعدها.",
    "On September 5, we sat together to agree on what would happen next. What still needed to be done? Which steps were coming up? And how could we organize the work so we could move forward with a clearer direction? It was an important meeting where we brought our ideas together and shaped them into the next steps.",
    [],
    [],
    false,
    {
      photos: [
        "/images/production-days/day-05-01.jpeg",
        "/images/production-days/day-05-02.jpeg",
      ],
      photoOrientations: ["landscape", "portrait"],
    }
  ),

  /* DAY 06 — 14/9: MORE VIDEO SHOOTS */
  createDay(
    "06",
    "14/9",
    "14 SEP",
    "يوم تاني ورا الكاميرا",
    "ANOTHER DAY BEHIND THE CAMERA",
    "يوم 14/9 صورنا فيديوهات تانية، وكملنا نجمع لحظات من رحلتنا قدام الكاميرا. هنحتفظ هنا بصورة واحدة بالعرض من اليوم ده؛ يمكن صورة واحدة متحكيش كل اللي حصل، لكنها تفضل علامة على يوم جديد من أيام الشغل والمحاولات.",
    "On September 14, we filmed more videos and kept collecting moments from our journey in front of the camera. We're keeping one landscape photo from that day here. One picture can't tell the whole story, but it can still hold a piece of another day of work and trying.",
    [],
    [],
    false,
    {
      photos: ["/images/production-days/day-06-01.jpeg"],
      photoOrientations: ["landscape"],
    }
  ),

  /* DAY 07 — 18/9: FIRST FULL GATHERING WITH SABA — ONE PHOTO */
  createDay(
    "07",
    "18/9",
    "18 SEP",
    "أول لَمّة لينا كلنا مع صَبا",
    "OUR FIRST GATHERING WITH SABA",
    "يوم 18/9 كان أول مرة نتجمع كلنا سوا مع صَبا. بعد فترة من التحضير، وكل واحد فينا بيشتغل على جزء من الرحلة، جه اليوم اللي بقينا فيه كلنا في مكان واحد. كانت لحظة مميزة جمعت الفريق كله ببطلة حكايتنا، وصورة واحدة منها كفاية تفضل فاكرة لينا بداية مختلفة في مشوارنا.",
    "September 18 was the first time we all got together with Saba. After a period of preparation, with everyone working on a different part of the journey, we finally came together in one place. It was a special moment that brought the whole team together with the heroine of our story.",
    [
      "أول تجمع كامل للفريق مع صَبا",
      "بداية مرحلة جديدة في رحلتنا",
    ],
    [
      "The first full team gathering with Saba",
      "The beginning of a new chapter",
    ],
    false,
    {
      photos: ["/images/production-days/day-07-01.jpeg"],
    }
  ),

  /* DAY 08 — 23/9: OPEN DAY, TEXT ONLY */
  createDay(
    "08",
    "23/9",
    "23 SEP",
    "مش كل حكاية محتاجة صورة",
    "NOT EVERY STORY NEEDS A PICTURE",
    "مش كل يوم في الرحلة لازم يكون وراه صورة أو فيديو. في أيام بنعيش تفاصيلها بعيد عن الكاميرا، ونكمّل فيها خطوة ورا خطوة من غير ما ننتبه إننا بنقرّب. ويوم 23/9 كان واحد من الأيام دي؛ يمكن مفيش لقطة محفوظة منه، لكن ليه مكانه في حكايتنا.",
    "Not every day in a journey needs a photo or a video. Some moments happen away from the camera, as we keep moving forward one step at a time. September 23 was one of those days. There may be no frame saved from it, but it still has a place in our story.",
    [],
    [],
    false,
    {
      photos: [],
    }
  ),

  /* DAY 09 — 3/10: SCRIPT SIGNED AND APPROVED */
  createDay(
    "09",
    "3/10",
    "03 OCT",
    "أول خطوة حقيقية",
    "OUR FIRST REAL STEP",
    "يوم 3/10 كان من أهم الأيام في بداية رحلتنا؛ اليوم اللي وقّعنا فيه السيناريو واتوافق عليه. بعد أفكار ونقاشات وتعديلات كتير، بقى معانا أخيرًا نص واضح نقدر نبدأ نبني عليه. اللحظة دي حسّستنا إن المشروع خرج من مرحلة الكلام والتخطيط، وبقى ليه أول خطوة حقيقية على الأرض.",
    "October 3 was one of the most important days at the beginning of our journey: the day we signed off on the script and it was approved. After so many ideas, discussions, and revisions, we finally had a clear script to build on. It felt like the project had moved beyond talking and planning, and taken its first real step.",
    [
      "توقيع السيناريو",
      "اعتماد النص بعد التعديلات",
      "أول خطوة حقيقية في المشروع",
    ],
    [
      "The script was signed",
      "The script was approved",
      "The project's first real step",
    ],
    false,
    {
      video: "/videos/production-days/day-09.mp4",
      photos: [],
    }
  ),

  /* DAY 10 — 7/10: FIRST REHEARSAL AND CAST */
  createDay(
    "10",
    "7/10",
    "07 OCT",
    "أول بروفة وأول كاست",
    "FIRST REHEARSAL, FIRST CAST",
    "هنا بدأنا نشوف الحكاية قدامنا بشكل مختلف. كانت أول بروفة وأول كاست، والشخصيات اللي كنا بنكتب عنها بدأت تبقى أشخاص واقفين قدامنا. اللحظة دي فرّقت معانا، لأنها قرّبتنا من الفيلم اللي تخيلناه على الورق.",
    "This was the first time we saw the story differently. Our first rehearsal and our first cast. The characters we had been writing about were now people standing in front of us. It brought us closer to the film we had imagined on paper.",
    [
      "أول بروفة للفيلم",
      "أول كاست",
      "بدأنا نشوف الشخصيات على أرض الواقع",
    ],
    [
      "Our first rehearsal",
      "Our first cast",
      "Seeing the characters come to life",
    ]
  ),

  /* DAY 11 — 10/10: THE REAL SIDE OF TEAMWORK — ONE PHOTO */
  createDay(
    "11",
    "10/10",
    "10 OCT",
    "مش كل الأيام كانت سهلة",
    "NOT EVERY DAY WAS EASY",
    "مش كل أيامنا كانت بمبي، بالعكس… كان فيه اختلافات وخناقات ومشاكل وعقبات أكتر مما كنا متوقعين. ساعات كنا بنختلف على أصغر التفاصيل، وساعات الضغط كان بيخلّي الطريق أصعب. لكن رغم كل ده، كنا بنحاول نتماسك ونفكّر نفسنا إننا فريق واحد، وإن اللي بيجمعنا أكبر من أي خلاف. لأن الرحلة مش بس لحظات حلوة؛ دي كمان محاولات إننا نكمّل سوا وقت الصعب.",
    "Not every day was easy. There were disagreements, arguments, problems, and more obstacles than we expected. Sometimes we disagreed over the smallest details, and sometimes the pressure made the road harder. But through it all, we kept trying to hold together and remind ourselves that we were one team, connected by something bigger than any disagreement. The journey is not only made of happy moments; it is also about choosing to keep going together when things get hard.",
    [],
    [],
    false,
    {
      photos: ["/images/production-days/day-11-01.jpeg"],
    }
  ),

  /* DAY 12 — 14/10: REHEARSALS — TEXT ONLY */
  createDay(
    "12",
    "14/10",
    "14 OCT",
    "بروفة ورا بروفة… بنقرب أكتر",
    "REHEARSAL AFTER REHEARSAL",
    "بدأنا ندخل في أجواء البروفات، ونجرب المشاهد اللي كانت لحد قريب مجرد سطور على الورق. كل مرة كنا بنكتشف تفصيلة محتاجة تتظبط، أو إحساس محتاج يوصل بشكل أوضح. خطوة صغيرة في كل بروفة، لكنها كانت بتقرّبنا من الصورة اللي نفسنا نشوفها قدام الكاميرا.",
    "We started getting into rehearsals, trying out scenes that had recently been just lines on a page. Every run-through revealed a detail to adjust or an emotion that needed to come across more clearly. Each rehearsal was a small step toward the picture we wanted to see on camera.",
    [],
    [],
    false,
    {
      photos: [],
    }
  ),

  /* DAY 13 — 21/10: REHEARSALS — TEXT ONLY */
  createDay(
    "13",
    "21/10",
    "21 OCT",
    "كل مرة بنقرب من المشهد",
    "GETTING CLOSER TO THE SCENE",
    "في البروفات، مكنّاش بنعيد المشاهد وخلاص؛ كنا بنجرب ونعدّل ونتناقش لحد ما نحس إن كل تفصيلة في مكانها. ساعات بنوصل للإحساس من أول مرة، وساعات بنحتاج نحاول تاني. ومع كل محاولة، كنا بنفهم الحكاية وشخصياتها أكتر.",
    "Rehearsals were never just about repeating scenes. We tried, adjusted, and talked things through until each detail felt closer to where it belonged. Sometimes the feeling came together right away; sometimes it took another attempt. With every try, we understood the story and its characters a little better.",
    [],
    [],
    false,
    {
      photos: [],
    }
  ),

  /* DAY 14 — 24/10: REHEARSALS — TEXT ONLY */
  createDay(
    "14",
    "24/10",
    "24 OCT",
    "آخر اللمسات قبل الخطوة الجاية",
    "THE FINAL TOUCHES BEFORE WHAT'S NEXT",
    "كل بروفة كانت بتضيف حاجة جديدة، وكل مرة كنا بنرجع نراجع التفاصيل ونظبط إيقاع المشاهد. يوم 24/10 كان فرصة نلمّ اللي اتعلمناه من المحاولات اللي فاتت، ونقرب أكتر من بعض ومن شكل الفيلم اللي بنستعد نقدمه. ولسه قدامنا خطوات، لكن بقينا أقرب ومستعدين أكتر.",
    "Every rehearsal added something new. We kept revisiting the details and finding the rhythm of each scene. October 24 was a chance to bring together what we had learned from earlier attempts and get closer to the film we were preparing to make. There were still steps ahead, but we were getting closer and more prepared.",
    [],
    [],
    false,
    {
      photos: [],
    }
  ),

  // FUTURE DAYS — LOCKED UNTIL THEIR CONTENT IS READY
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
  const openDays = useMemo(
    () => productionDays.filter((day) => !day.locked),
    []
  );

  const activeDay = useMemo(
    () =>
      productionDays.find((day) => day.number === activeNumber) ??
      productionDays[0],
    [activeNumber]
  );

  const activeIndex = openDays.findIndex(
    (day) => day.number === activeNumber
  );

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
      if (value === "ar" || value === "en") setLanguage(value);
    };

    window.addEventListener("onair-language-change", onLanguageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("onair-language-change", onLanguageChange);
    };
  }, []);

  /* SECTION REVEAL */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      section.classList.add("oa-diary-visible");
      return;
    }

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
    const current = openDays.findIndex(
      (day) => day.number === activeNumber
    );
    const next = Math.max(
      0,
      Math.min(openDays.length - 1, current + step)
    );
    setActiveNumber(openDays[next].number);
  };

  /* ACTIVE DAY CONTENT */
  const story = isArabic ? activeDay.arStory : activeDay.enStory;
  const title = isArabic ? activeDay.arTitle : activeDay.enTitle;
  const details = isArabic ? activeDay.arDetails : activeDay.enDetails;

  const hasVideo = Boolean(activeDay.video);
  const hasPhotos = activeDay.photos.length > 0;
  const orientations = activeDay.photoOrientations ?? [];
  const hasLandscape = orientations.includes("landscape");
  const hasPortrait = orientations.includes("portrait");

  const mediaLayoutClass = [
    hasVideo && !hasPhotos ? "video-only" : "",
    !hasVideo && activeDay.photos.length === 1 ? "single-photo" : "",
    !hasVideo &&
    activeDay.photos.length === 1 &&
    orientations[0] === "landscape"
      ? "landscape-photo"
      : "",
    hasPhotos && hasLandscape && hasPortrait ? "mixed-orientation" : "",
    activeDay.photos.length === 5 ? "five-photos" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
            {isArabic ? "من يوميات فريق ON AIR" : "A JOURNEY BY ON AIR"}
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
              {isArabic ? "اختاروا يوم من رحلتنا" : "EXPLORE OUR DATES"}
            </span>
            <span dir="ltr">01 — 25</span>
          </div>

          <div
            className="oa-diary-date-track"
            role="tablist"
            dir={isArabic ? "rtl" : "ltr"}
            aria-label={isArabic ? "أيام الإنتاج" : "Production days"}
          >
            {productionDays.map((day) => {
              const selected = day.number === activeNumber;
              return (
                <button
                  key={day.number}
                  type="button"
                  className={`oa-diary-date ${selected ? "selected" : ""} ${day.locked ? "locked" : ""}`}
                  disabled={day.locked}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveNumber(day.number)}
                >
                  <span className="oa-diary-date-number">{day.number}</span>
                  <span className="oa-diary-date-value">
                    {isArabic ? day.date : day.enDate}
                  </span>
                  {day.locked && (
                    <span className="oa-diary-lock" aria-hidden="true">
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
        <article className="oa-diary-story" key={activeDay.number}>
          {/* STORY CONTENT */}
          <section className="oa-diary-story-content">
            <div className="oa-diary-story-meta">
              <span dir="ltr">CHAPTER {activeDay.number}</span>
              <span>
                <i />
                {isArabic ? "من حكايتنا" : "FROM OUR STORY"}
              </span>
            </div>

            <div className="oa-diary-story-title">
              <span className="oa-diary-big-number" aria-hidden="true">
                {activeDay.number}
              </span>
              <span className="oa-diary-story-date" dir="ltr">
                {isArabic ? activeDay.date : activeDay.enDate}
              </span>
              <h3>{title}</h3>
            </div>

            <p className="oa-diary-story-text">{story}</p>

            {details.length > 0 && (
              <div className="oa-diary-moments">
                <div className="oa-diary-moments-title">
                  <span>
                    {isArabic ? "ومن اليوم ده فاكرين…" : "WE REMEMBER"}
                  </span>
                  <i />
                </div>

                <ul>
                  {details.map((detail, index) => (
                    <li key={`${activeDay.number}-${index}`}>
                      <span dir="ltr">0{index + 1}</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="oa-diary-signature">
              <span>{isArabic ? "مننا ليكم" : "FROM US TO YOU"}</span>
              <strong>ON AIR بِالعَافيَه</strong>
            </div>
          </section>

          {/* MEDIA: VIDEO AND/OR PHOTOS */}
          {(hasVideo || hasPhotos) && (
            <section
              className={`oa-diary-media ${mediaLayoutClass}`.trim()}
              aria-label={isArabic ? "محتوى اليوم" : "Day media"}
            >
              {/* VIDEO */}
              {hasVideo && (
                <>
                  <div className="oa-diary-media-heading">
                    <span>
                      {isArabic ? "فيديو من اليوم ده" : "VIDEO FROM THAT DAY"}
                    </span>
                    <span dir="ltr">VIDEO / 01</span>
                  </div>

                  <div className="oa-diary-video-wrap">
                    <video
                      key={activeDay.video}
                      className="oa-diary-video"
                      src={activeDay.video}
                      controls
                      playsInline
                      preload="metadata"
                      muted={activeDay.muted ?? false}
                      onVolumeChange={(event) => {
                        if (activeDay.muted && !event.currentTarget.muted) {
                          event.currentTarget.muted = true;
                          event.currentTarget.volume = 0;
                        }
                      }}
                    >
                      {isArabic
                        ? "المتصفح لا يدعم تشغيل الفيديو."
                        : "Your browser does not support video playback."}
                    </video>

                    <span className="oa-diary-video-corner">
                      {activeDay.muted
                        ? isArabic
                          ? "بدون صوت"
                          : "MUTED"
                        : "REC"}
                    </span>
                  </div>
                </>
              )}

              {/* PHOTOS */}
              {hasPhotos && (
                <>
                  <div className="oa-diary-photo-heading">
                    <span>
                      {isArabic
                        ? activeDay.photos.length === 1
                          ? "صورة من اليوم ده"
                          : "صور من اليوم ده"
                        : activeDay.photos.length === 1
                        ? "PHOTO FROM THAT DAY"
                        : "PHOTOS FROM THAT DAY"}
                    </span>
                    <span dir="ltr">
                      PHOTO 01 / {String(activeDay.photos.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="oa-diary-photos">
                    {activeDay.photos.map((photo, index) => (
                      <figure
                        className={`oa-diary-photo is-${activeDay.photoOrientations?.[index] ?? "landscape"}`}
                        key={photo}
                      >
                        <div className="oa-diary-photo-placeholder">
                          <span>{`PHOTO ${String(index + 1).padStart(2, "0")}`}</span>
                          <small dir="ltr">{photo.split("/").pop()}</small>
                        </div>

                        <img
                          src={photo}
                          alt={
                            isArabic
                              ? `صورة ${index + 1} من يوم ${activeDay.date}`
                              : `Photo ${index + 1} from ${activeDay.enDate}`
                          }
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.classList.add("is-missing");
                          }}
                        />

                        <figcaption dir="ltr">
                          {`FRAME ${String(index + 1).padStart(2, "0")}`}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              )}

              {/* MEDIA FOOTER */}
              <div className="oa-diary-media-footer" dir="ltr">
                <span>ON AIR / ARCHIVE</span>
                <span>24 FPS</span>
                <span>DAY {activeDay.number}</span>
              </div>
            </section>
          )}
        </article>

        {/* FOOTER */}
        <footer className="oa-diary-footer">
          <span className="oa-diary-footer-label" dir="ltr">
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
              {String(activeIndex + 1).padStart(2, "0")} / {String(openDays.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              disabled={activeIndex >= openDays.length - 1}
              onClick={() => moveDay(1)}
            >
              {isArabic ? "اليوم التالي" : "NEXT"}
            </button>
          </div>

          <span className="oa-diary-footer-note">
            {isArabic ? "والحكاية لسه مكملة…" : "OUR STORY CONTINUES…"}
          </span>
        </footer>
      </div>
    </section>
  );
}