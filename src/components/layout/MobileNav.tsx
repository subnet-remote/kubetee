"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isExternalHref } from "@/lib/links";

type NavLink = {
  label: string;
  href: string;
};

export function MobileNav({
  links,
  activeHref,
  primaryCta,
  githubHref,
}: {
  links: ReadonlyArray<NavLink>;
  activeHref?: string;
  primaryCta: NavLink;
  githubHref: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.setAttribute("data-menu-open", "");
    root.style.overflow = "hidden";
    desktop.addEventListener("change", onDesktop);
    document.addEventListener("keydown", onKeyDown);

    getFocusable()[0]?.focus({ preventScroll: true });

    return () => {
      root.removeAttribute("data-menu-open");
      root.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onDesktop);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const dialog = (
    <div
      id="mobile-navigation"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      className="fixed inset-0 z-50 max-h-dvh overflow-y-auto overscroll-contain bg-stage p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <span className="label-mono text-muted">Navigation</span>
        <button
          type="button"
          onClick={close}
          className="label-mono inline-flex min-h-11 items-center border border-line px-3 py-2 text-body"
        >
          Close
        </button>
      </div>

      <nav aria-label="Mobile primary" className="mt-6 flex flex-col">
        {links.map((link) => {
          const external = isExternalHref(link.href);
          const active = activeHref === link.href;

          const className = `border-b border-line py-4 text-2xl font-light ${
            active ? "text-brand" : "text-body"
          }`;

          if (external) {
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-current={active ? "page" : undefined}
                onClick={close}
                className={className}
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              onClick={close}
              className={className}
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href={githubHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="border-b border-line py-4 text-2xl font-light text-muted"
        >
          GitHub
        </a>
        <a
          href={primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="mt-6 inline-flex min-h-12 items-center justify-center bg-brand px-5 py-3 text-sm font-medium text-stage"
        >
          {primaryCta.label}
        </a>
      </nav>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="label-mono inline-flex min-h-11 items-center border border-line px-3 py-2 text-body"
      >
        Menu
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(dialog, document.body)
        : null}
    </div>
  );
}
