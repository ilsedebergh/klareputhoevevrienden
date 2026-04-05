import { StoryblokRichText, storyblokEditable } from "@storyblok/react/rsc";

import SectionHeading from "@/components/site/SectionHeading";
import type { SbBlokData } from "@/lib/types";

type RichTextSectionProps = {
  blok: SbBlokData & {
    eyebrow?: string;
    title: string;
    intro?: string;
    content?: Record<string, unknown>;
  };
};

export default function RichTextSection({ blok }: RichTextSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="rich-text-card" {...storyblokEditable(blok as any)}>
          <SectionHeading eyebrow={blok.eyebrow} intro={blok.intro} title={blok.title} />
          {blok.content ? (
            <div className="rich-text-body">
              <StoryblokRichText doc={blok.content as any} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
