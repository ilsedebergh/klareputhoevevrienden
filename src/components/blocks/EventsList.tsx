import Link from "next/link";
import { draftMode } from "next/headers";
import { storyblokEditable } from "@storyblok/react/rsc";

import SectionHeading from "@/components/site/SectionHeading";
import { getEvents } from "@/lib/storyblok-api";
import type { EventContent, SbBlokData, StoryVersion } from "@/lib/types";
import { cn, formatDate, formatDateShort, storyPath } from "@/lib/utils";

type EventsListProps = {
  blok: SbBlokData & {
    eyebrow?: string;
    title: string;
    intro?: string;
    limit?: number;
    include_past?: boolean;
  };
};

function resolveVersion(isDraft: boolean): StoryVersion {
  return isDraft || process.env.NODE_ENV !== "production" ? "draft" : "published";
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatBadge(date: string) {
  const [day, month] = formatDateShort(date).replace(".", "").split(" ");
  return { day, month };
}

export default async function EventsList({ blok }: EventsListProps) {
  const { isEnabled } = await draftMode();
  const version = resolveVersion(isEnabled);
  const allEvents = await getEvents(version, typeof blok.limit === "number" ? blok.limit : undefined);
  const now = new Date();
  const events = blok.include_past
    ? allEvents
    : allEvents.filter((story) => new Date(story.content.date).getTime() >= now.getTime() - 86400000);
  const [featured, ...upcoming] = events;

  return (
    <section className="section">
      <div className="container">
        <div {...storyblokEditable(blok as any)}>
          <SectionHeading eyebrow={blok.eyebrow} intro={blok.intro} title={blok.title} />
          {featured ? (
            <div className={cn("events-stage", upcoming.length === 0 && "events-stage--single")}>
              {(() => {
                const content = featured.content as EventContent;
                const { day, month } = formatBadge(content.date);

                return (
                  <article className="event-spotlight" key={featured.full_slug}>
                    <div className="event-spotlight__stamp">
                      <span>{month}</span>
                      <strong>{day}</strong>
                    </div>
                    <div className="event-spotlight__body">
                      <span className="event-spotlight__eyebrow">Uitgelichte activiteit</span>
                      <h3>{content.title}</h3>
                      <div className="event-spotlight__meta">
                        <span>{formatDate(content.date)}</span>
                        <span>{formatTime(content.date)}</span>
                        {content.location ? <span>{content.location}</span> : null}
                      </div>
                      {content.excerpt ? <p>{content.excerpt}</p> : null}
                      <Link className="event-spotlight__link" href={storyPath(featured.full_slug)}>
                        Bekijk details
                      </Link>
                    </div>
                  </article>
                );
              })()}
              {upcoming.length > 0 ? (
                <div className="events-stack">
                  {upcoming.map((eventStory) => {
                    const content = eventStory.content as EventContent;
                    const { day, month } = formatBadge(content.date);

                    return (
                      <article className="event-teaser" key={eventStory.full_slug}>
                        <div className="event-teaser__date">
                          <span>{month}</span>
                          <strong>{day}</strong>
                        </div>
                        <div className="event-teaser__content">
                          <h3>{content.title}</h3>
                          <div className="event-teaser__meta">
                            <span>{formatTime(content.date)}</span>
                            {content.location ? <span>{content.location}</span> : null}
                          </div>
                          {content.excerpt ? <p>{content.excerpt}</p> : null}
                          <Link className="event-teaser__link" href={storyPath(eventStory.full_slug)}>
                            Details
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="section-empty">
              <p>Er zijn momenteel geen activiteiten beschikbaar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
