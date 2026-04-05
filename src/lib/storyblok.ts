import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

import ContactPanel from "@/components/blocks/ContactPanel";
import CtaBand from "@/components/blocks/CtaBand";
import EventsList from "@/components/blocks/EventsList";
import HeroBlock from "@/components/blocks/HeroBlock";
import NewsletterEmbed from "@/components/blocks/NewsletterEmbed";
import PhotoAlbumGrid from "@/components/blocks/PhotoAlbumGrid";
import RichTextSection from "@/components/blocks/RichTextSection";
import SplitFeature from "@/components/blocks/SplitFeature";
import EventPage from "@/components/storyblok/EventPage";
import Page from "@/components/storyblok/Page";
import PhotoAlbumPage from "@/components/storyblok/PhotoAlbumPage";
import { hasStoryblokConfig, storyblokContentToken, storyblokRegion } from "@/lib/env";

const components = {
  page: Page,
  event: EventPage,
  photo_album: PhotoAlbumPage,
  hero: HeroBlock,
  rich_text_section: RichTextSection,
  split_feature: SplitFeature,
  cta_band: CtaBand,
  events_list: EventsList,
  photo_album_grid: PhotoAlbumGrid,
  newsletter_embed: NewsletterEmbed,
  contact_panel: ContactPanel
};

let getApiFactory: ReturnType<typeof storyblokInit> | null = null;

export function ensureStoryblokInit() {
  if (!getApiFactory) {
    getApiFactory = storyblokInit({
      accessToken: storyblokContentToken || "preview-token-not-configured",
      use: hasStoryblokConfig ? [apiPlugin] : [],
      apiOptions: {
        region: storyblokRegion
      },
      components
    });
  }

  return getApiFactory;
}

export function getStoryblokApi() {
  if (!hasStoryblokConfig) {
    throw new Error("Storyblok content token is not configured.");
  }

  return ensureStoryblokInit()();
}
