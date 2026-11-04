import { InstallAppButton } from "@/components/pwa/InstallAppButton";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footer, site } from "@/content/site";
import { isExternalHref } from "@/lib/links";

const updatedFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const lastUpdated = updatedFormatter.format(
  new Date(`${site.lastUpdated}T00:00:00.000Z`),
);

export function SiteFooter({
  sectionLinks,
}: {
  sectionLinks?: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <footer className="border-t border-line bg-stage-deep">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="w-45" />
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              {footer.description}
            </p>
            <p className="text-xs mt-8 text-faint">
              {site.legalName} · Bittensor SN90
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-7">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {footer.links.map((link) => {
                const external = isExternalHref(link.href);

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex min-h-8 items-center text-muted transition-colors hover:text-body"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {sectionLinks?.length ? (
            <nav
              aria-label="Page sections"
              className="border-t border-line pt-6 lg:col-span-12"
            >
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {sectionLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-8 items-center text-muted transition-colors hover:text-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {site.lastUpdated.slice(0, 4)} {site.legalName}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <InstallAppButton className="inline-flex min-h-9 items-center justify-center border border-line px-3 py-2 text-xs font-medium text-body transition-colors hover:border-brand/60 hover:text-brand" />
            <p>Last updated {lastUpdated}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
