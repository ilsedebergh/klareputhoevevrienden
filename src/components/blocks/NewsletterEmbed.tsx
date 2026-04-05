import { storyblokEditable } from "@storyblok/react/rsc";

import type { SbBlokData } from "@/lib/types";

type NewsletterEmbedProps = {
  blok: SbBlokData & {
    eyebrow?: string;
    title: string;
    intro?: string;
    embed_html?: string;
  };
};

export default function NewsletterEmbed({ blok }: NewsletterEmbedProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="newsletter" {...storyblokEditable(blok as any)}>
          {blok.eyebrow ? <span className="eyebrow">{blok.eyebrow}</span> : null}
          <h2>{blok.title}</h2>
          {blok.intro ? <p>{blok.intro}</p> : null}
          <div className="newsletter__embed">
            {typeof blok.embed_html === "string" && blok.embed_html.trim().length > 0 ? (
              <div dangerouslySetInnerHTML={{ __html: blok.embed_html }} />
            ) : (
              <div className="newsletter__placeholder">
                <strong>Mailchimp embed placeholder</strong>
                <span>
                  Voeg in het CMS de embedcode van Mailchimp toe aan dit blok. De website rendert
                  die code rechtstreeks in deze sectie.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
