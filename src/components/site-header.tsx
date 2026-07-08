import Image from "next/image";
import Link from "next/link";
import { getSettings, nav } from "@/lib/settings";
import { telHref } from "@/lib/format";

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1.1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export async function SiteHeader() {
  const settings = await getSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {settings.logoUrl && (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
              <Image src={settings.logoUrl} alt={settings.shortName} fill className="object-contain" />
            </div>
          )}
          <span className="truncate text-lg font-semibold tracking-wide text-foreground">
            {settings.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={telHref(settings.phone)}
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark sm:inline-flex"
          >
            <PhoneIcon />
            Gọi ngay
          </a>

          <details className="relative md:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-border text-foreground [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Menu</span>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </summary>
            <nav className="absolute right-0 top-12 flex w-48 flex-col gap-1 rounded-xl border border-border bg-surface p-3 shadow-lg">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-background hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={telHref(settings.phone)}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-center text-sm font-medium text-white"
              >
                <PhoneIcon />
                Gọi ngay
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
