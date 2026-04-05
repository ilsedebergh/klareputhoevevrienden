import { StoryblokRichText, storyblokEditable } from "@storyblok/react/rsc";

import SectionHeading from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";
import type { SbBlokData } from "@/lib/types";

type SplitFeatureProps = {
  blok: SbBlokData & {
    eyebrow?: string;
    title: string;
    intro?: string;
    body?: Record<string, unknown>;
    image_left?: boolean;
    image_url?: string;
  };
};

export default function SplitFeature({ blok }: SplitFeatureProps) {
  const visual = (
    <div
      className={cn("split-feature__visual", blok.image_url && "split-feature__visual--image")}
      style={blok.image_url ? { backgroundImage: `url(${blok.image_url})` } : undefined}
    />
  );

  return (
    <section className="section">
      <div className="container">
        <div className="split-feature" {...storyblokEditable(blok as any)}>
          {blok.image_left ? visual : null}
          <div>
            <SectionHeading eyebrow={blok.eyebrow} intro={blok.intro} title={blok.title} />
            {blok.body ? (
              <div className="split-feature__body">
                <StoryblokRichText doc={blok.body as any} />
              </div>
            ) : null}
          </div>
          {!blok.image_left ? visual : null}
        </div>
      </div>
    </section>
  );
}
