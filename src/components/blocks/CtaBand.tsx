import { storyblokEditable } from "@storyblok/react/rsc";

import ButtonLink from "@/components/site/ButtonLink";
import type { SbBlokData } from "@/lib/types";

type CtaBandProps = {
  blok: SbBlokData & {
    eyebrow?: string;
    title: string;
    text?: string;
    primary_label?: string;
    primary_href?: string;
  };
};

export default function CtaBand({ blok }: CtaBandProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band" {...storyblokEditable(blok as any)}>
          {blok.eyebrow ? <span className="eyebrow">{blok.eyebrow}</span> : null}
          <h2>{blok.title}</h2>
          {blok.text ? <p>{blok.text}</p> : null}
          {blok.primary_label && blok.primary_href ? (
            <div>
              <ButtonLink href={blok.primary_href}>{blok.primary_label}</ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
