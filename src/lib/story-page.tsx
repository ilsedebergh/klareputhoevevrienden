import type { Metadata } from "next";
import { StoryblokStory } from "@storyblok/react/rsc";

import EventPage from "@/components/storyblok/EventPage";
import Page from "@/components/storyblok/Page";
import PhotoAlbumPage from "@/components/storyblok/PhotoAlbumPage";
import type { EventContent, PageContent, PhotoAlbumContent, SbStoryData, StoryVersion } from "@/lib/types";
import { excerpt } from "@/lib/utils";

export function resolveStoryVersion(isDraft: boolean): StoryVersion {
  return isDraft || process.env.NODE_ENV !== "production" ? "draft" : "published";
}

export function metadataFromStoryContent(
  content: PageContent | EventContent | PhotoAlbumContent | Record<string, unknown>
): Metadata {
  const title = typeof content.seo_title === "string" ? content.seo_title : "";
  const description = typeof content.seo_description === "string" ? content.seo_description : "";

  if (title && description) {
    return {
      title,
      description
    };
  }

  if (typeof content.component === "string" && content.component === "event") {
    const eventContent = content as EventContent;
    return {
      title: title || eventContent.title,
      description: description || excerpt(eventContent.excerpt || eventContent.location || "")
    };
  }

  if (typeof content.component === "string" && content.component === "photo_album") {
    const albumContent = content as PhotoAlbumContent;
    return {
      title: title || albumContent.title,
      description: description || excerpt(albumContent.introduction || "")
    };
  }

  const pageContent = content as PageContent;
  return {
    title: title || pageContent.title || "Klareputhoevevrienden",
    description:
      description || "Activiteiten, fotoalbums en verenigingsnieuws van De Klareputhoevevrienden."
  };
}

export function renderStory(
  story: SbStoryData<PageContent | EventContent | PhotoAlbumContent | Record<string, unknown>>
) {
  const component = typeof story.content.component === "string" ? story.content.component : "";

  if (component === "page") {
    return <Page blok={story.content as PageContent} slug={story.full_slug} />;
  }

  if (component === "event") {
    return <EventPage blok={story.content as EventContent} />;
  }

  if (component === "photo_album") {
    return <PhotoAlbumPage blok={story.content as PhotoAlbumContent} />;
  }

  return <StoryblokStory story={story} />;
}
