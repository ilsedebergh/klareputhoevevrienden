/* eslint-disable @next/next/no-img-element */
import { storyblokEditable } from "@storyblok/react/rsc";

import ButtonLink from "@/components/site/ButtonLink";
import { defaultClubLogoUrl } from "@/lib/branding";
import { cn } from "@/lib/utils";
import type { SbBlokData } from "@/lib/types";

type HeroBlockProps = {
  blok: SbBlokData & {
    eyebrow?: string;
    title: string;
    intro?: string;
    primary_label?: string;
    primary_href?: string;
    secondary_label?: string;
    secondary_href?: string;
    supporting_note?: string;
    image_url?: string;
    image_alt?: string;
    show_logo?: boolean;
  };
};

export default function HeroBlock({ blok }: HeroBlockProps) {
  const showLogo = Boolean(blok.show_logo);
  const hasMedia = Boolean(blok.image_url) || showLogo;
  const heroClasses = cn(
    "hero",
    hasMedia ? "hero--with-media" : "hero--plain",
    showLogo && "hero--branded"
  );

  return (
    <section className={heroClasses}>
      <div className="container hero__shell">
        <div className="hero__surface" {...storyblokEditable(blok as any)}>
          <div className={cn("hero__grid", hasMedia ? "hero__grid--with-media" : "hero__grid--plain")}>
            <div className="hero__content">
              {blok.eyebrow ? <span className="eyebrow hero__eyebrow">{blok.eyebrow}</span> : null}
              <h1>{blok.title}</h1>
              {blok.intro ? <p className="hero__intro">{blok.intro}</p> : null}
              <div className="hero__actions">
                {blok.primary_label && blok.primary_href ? (
                  <ButtonLink href={blok.primary_href}>{blok.primary_label}</ButtonLink>
                ) : null}
                {blok.secondary_label && blok.secondary_href ? (
                  <ButtonLink href={blok.secondary_href} variant="secondary">
                    {blok.secondary_label}
                  </ButtonLink>
                ) : null}
              </div>
              {blok.supporting_note && !hasMedia ? (
                <p className="hero__supporting-note">{blok.supporting_note}</p>
              ) : null}
            </div>

            {hasMedia ? (
              <aside className="hero__media">
                {showLogo ? (
                  <div className="hero__logo-chip">
                    <img alt="Logo Klareputhoevevrienden" src={defaultClubLogoUrl} />
                  </div>
                ) : null}
                {blok.image_url ? (
                  <div className="hero__photo-frame">
                    <img
                      alt={blok.image_alt || blok.title}
                      className="hero__photo"
                      src={blok.image_url}
                    />
                  </div>
                ) : (
                  <div className="hero__photo-frame hero__photo-frame--logo">
                    <img
                      alt="Logo Klareputhoevevrienden"
                      className="hero__photo hero__photo--logo"
                      src={defaultClubLogoUrl}
                    />
                  </div>
                )}
                {blok.supporting_note ? (
                  <div className="hero__photo-caption">{blok.supporting_note}</div>
                ) : null}
              </aside>
            ) : (
              <div aria-hidden="true" className="hero__ornament">
                <div className="hero__ornament-badge">{blok.eyebrow || "Klareputhoevevrienden"}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
