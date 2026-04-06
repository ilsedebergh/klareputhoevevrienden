import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getStoryBySlug } from "@/lib/storyblok-api";
import { metadataFromStoryContent, renderStory } from "@/lib/story-page";
import { ensureStoryblokInit } from "@/lib/storyblok";

export async function generateMetadata(): Promise<Metadata> {
  const story = await getStoryBySlug("home", "draft");

  if (!story) {
    return {};
  }

  return metadataFromStoryContent(story.content);
}

export default async function StoryblokPreviewHomePage() {
  ensureStoryblokInit();

  const story = await getStoryBySlug("home", "draft");

  if (!story) {
    notFound();
  }

  return renderStory(story);
}
