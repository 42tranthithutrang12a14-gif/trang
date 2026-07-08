import Image from "next/image";
import Link from "next/link";
import { getSettings, nav } from "@/lib/settings";

export async function SiteHeader() {
  const settings = await getSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          {settings.logoUrl && (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
              <Image src={settings.logoUrl} alt={settings.shortName} fill className="object-contain" />
            </div>
          )}
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-wide text-foreground">
              {settings.shortName}
            </span>
            <span className="text-xs text-muted">{settings.slogan}</span>
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

        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark sm:inline-block"
          >
            {settings.phone}
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
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="mt-1 rounded-lg bg-accent px-3 py-2 text-center text-sm font-medium text-white"
              >
                {settings.phone}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
