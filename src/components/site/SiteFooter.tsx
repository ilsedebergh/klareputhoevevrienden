import Link from "next/link";

import type { SbStoryData, SiteSettingsContent } from "@/lib/types";
import { navigationToLinks } from "@/lib/utils";

type SiteFooterProps = {
  settings: SbStoryData<SiteSettingsContent>;
};

export default function SiteFooter({ settings }: SiteFooterProps) {
  const navigation = navigationToLinks(settings.content.navigation);

  return (
    <footer className="site-footer">
      <div className="container site-footer__surface">
        <div className="site-footer__lead">
          <strong>{settings.content.site_name}</strong>
          <p>{settings.content.site_tagline || settings.content.footer_note || "Traditie in beweging."}</p>
        </div>
        <div className="site-footer__meta">
          {settings.content.address ? <span>{settings.content.address}</span> : null}
          {settings.content.email ? <a href={`mailto:${settings.content.email}`}>{settings.content.email}</a> : null}
          {settings.content.phone ? (
            <a href={`tel:${settings.content.phone.replace(/\s+/g, "")}`}>{settings.content.phone}</a>
          ) : null}
          {settings.content.company_number ? (
            <span>Ondernemingsnummer: {settings.content.company_number}</span>
          ) : null}
        </div>
        <nav className="site-footer__nav" aria-label="Footer navigatie">
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={`footer-${item.href}`}
              rel={item.newTab ? "noreferrer" : undefined}
              target={item.newTab ? "_blank" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
