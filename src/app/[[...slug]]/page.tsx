import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";

import EventPage from "@/components/storyblok/EventPage";
import Page from "@/components/storyblok/Page";
import PhotoAlbumPage from "@/components/storyblok/PhotoAlbumPage";
import { getStoryBySlug } from "@/lib/storyblok-api";
import { ensureStoryblokInit } from "@/lib/storyblok";
import type { EventContent, PageContent, PhotoAlbumContent, StoryVersion } from "@/lib/types";
import { excerpt } from "@/lib/utils";

function resolveSlug(segments?: string[]) {
  return !segments || segments.length === 0 ? "home" : segments.join("/");
}

function resolveVersion(isDraft: boolean): StoryVersion {
  return isDraft || process.env.NODE_ENV !== "production" ? "draft" : "published";
}

function metadataFromContent(
  content: PageContent | EventContent | PhotoAlbumContent | Record<string, unknown>
) {
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

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const slug = resolveSlug((await params).slug);
  const { isEnabled } = await draftMode();
  const story = await getStoryBySlug(slug, resolveVersion(isEnabled));

  if (!story) {
    return {};
  }

  const metadata = metadataFromContent(story.content);
  return {
    title: metadata.title,
    description: metadata.description
  };
}

export default async function StoryPage({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  ensureStoryblokInit();

  const slug = resolveSlug((await params).slug);
  const { isEnabled } = await draftMode();
  const story = await getStoryBySlug(slug, resolveVersion(isEnabled));

  if (!story) {
    notFound();
  }

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
