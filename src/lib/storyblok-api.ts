import { cache } from "react";

import { hasStoryblokConfig } from "@/lib/env";
import {
  getFallbackEvents,
  getFallbackPaths,
  getFallbackPhotoAlbums,
  getFallbackSiteSettings,
  getFallbackStory
} from "@/lib/fallback-content";
import { getStoryblokApi } from "@/lib/storyblok";
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

export const getStoryBySlug = cache(async (slug: string, version: StoryVersion) => {
  if (!hasStoryblokConfig) {
    return getFallbackStory(slug);
  }

  try {
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories/${slug}`, {
      version
    });
    return response.data.story as SbStoryData;
  } catch {
    return getFallbackStory(slug);
  }
});

export const getSiteSettings = cache(async (version: StoryVersion) => {
  if (!hasStoryblokConfig) {
    return getFallbackSiteSettings();
  }

  try {
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories/${SETTINGS_SLUG}`, {
      version
    });
    return response.data.story as SbStoryData<SiteSettingsContent>;
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
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.get("cdn/stories", {
      version,
      starts_with: EVENTS_PREFIX,
      per_page: 100
    });

    const stories = (response.data.stories as Array<SbStoryData<EventContent>>).filter(
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
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.get("cdn/stories", {
      version,
      starts_with: PHOTO_ALBUMS_PREFIX,
      per_page: 100
    });

    const stories = (response.data.stories as Array<SbStoryData<PhotoAlbumContent>>).filter(
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
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.get("cdn/links", {
      version
    });

    return Object.values(response.data.links as Record<string, { slug: string; is_folder: boolean }>)
      .filter((link) => !link.is_folder && !link.slug.startsWith("instellingen/"))
      .map((link) => link.slug);
  } catch {
    return getFallbackPaths();
  }
});
