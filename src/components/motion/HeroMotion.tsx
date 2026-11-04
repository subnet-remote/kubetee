"use client";

import { createDrawable, createScope, createTimeline, stagger } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      scope.current = createScope({ root: node }).add(() => {
        const eyebrow = node.querySelector<HTMLElement>(
          '[data-motion="eyebrow"]',
        );
        const ctas = node.querySelector<HTMLElement>('[data-motion="ctas"]');
        const figure = node.querySelector<HTMLElement>(
          '[data-motion="figure"]',
        );

        const hostPaths = Array.from(
          node.querySelectorAll<SVGPathElement>('[data-cube="host"]'),
        );
        const requestPaths = Array.from(
          node.querySelectorAll<SVGPathElement>('[data-cube="request"]'),
        );
        const guest = node.querySelector<SVGGElement>('[data-cube="guest"]');
        const tetherPaths = Array.from(
          node.querySelectorAll<SVGPathElement>('[data-cube="tether"]'),
        );
        const key = node.querySelector<SVGGElement>('[data-cube="key"]');
        const responsePaths = Array.from(
          node.querySelectorAll<SVGPathElement>('[data-cube="response"]'),
        );
        const labels = Array.from(
          node.querySelectorAll<SVGElement>('[data-cube="label"]'),
        );

        const timeline = createTimeline({ defaults: { ease: "outExpo" } });

        if (eyebrow) {
          timeline.add(
            eyebrow,
            { opacity: [0, 1], y: [8, 0], duration: 400, ease: "outQuad" },
            0,
          );
        }

        if (ctas) {
          timeline.add(
            ctas,
            { opacity: [0, 1], y: [12, 0], duration: 450 },
            350,
          );
        }

        if (figure) {
          timeline.add(
            figure,
            { opacity: [0, 1], y: [20, 0], duration: 600 },
            300,
          );
        }

        if (hostPaths.length > 0) {
          const drawables = hostPaths.flatMap((path) => createDrawable(path));
          timeline.add(
            drawables,
            {
              draw: ["0 0", "0 1"],
              duration: 400,
              delay: stagger(60),
              ease: "inOutQuad",
            },
            350,
          );
        }

        if (requestPaths.length > 0) {
          const drawables = requestPaths.flatMap((path) =>
            createDrawable(path),
          );
          timeline.add(
            drawables,
            {
              draw: ["0 0", "0 1"],
              duration: 350,
              ease: "inOutQuad",
            },
            500,
          );
        }

        if (guest) {
          timeline.add(
            guest,
            {
              opacity: [0.35, 1],
              scale: [0.96, 1],
              transformOrigin: "280px 335px",
              duration: 400,
            },
            650,
          );
        }

        if (tetherPaths.length > 0) {
          const drawables = tetherPaths.flatMap((path) => createDrawable(path));
          timeline.add(
            drawables,
            {
              draw: ["0 0", "0 1"],
              duration: 300,
              ease: "inOutQuad",
            },
            900,
          );
        }

        if (key) {
          timeline.add(
            key,
            {
              opacity: [0.4, 1],
              scale: [0.92, 1],
              transformOrigin: "280px 80px",
              duration: 300,
            },
            1150,
          );
        }

        if (responsePaths.length > 0) {
          const drawables = responsePaths.flatMap((path) =>
            createDrawable(path),
          );
          timeline.add(
            drawables,
            {
              draw: ["0 0", "0 1"],
              duration: 300,
              ease: "inOutQuad",
            },
            1350,
          );
        }

        if (labels.length > 0) {
          timeline.add(
            labels,
            {
              opacity: [0, 1],
              duration: 250,
              delay: stagger(60),
            },
            1500,
          );
        }
      });
    };

    setup();

    return () => {
      cancelled = true;
      scope.current?.revert();
      scope.current = null;
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
