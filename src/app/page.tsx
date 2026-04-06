import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { getStoryBySlug } from "@/lib/storyblok-api";
import { metadataFromStoryContent, renderStory, resolveStoryVersion } from "@/lib/story-page";
import { ensureStoryblokInit } from "@/lib/storyblok";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const story = await getStoryBySlug("home", resolveStoryVersion(isEnabled));

  if (!story) {
    return {};
  }

  return metadataFromStoryContent(story.content);
}

export default async function HomePage() {
  ensureStoryblokInit();

  const { isEnabled } = await draftMode();
  const story = await getStoryBySlug("home", resolveStoryVersion(isEnabled));

  if (!story) {
    notFound();
  }

  return renderStory(story);
}
