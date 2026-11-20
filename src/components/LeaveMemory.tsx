import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

import "./LeaveMemory.css";

type Language = "ar" | "en";

type Memory = {
  id: string | number;
  name: string;
  message: string;
  created_at: string;
  pending?: boolean;
};

type Notice = {
  type: "success" | "error";
  message: string;
};

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, "") ?? "";

const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
console.log("SUPABASE CHECK:", {
  urlLoaded: Boolean(SUPABASE_URL),
  keyLoaded: Boolean(SUPABASE_KEY),
});
const PAGE_SIZE = 500;
const MAX_NAME_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 180;

const COPY = {
  ar: {
    eyebrow: "THE MEMORY ARCHIVE / ON AIR",
    index: "ARCHIVE 009",
    title: "الفيلم هيخلص… بس حكايتنا مش هتخلص.",
    description:
  "قبل ما آخر مشهد يخلص، متنساش تسيب لنا ذكرى أو كلمة حلوة. حاجة صغيرة نرجعلها بعدين، وتفكّرنا إن الحكاية دي كانت حقيقية… وإن أثرها لسه عايش جوانا.",
    reelLabel: "A COLLECTION OF MOMENTS",
    countLabel: "ذكرى محفوظة",
    scene: "لقطة",
    emptyTitle: "لسه مستنيين أول ذكرى",
    emptyDescription: "خلي كلمتك أول سطر في حكاية ON AIR.",
    loading: "بنفتح الأرشيف...",
    loadError: "مش قادرين نحمّل الذكريات دلوقتي.",
    retry: "حاول تاني",
    leave: "سيب لنا ذكرى",
    formTitle: "احكيلنا ذكرى",
    formDescription: "لحظة أو موقف أو كلمة تحب تفضل جزء من حكايتنا.",
    name: "اسمك",
    namePlaceholder: "اكتب اسمك",
    message: "الذكرى",
    messagePlaceholder: "اكتب الذكرى اللي حابب تسيبها هنا...",
    cancel: "إلغاء",
    submit: "إرسال الذكرى",
    submitting: "جاري الإرسال...",
    success:
      "وصلت ذكراك! هتظهر عندك فورًا، وللجميع بعد مراجعتها والموافقة عليها.",
    error: "حصلت مشكلة أثناء إرسال الذكرى. حاول مرة تانية.",
    required: "اكتب اسمك والذكرى الأول.",
    pending: "قيد المراجعة",
    configError: "راجعي إعدادات الاتصال بـ Supabase في ملف .env.local.",
    close: "إغلاق",
    dismiss: "إخفاء",
    dateFallback: "من أرشيف ON AIR",
   endLine: "حكايتنا مكملة بعد آخر مشهد",
  },

  en: {
    eyebrow: "THE MEMORY ARCHIVE / ON AIR",
    index: "ARCHIVE 009",
    title: "The film may end, but our story won't.",
   description:
  "Before the final scene fades, leave us a memory or a kind word. Something we can return to and remember that this story was real, and its impact is still with us.",
    reelLabel: "A COLLECTION OF MOMENTS",
    countLabel: "MEMORIES SAVED",
    scene: "FRAME",
    emptyTitle: "We're waiting for the first memory",
    emptyDescription: "Make your words the first line in the ON AIR story.",
    loading: "Opening the archive...",
    loadError: "We couldn't load the memories right now.",
    retry: "Try again",
    leave: "Leave us a memory",
    formTitle: "Leave us a memory",
    formDescription: "A moment, a story, or a few words worth keeping.",
    name: "Your name",
    namePlaceholder: "Enter your name",
    message: "Your memory",
    messagePlaceholder: "Write the memory you want to leave here...",
    cancel: "Cancel",
    submit: "Send memory",
    submitting: "Sending...",
    success:
      "Your memory has arrived. It is visible to you now and will appear publicly after review and approval.",
    error: "Something went wrong while sending your memory.",
    required: "Please enter your name and memory.",
    pending: "UNDER REVIEW",
    configError: "Check your Supabase settings in .env.local.",
    close: "Close",
    dismiss: "Dismiss",
    dateFallback: "From the ON AIR archive",
   endLine: "OUR STORY LIVES BEYOND THE FINAL FRAME",
  },
} as const;

function getInitialLanguage(): Language {
  return localStorage.getItem("onair-language") === "en" ? "en" : "ar";
}

