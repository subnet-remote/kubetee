import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { hero, nav, site } from "@/content/site";
import { isExternalHref } from "@/lib/links";
import { HeaderScrollState } from "./HeaderScrollState";
import { MobileNav } from "./MobileNav";

type HeaderLink = {
  label: string;
  href: string;
};

export function SiteHeader({
  links = nav,
  activeHref,
}: {
  links?: ReadonlyArray<HeaderLink>;
  activeHref?: string;
}) {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line">
      <HeaderScrollState />
      <Container className="flex h-[72px] items-center justify-between gap-4 xl:gap-6">
        <Link
          href="/"
          prefetch={false}
          aria-label="KubeTEE home"
          className="flex h-[72px] shrink-0 items-center"
        >
          <Logo priority className="w-[156px] md:w-[200px]" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {links.map((item) => {
            const external = isExternalHref(item.href);
            const active = activeHref === item.href;
            const className = `relative text-sm transition-colors after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-brand after:opacity-0 after:transition-opacity after:content-[''] ${
              active
                ? "text-body after:opacity-100"
                : "text-muted hover:text-body"
            }`;

            if (external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-current={active ? "page" : undefined}
                  className={className}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={className}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-8 items-center text-sm text-muted transition-colors hover:text-body"
          >
            GitHub
          </a>
        </nav>

        <a
          href={hero.primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 items-center justify-center bg-brand px-4 py-2.5 text-sm font-medium text-stage transition-colors hover:bg-brand-strong lg:inline-flex"
        >
          {hero.primaryCta.label}
        </a>

        <MobileNav
          links={links}
          activeHref={activeHref}
          primaryCta={hero.primaryCta}
          githubHref={site.links.github}
        />
      </Container>
    </header>
  );
}
