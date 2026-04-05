import { draftMode } from "next/headers";
import { storyblokEditable } from "@storyblok/react/rsc";

import SectionHeading from "@/components/site/SectionHeading";
import { getPhotoAlbums } from "@/lib/storyblok-api";
import type { PhotoAlbumContent, SbBlokData, StoryVersion } from "@/lib/types";
import { cn } from "@/lib/utils";

type PhotoAlbumGridProps = {
  blok: SbBlokData & {
    eyebrow?: string;
    title: string;
    intro?: string;
    limit?: number;
  };
};

function resolveVersion(isDraft: boolean): StoryVersion {
  return isDraft || process.env.NODE_ENV !== "production" ? "draft" : "published";
}

export default async function PhotoAlbumGrid({ blok }: PhotoAlbumGridProps) {
  const { isEnabled } = await draftMode();
  const albums = await getPhotoAlbums(
    resolveVersion(isEnabled),
    typeof blok.limit === "number" ? blok.limit : undefined
  );

  return (
    <section className="section">
      <div className="container">
        <div {...storyblokEditable(blok as any)}>
          <SectionHeading eyebrow={blok.eyebrow} intro={blok.intro} title={blok.title} />
          {albums.length > 0 ? (
            <div className="album-grid">
              {albums.map((albumStory, index) => {
                const content = albumStory.content as PhotoAlbumContent;

                return (
                  <a
                    className={cn(
                      "album-card",
                      index === 0 && "album-card--feature",
                      index > 0 && index < 3 && "album-card--secondary"
                    )}
                    href={content.google_photos_url}
                    key={albumStory.full_slug}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div
                      className={cn(
                        "album-card__cover",
                        content.cover_image_url && "album-card__cover--image"
                      )}
                      style={
                        content.cover_image_url
                          ? {
                              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.22)), url(${content.cover_image_url})`
                            }
                          : undefined
                      }
                    />
                    <div className="album-card__copy">
                      <span className="album-card__eyebrow">
                        {index === 0 ? "Uitgelicht album" : "Fotoalbum"}
                      </span>
                      <h3>{content.title}</h3>
                      {content.introduction ? <p>{content.introduction}</p> : null}
                      <span className="album-card__link">Open in Google Photos</span>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="section-empty">
              <p>Er zijn momenteel geen fotoalbums beschikbaar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
