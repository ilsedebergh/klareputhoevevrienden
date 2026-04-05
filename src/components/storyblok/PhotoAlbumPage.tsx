import { storyblokEditable } from "@storyblok/react/rsc";

import ButtonLink from "@/components/site/ButtonLink";
import type { PhotoAlbumContent } from "@/lib/types";

type PhotoAlbumPageProps = {
  blok: PhotoAlbumContent;
};

export default function PhotoAlbumPage({ blok }: PhotoAlbumPageProps) {
  const coverStyle = blok.cover_image_url
    ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.14), rgba(0,0,0,0.16)), url(${blok.cover_image_url})` }
    : undefined;

  return (
    <main className="photo-album-page" {...storyblokEditable(blok as any)}>
      <section className="section">
        <div className="container">
          <article className="album-detail">
            <span className="eyebrow">Fotoalbum</span>
            <h1>{blok.title}</h1>
            <div className="album-detail__cover" style={coverStyle} />
            {blok.introduction ? <p className="album-detail__intro">{blok.introduction}</p> : null}
            <ButtonLink href={blok.google_photos_url}>Open het album op Google Photos</ButtonLink>
          </article>
        </div>
      </section>
    </main>
  );
}
