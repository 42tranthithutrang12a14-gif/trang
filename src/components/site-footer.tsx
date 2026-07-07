import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-foreground">{siteConfig.shortName}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{siteConfig.slogan}</p>
          <p className="mt-4 text-sm text-muted">MST: {siteConfig.taxId}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Liên kết
          </p>
          <ul className="mt-3 space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Liên hệ
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{siteConfig.address}</li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.companyName}. Đã đăng ký kinh doanh.
      </div>
    </footer>
  );
}