function formatMemoryDate(value: string, language: Language): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return COPY[language].dateFallback;
  }

  return new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function LeaveMemory() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const [approvedMemories, setApprovedMemories] = useState<Memory[]>([]);
  const [localPending, setLocalPending] = useState<Memory[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  const creditsListRef = useRef<HTMLDivElement | null>(null);

  const copy = COPY[language];
  const isConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

  /* ------------------------------------------
     LANGUAGE SYNC
  ------------------------------------------ */

  useEffect(() => {
    const syncLanguage = (next?: Language) => {
      if (next === "ar" || next === "en") {
        setLanguage(next);
      } else {
        setLanguage(getInitialLanguage());
      }
    };

    const onLanguageChange = (event: Event) => {
      syncLanguage((event as CustomEvent<Language>).detail);
    };

    window.addEventListener("onair-language-change", onLanguageChange);

    const observer = new MutationObserver(() => syncLanguage());

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => {
      window.removeEventListener("onair-language-change", onLanguageChange);
      observer.disconnect();
    };
  }, []);

  /* ------------------------------------------
     LOAD MEMORIES FROM SUPABASE
  ------------------------------------------ */

  const loadMemories = useCallback(
    async (silent = false) => {
      if (!isConfigured) {
        setLoadError(copy.configError);
        setLoading(false);
        return;
      }

      if (!silent) {
        setLoading(true);
      }

      try {
        const all: Memory[] = [];
        let start = 0;

        while (true) {
          const query = new URLSearchParams({
            select: "id,name,message,created_at",
            approved: "eq.true",
            order: "created_at.desc",
          });

          const end = start + PAGE_SIZE - 1;

          const response = await fetch(
            `${SUPABASE_URL}/rest/v1/sticky_notes?${query.toString()}`,
            {
              method: "GET",
              headers: {
                apikey: SUPABASE_KEY,
                "Range-Unit": "items",
                Range: `${start}-${end}`,
              },
              cache: "no-store",
            }
          );

          if (!response.ok) {
            throw new Error(await response.text());
          }

          const page = (await response.json()) as Memory[];

          all.push(...page);

          if (page.length < PAGE_SIZE) {
            break;
          }

          start += PAGE_SIZE;
        }

        setApprovedMemories(all);
        setLoadError("");
      } catch (error) {
        console.error("ON AIR MEMORY LOAD ERROR:", error);

        if (!silent) {
          setLoadError(copy.loadError);
        }
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [copy.configError, copy.loadError, isConfigured]
  );

  useEffect(() => {
    void loadMemories();

    const interval = window.setInterval(
      () => void loadMemories(true),
      60000
    );

    return () => window.clearInterval(interval);
  }, [loadMemories]);

  /* ------------------------------------------
     COMBINE APPROVED + LOCAL PENDING
  ------------------------------------------ */

  const memories = useMemo(() => {
    const pendingNotApproved = localPending.filter(
      (pending) =>
        !approvedMemories.some(
          (approved) =>
            approved.name.trim() === pending.name.trim() &&
            approved.message.trim() === pending.message.trim()
        )
    );

    return [...approvedMemories, ...pendingNotApproved].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [approvedMemories, localPending]);

  /* ------------------------------------------
     REVEAL ON SCROLL
  ------------------------------------------ */

  useEffect(() => {
    const list = creditsListRef.current;

    if (!list) return;

    const entries = Array.from(
      list.querySelectorAll<HTMLElement>(".oa-credits-entry")
    );

    if (entries.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      entries.forEach((entry) => {
        entry.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (observedEntries, currentObserver) => {
        observedEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    entries.forEach((entry) => observer.observe(entry));

    return () => observer.disconnect();
  }, [memories.length, loading]);

  /* ------------------------------------------
     MODAL CONTROL
  ------------------------------------------ */

  useEffect(() => {
    if (!modalOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    const oldOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [modalOpen]);

  /* ------------------------------------------
     SUBMIT MEMORY
  ------------------------------------------ */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (website.trim()) return;

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanMessage) {
      setNotice({
        type: "error",
        message: copy.required,
      });

      return;
    }

    if (!isConfigured) {
      setNotice({
        type: "error",
        message: copy.configError,
      });

      return;
    }

    setSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/sticky_notes`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            name: cleanName.slice(0, MAX_NAME_LENGTH),
            message: cleanMessage.slice(0, MAX_MESSAGE_LENGTH),
            color: "navy",
            approved: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setLocalPending((current) => [
        {
          id: `local-${Date.now()}`,
          name: cleanName,
          message: cleanMessage,
          created_at: new Date().toISOString(),
          pending: true,
        },
        ...current,
      ]);

      setName("");
      setMessage("");
      setWebsite("");
      setModalOpen(false);

      setNotice({
        type: "success",
        message: copy.success,
      });
    } catch (error) {
      console.error("ON AIR MEMORY SUBMIT ERROR:", error);

      setNotice({
        type: "error",
        message: copy.error,
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ------------------------------------------
     RENDER
  ------------------------------------------ */

  return (
    <section
      className="oa-credits-section"
      dir={language === "ar" ? "rtl" : "ltr"}
      aria-labelledby="oa-credits-title"
    >
      {/* INTRO */}

      <header className="oa-credits-heading">
        <div className="oa-credits-kicker" dir="ltr">
          <span className="oa-credits-rec" />
          <span>{copy.eyebrow}</span>
        </div>

        <div className="oa-credits-edition" dir="ltr">
          <span>{copy.index}</span>
          <i />
          <span>24 FPS / FOREVER</span>
        </div>

        <h2 id="oa-credits-title">{copy.title}</h2>

        <p>{copy.description}</p>
      </header>

      {/* ARCHIVE */}

      <div className="oa-credits-archive">
        <div className="oa-credits-archive-head" dir="ltr">
          <div className="oa-credits-archive-label">
            <span className="oa-credits-index">09</span>
            <span>{copy.reelLabel}</span>
          </div>

          <div className="oa-credits-total" aria-live="polite">
            <strong>
              {String(memories.length).padStart(2, "0")}
            </strong>

            <span>{copy.countLabel}</span>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="oa-credits-state" aria-live="polite">
            <span className="oa-credits-loader" />
            <p>{copy.loading}</p>
          </div>
        ) : loadError && memories.length === 0 ? (
          <div className="oa-credits-state" aria-live="polite">
            <p>{loadError}</p>

            <button
              type="button"
              onClick={() => void loadMemories()}
            >
              {copy.retry}
            </button>
          </div>
        ) : memories.length === 0 ? (
          <div className="oa-credits-state">
            <span className="oa-credits-empty-mark">✳</span>
            <h3>{copy.emptyTitle}</h3>
            <p>{copy.emptyDescription}</p>
          </div>
        ) : (
          /* MEMORY LIST */

          <div className="oa-credits-list" ref={creditsListRef}>
            {memories.map((memory, index) => (
              <article
                className={`oa-credits-entry ${
                  memory.pending ? "is-pending" : ""
                }`}
                key={memory.id}
              >
                <div className="oa-credits-entry-number" dir="ltr">
                  <span>
                    {String(memories.length - index).padStart(3, "0")}
                  </span>

                  <i />
                </div>

                <div className="oa-credits-entry-copy">
                  <p className="oa-credits-quote">
                    {memory.message}
                  </p>

                  <div className="oa-credits-byline">
                    <strong>{memory.name}</strong>

                    <span>
                      {memory.pending
                        ? copy.pending
                        : formatMemoryDate(
                            memory.created_at,
                            language
                          )}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ARCHIVE FOOTER */}

        <div className="oa-credits-archive-foot" dir="ltr">
          <span>ON AIR — THE STORY CONTINUES</span>
          <span>{copy.endLine}</span>
        </div>
      </div>

      {/* CTA */}

      <div className="oa-credits-cta-wrap">
        <div className="oa-credits-cta-rule" />

        <button
          className="oa-credits-cta"
          type="button"
          onClick={() => {
            setNotice(null);
            setModalOpen(true);
          }}
        >
          <span aria-hidden="true">＋</span>
          <strong>{copy.leave}</strong>
          <span aria-hidden="true">↗</span>
        </button>

        <div className="oa-credits-cta-rule" />
      </div>

      {/* NOTICE */}

      {notice && (
        <div
          className={`oa-credits-notice is-${notice.type}`}
          role="status"
        >
          <p>{notice.message}</p>

          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label={copy.dismiss}
          >
            ×
          </button>
        </div>
      )}

      {/* FORM MODAL */}

      {modalOpen && (
        <div
          className="oa-credits-modal-backdrop"
          onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div
            className="oa-credits-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="oa-credits-form-title"
          >
            <div className="oa-credits-modal-top" dir="ltr">
              <span>NEW MEMORY / ARCHIVE 009</span>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label={copy.close}
              >
                ×
              </button>
            </div>

            <div className="oa-credits-modal-heading">
              <span className="oa-credits-modal-mark">✳</span>

              <h3 id="oa-credits-form-title">
                {copy.formTitle}
              </h3>

              <p>{copy.formDescription}</p>
            </div>

            <form
              className="oa-credits-form"
              onSubmit={handleSubmit}
            >
              {notice?.type === "error" && (
                <p className="oa-credits-form-error" role="alert">
                  {notice.message}
                </p>
              )}

              <label htmlFor="oa-credits-name">
                {copy.name}
              </label>

              <input
                id="oa-credits-name"
                value={name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                placeholder={copy.namePlaceholder}
                maxLength={MAX_NAME_LENGTH}
                autoComplete="name"
                autoFocus
                required
              />

              <div className="oa-credits-message-label">
                <label htmlFor="oa-credits-message">
                  {copy.message}
                </label>

                <span dir="ltr">
                  {message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>

              <textarea
                id="oa-credits-message"
                value={message}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(event.target.value)
                }
                placeholder={copy.messagePlaceholder}
                maxLength={MAX_MESSAGE_LENGTH}
                rows={5}
                required
              />

              {/* ANTI-SPAM FIELD */}

              <input
                className="oa-credits-honeypot"
                value={website}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setWebsite(event.target.value)
                }
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="oa-credits-form-actions">
                <button
                  type="button"
                  className="oa-credits-cancel"
                  onClick={() => setModalOpen(false)}
                  disabled={submitting}
                >
                  {copy.cancel}
                </button>

                <button
                  type="submit"
                  className="oa-credits-submit"
                  disabled={submitting || !isConfigured}
                >
                  {submitting ? copy.submitting : copy.submit}
                  <span>↗</span>
                </button>
              </div>

              {!isConfigured && (
                <p className="oa-credits-form-error">
                  {copy.configError}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}