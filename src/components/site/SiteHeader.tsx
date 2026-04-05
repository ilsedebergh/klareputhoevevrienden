/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { defaultClubLogoUrl } from "@/lib/branding";
import type { SbStoryData, SiteSettingsContent } from "@/lib/types";
import { navigationToLinks } from "@/lib/utils";

type SiteHeaderProps = {
  settings: SbStoryData<SiteSettingsContent>;
};

export default function SiteHeader({ settings }: SiteHeaderProps) {
  const navigation = navigationToLinks(settings.content.navigation);
  const logoUrl = settings.content.logo_url || defaultClubLogoUrl;

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link className="site-brand" href="/">
          <span className="site-brand__mark">
            <img alt={`${settings.content.site_name} logo`} src={logoUrl} />
          </span>
          <span className="site-brand__text">
            <strong>{settings.content.site_name}</strong>
            {settings.content.site_tagline ? <span>{settings.content.site_tagline}</span> : null}
          </span>
        </Link>
        <nav className="site-nav" aria-label="Hoofdnavigatie">
          <div className="site-nav__links">
            {navigation.map((item) => (
              <Link
                className="site-nav__link"
                href={item.href}
                key={item.href}
                rel={item.newTab ? "noreferrer" : undefined}
                target={item.newTab ? "_blank" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link className="button site-nav__cta" href="/contact">
            Word lid
          </Link>
          <details className="site-nav__mobile">
            <summary>Menu</summary>
            <div className="site-nav__panel">
              {navigation.map((item) => (
                <Link
                  className="site-nav__panel-link"
                  href={item.href}
                  key={`mobile-${item.href}`}
                  rel={item.newTab ? "noreferrer" : undefined}
                  target={item.newTab ? "_blank" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <Link className="button site-nav__panel-cta" href="/contact">
                Word lid
              </Link>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
