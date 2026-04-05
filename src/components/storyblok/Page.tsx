import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

import type { PageContent } from "@/lib/types";
import { cn } from "@/lib/utils";

type PageProps = {
  blok: PageContent;
  slug?: string;
};

export default function Page({ blok, slug }: PageProps) {
  const hasBody = Array.isArray(blok.body) && blok.body.length > 0;
  const isHome = slug === "home";

  return (
    <main
      className={cn(
        "story-page",
        isHome ? "story-page--home" : "story-page--default",
        !hasBody && "story-page--empty"
      )}
      {...storyblokEditable(blok as any)}
    >
      <div className="story-flow">
        {(blok.body || []).map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok as any} key={nestedBlok._uid} />
        ))}
      </div>
      {!hasBody ? (
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <span className="eyebrow">Lege pagina</span>
              <h1>Deze pagina heeft nog geen blokken in Storyblok.</h1>
              <p>Voeg een hero, contentblok of CTA toe om deze template verder op te bouwen.</p>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
