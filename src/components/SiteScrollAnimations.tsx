
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealRule = {
  trigger: string;
  target: string;
  y?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  start?: string;
};

const scenarioReveals: RevealRule[] = [
  {
    trigger: ".oa-scenario-paper-area",
    target: ".oa-scenario-paper-caption",
    y: 14,
    duration: 0.58,
  },
  {
    trigger: ".oa-scenario-credits",
    target: ".oa-scenario-credits-heading",
    y: 18,
    duration: 0.62,
  },
  {
    trigger: ".oa-scenario-footer",
    target: ".oa-scenario-footer",
    y: 14,
    duration: 0.62,
  },
];

const pageReveals: Record<string, RevealRule[]> = {
  "/archive": [
    {
      trigger: ".oa-diary-footer",
      target: ".oa-diary-footer",
      y: 14,
      duration: 0.58,
    },
    {
      trigger: ".oa-carousel-stage",
      target: ".oa-carousel-stage",
      y: 20,
      scale: 0.99,
      duration: 0.72,
    },
    {
      trigger: ".oa-carousel-footer",
      target: ".oa-carousel-footer",
      y: 14,
      duration: 0.62,
    },
    {
      trigger: ".oa-credits-archive-head",
      target: ".oa-credits-archive-head",
      y: 12,
      duration: 0.58,
    },
    {
      trigger: ".oa-credits-archive-foot",
      target: ".oa-credits-archive-foot",
      y: 12,
      duration: 0.58,
    },
    {
      trigger: ".oa-credits-cta-wrap",
      target: ".oa-credits-cta-wrap",
      y: 16,
      duration: 0.64,
    },
  ],

  "/ideas": [
    {
      trigger: ".oa-film-idea__side",
      target: ".oa-film-idea__side",
      y: 16,
      duration: 0.65,
      stagger: 0.12,
    },
    {
      trigger: ".oa-film-idea__bottom",
      target: ".oa-film-idea__bottom",
      y: 10,
      duration: 0.54,
    },
  ],

  "/scenario": scenarioReveals,
  "/story": scenarioReveals,

  "/shooting": [
    {
      trigger: ".oa-shooting-footer",
      target: ".oa-shooting-footer",
      y: 14,
      duration: 0.62,
    },
  ],
};

const pageRoots: Record<string, string> = {
  "/archive": ".archive-page-wrapper",
  "/ideas": ".oa-film-idea",
  "/scenario": ".oa-scenario",
  "/story": ".oa-scenario",
  "/shooting": ".oa-shooting-page",
};

export default function SiteScrollAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    const rules = pageReveals[pathname];
    const rootSelector = pageRoots[pathname];

    if (!rules || !rootSelector) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root =
      document.querySelector<HTMLElement>(rootSelector);

    if (!root) return;

    const context = gsap.context(() => {
      rules.forEach((rule) => {
        const trigger =
          root.querySelector<HTMLElement>(rule.trigger);

        const targets =
          gsap.utils.toArray<HTMLElement>(rule.target, root);

        if (!trigger || targets.length === 0) return;

        gsap.fromTo(
          targets,
          {
            autoAlpha: 0,
            y: rule.y ?? 18,
            scale: rule.scale ?? 1,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: rule.duration ?? 0.62,
            stagger: rule.stagger ?? 0.08,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger,
              start: rule.start ?? "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [pathname]);

  return null;
}
