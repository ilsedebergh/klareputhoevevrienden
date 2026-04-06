import { cache } from "react";

import { hasStoryblokConfig, storyblokContentToken, storyblokRegion } from "@/lib/env";
import {
  getFallbackEvents,
  getFallbackPaths,
  getFallbackPhotoAlbums,
  getFallbackSiteSettings,
  getFallbackStory
} from "@/lib/fallback-content";
import type {
  EventContent,
  PhotoAlbumContent,
  SbStoryData,
  SiteSettingsContent,
  StoryVersion
} from "@/lib/types";
import { sortStoriesByDate } from "@/lib/utils";

const SETTINGS_SLUG = "instellingen/site-settings";
const EVENTS_PREFIX = "activiteiten/";
const PHOTO_ALBUMS_PREFIX = "foto-albums/";
const STORYBLOK_TIMEOUT_MS = 10000;

type StoryblokQuery = Record<string, string | number | null | undefined>;
type StoryResponse<TContent extends Record<string, unknown>> = {
  story: SbStoryData<TContent>;
};
type StoriesResponse<TContent extends Record<string, unknown>> = {
  stories: Array<SbStoryData<TContent>>;
};
type LinksResponse = {
  links: Record<string, { slug: string; is_folder: boolean }>;
};

function storyblokBaseUrl() {
  if (storyblokRegion === "eu") {
    return "https://api.storyblok.com/v2/";
  }

  return `https://api-${storyblokRegion}.storyblok.com/v2/`;
}

async function fetchStoryblok<TResponse>(
  path: string,
  query: StoryblokQuery,
  version: StoryVersion
) {
  const url = new URL(path.replace(/^\//, ""), storyblokBaseUrl());

  for (const [key, value] of Object.entries({
    ...query,
    version,
    token: storyblokContentToken
  })) {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    cache: version === "draft" ? "no-store" : "force-cache",
    next: version === "draft" ? undefined : { revalidate: 60 },
    signal: AbortSignal.timeout(STORYBLOK_TIMEOUT_MS)
  });

  if (!response.ok) {
    throw new Error(`Storyblok request failed with ${response.status} for ${path}`);
  }

  return (await response.json()) as TResponse;
}

export const getStoryBySlug = cache(async (slug: string, version: StoryVersion) => {
  if (!hasStoryblokConfig) {
    return getFallbackStory(slug);
  }

  try {
    const response = await fetchStoryblok<StoryResponse<Record<string, unknown>>>(
      `cdn/stories/${slug}`,
      {},
      version
    );
    return response.story as SbStoryData;
  } catch {
    return getFallbackStory(slug);
  }
});

export const getSiteSettings = cache(async (version: StoryVersion) => {
  if (!hasStoryblokConfig) {
    return getFallbackSiteSettings();
  }

  try {
    const response = await fetchStoryblok<StoryResponse<SiteSettingsContent>>(
      `cdn/stories/${SETTINGS_SLUG}`,
      {},
      version
    );
    return response.story as SbStoryData<SiteSettingsContent>;
  } catch {
    return getFallbackSiteSettings();
  }
});

export const getEvents = cache(async (version: StoryVersion, limit?: number) => {
  if (!hasStoryblokConfig) {
    const fallbackStories = getFallbackEvents();
    return typeof limit === "number" ? fallbackStories.slice(0, limit) : fallbackStories;
  }

  try {
    const response = await fetchStoryblok<StoriesResponse<EventContent>>(
      "cdn/stories",
      {
      starts_with: EVENTS_PREFIX,
      per_page: 100
      },
      version
    );

    const stories = (response.stories as Array<SbStoryData<EventContent>>).filter(
      (story) => !story.is_folder && story.content.component === "event"
    );

    const sorted = sortStoriesByDate(stories);
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  } catch {
    const fallbackStories = getFallbackEvents();
    return typeof limit === "number" ? fallbackStories.slice(0, limit) : fallbackStories;
  }
});

export const getPhotoAlbums = cache(async (version: StoryVersion, limit?: number) => {
  if (!hasStoryblokConfig) {
    const fallbackStories = getFallbackPhotoAlbums();
    return typeof limit === "number" ? fallbackStories.slice(0, limit) : fallbackStories;
  }

  try {
    const response = await fetchStoryblok<StoriesResponse<PhotoAlbumContent>>(
      "cdn/stories",
      {
      starts_with: PHOTO_ALBUMS_PREFIX,
      per_page: 100
      },
      version
    );

    const stories = (response.stories as Array<SbStoryData<PhotoAlbumContent>>).filter(
      (story) => !story.is_folder && story.content.component === "photo_album"
    );

    return typeof limit === "number" ? stories.slice(0, limit) : stories;
  } catch {
    const fallbackStories = getFallbackPhotoAlbums();
    return typeof limit === "number" ? fallbackStories.slice(0, limit) : fallbackStories;
  }
});

export const getStoryPaths = cache(async (version: StoryVersion) => {
  if (!hasStoryblokConfig) {
    return getFallbackPaths();
  }

  try {
    const response = await fetchStoryblok<LinksResponse>("cdn/links", {}, version);

    return Object.values(response.links as Record<string, { slug: string; is_folder: boolean }>)
      .filter((link) => !link.is_folder && !link.slug.startsWith("instellingen/"))
      .map((link) => link.slug);
  } catch {
    return getFallbackPaths();
  }
});
