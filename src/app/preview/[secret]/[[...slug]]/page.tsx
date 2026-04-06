import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getStoryBySlug } from "@/lib/storyblok-api";
import { metadataFromStoryContent, renderStory } from "@/lib/story-page";
import { ensureStoryblokInit } from "@/lib/storyblok";

function resolveSlug(segments?: string[]) {
  return !segments || segments.length === 0 ? "home" : segments.join("/");
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const slug = resolveSlug((await params).slug);
  const story = await getStoryBySlug(slug, "draft");

  if (!story) {
    return {};
  }

  return metadataFromStoryContent(story.content);
}

export default async function StoryblokPreviewStoryPage({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  ensureStoryblokInit();

  const slug = resolveSlug((await params).slug);
  const story = await getStoryBySlug(slug, "draft");

  if (!story) {
    notFound();
  }

  return renderStory(story);
}
