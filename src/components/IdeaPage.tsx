
import "./IdeaPage.css";

const logline = [
  {
    text: "خمس سنوات قضتها أم في محاولة لفهم ما يحدث لابنتها.",
    pause: "normal",
  },
  {
    text: "بين أطباء وجلسات وأسئلة بلا إجابات، كانت تبحث عن اسمٍ لما تراه كل يوم.",
    pause: "normal",
  },
  {
    text: "حتى جاء التشخيص من مكان لم تتوقعه، ليعيد تفسير سنوات كاملة من المعاناة، ويغيّر الطريقة التي ترى بها ابنتها والعالم من حولها.",
    pause: "large",
  },
  {
    text: "ومن رحلة البحث عن إجابة، بدأت حكاية أخرى...",
    pause: "normal",
    final: true,
  },
  {
    text: "حكاية أم قررت ألا تمر أسرة أخرى بالطريق نفسه.",
    pause: "none",
    final: true,
  },
];

export default function IdeaPage() {
  return (
    <main className="oa-film-idea" dir="rtl" lang="ar">

      {/* CUSTOM BACKGROUND */}
      <div
        className="oa-film-idea__background"
        aria-hidden="true"
      />

      {/* CINEMATIC FRAME */}
      <div className="oa-film-idea__frame" aria-hidden="true">
        <span className="oa-film-idea__corner oa-film-idea__corner--tl" />
        <span className="oa-film-idea__corner oa-film-idea__corner--tr" />
        <span className="oa-film-idea__corner oa-film-idea__corner--bl" />
        <span className="oa-film-idea__corner oa-film-idea__corner--br" />
      </div>

      {/* TOP ARCHIVE DATA */}
      <header className="oa-film-idea__top" dir="ltr">

        <div className="oa-film-idea__rec">
          <span className="oa-film-idea__rec-dot" />
          REC
        </div>

        <div className="oa-film-idea__top-center">
          FPS 24&nbsp;&nbsp;—&nbsp;&nbsp;ISO 800&nbsp;&nbsp;—&nbsp;&nbsp;FRAME 002
        </div>

        <div className="oa-film-idea__archive-number">
          02 / 05
        </div>

      </header>

      {/* LEFT ARCHIVE IDENTITY */}
      <aside
        className="oa-film-idea__side oa-film-idea__side--left"
        dir="ltr"
      >
        <div className="oa-film-idea__brand">
          <span>ON AIR</span>
          <strong dir="rtl">بِالعَافيَه</strong>
        </div>

        <div className="oa-film-idea__side-rule" />

        <span className="oa-film-idea__side-small">
          PRIVATE ARCHIVE
        </span>
      </aside>

      {/* RIGHT PROJECT FILE */}
      <aside
        className="oa-film-idea__side oa-film-idea__side--right"
        dir="ltr"
      >
        <div className="oa-film-idea__file-number">
          <span>PROJECT FILE</span>
          <strong>004</strong>
        </div>

        <div className="oa-film-idea__side-rule" />

        <span className="oa-film-idea__side-small">
          THE IDEA
        </span>
      </aside>

      {/* MAIN CONTENT */}
      <section
        className="oa-film-idea__center"
        aria-labelledby="idea-title"
      >

        <div className="oa-film-idea__label" dir="ltr">
          — THE IDEA —
        </div>

        <h1 id="idea-title">
          لوج لاين الفيلم
        </h1>

        <div
          className="oa-film-idea__title-line"
          aria-hidden="true"
        >
          <span />
        </div>

        {/* ORIGINAL FILM LOGLINE */}
        <div className="oa-film-idea__logline">

          {logline.map((line, index) => (
            <div
              className="oa-film-idea__logline-group"
              key={line.text}
            >

              <p
                className={
                  line.final
                    ? "oa-film-idea__line oa-film-idea__line--final"
                    : "oa-film-idea__line"
                }
                style={{
                  animationDelay: `${0.45 + index * 0.85}s`,
                }}
              >
                {line.text}
              </p>

              {line.pause !== "none" && (
                <div
                  className={`oa-film-idea__pause oa-film-idea__pause--${line.pause}`}
                  aria-hidden="true"
                >
                  <span className="oa-film-idea__pause-line" />
                  <span className="oa-film-idea__pause-core" />
                  <span className="oa-film-idea__pause-line" />
                </div>
              )}

            </div>
          ))}

        </div>
      </section>

      {/* BOTTOM CAMERA DATA */}
      <footer className="oa-film-idea__bottom" dir="ltr">

        <span>TAKE 01</span>
        <i />
        <span>FPS 24</span>
        <i />
        <span>ISO 800</span>
        <i />
        <span>FRAME 002</span>

      </footer>

      {/* FILM REGISTRATION MARKS */}
      <span
        className="oa-film-idea__film-mark oa-film-idea__film-mark--left"
        aria-hidden="true"
      >
        +
      </span>

      <span
        className="oa-film-idea__film-mark oa-film-idea__film-mark--right"
        aria-hidden="true"
      >
        +
      </span>

    </main>
  );
}
