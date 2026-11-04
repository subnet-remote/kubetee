"use client";

import { animate, createDrawable, createScope, stagger } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

export function ArchitectureMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      if (cancelled) return;

      scope.current = createScope({ root: node }).add(() => {
        const paths = Array.from(
          node.querySelectorAll<SVGPathElement>("[data-draw]"),
        );
        const nodes = Array.from(
          node.querySelectorAll<SVGGElement>("[data-node]"),
        );

        const run = () => {
          if (paths.length > 0) {
            const drawables = paths.flatMap((path) => createDrawable(path));
            animate(drawables, {
              draw: ["0 0", "0 1"],
              duration: 1200,
              delay: stagger(80),
              ease: "inOutQuad",
            });
          }

          if (nodes.length > 0) {
            animate(nodes, {
              opacity: [0.65, 1],
              y: [8, 0],
              duration: 500,
              delay: stagger(80),
              ease: "outQuad",
            });
          }
        };

        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              observer?.disconnect();
              observer = null;
              run();
            }
          },
          { threshold: 0.2 },
        );

        observer.observe(node);
      });
    };

    if ("fonts" in document) {
      document.fonts.ready.then(setup);
    } else {
      setup();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      observer = null;
      scope.current?.revert();
      scope.current = null;
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
