import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

import ButtonLink from "@/components/site/ButtonLink";
import type { EventContent } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type EventPageProps = {
  blok: EventContent;
};

export default function EventPage({ blok }: EventPageProps) {
  return (
    <main className="event-page" {...storyblokEditable(blok as any)}>
      <section className="section">
        <div className="container">
          <article className="event-detail">
            <span className="eyebrow">Activiteit</span>
            <h1>{blok.title}</h1>
            <div className="event-detail__meta">
              <span className="pill">{formatDate(blok.date)}</span>
              {blok.location ? <span className="pill">{blok.location}</span> : null}
            </div>
            {blok.excerpt ? <p>{blok.excerpt}</p> : null}
            {blok.contact_details ? (
              <p className="event-detail__contact">Info: {blok.contact_details}</p>
            ) : null}
            {Array.isArray(blok.body) && blok.body.length > 0 ? (
              <div className="event-detail__body">
                {blok.body.map((nestedBlok) => (
                  <StoryblokServerComponent blok={nestedBlok as any} key={nestedBlok._uid} />
                ))}
              </div>
            ) : null}
            {blok.registration_url ? (
              <ButtonLink href={blok.registration_url}>Meer informatie</ButtonLink>
            ) : null}
          </article>
        </div>
      </section>
    </main>
  );
}
