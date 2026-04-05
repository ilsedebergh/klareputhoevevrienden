export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const storyblokContentToken =
  process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN || "";

export const storyblokRegion = process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu";

export const hasStoryblokConfig = Boolean(storyblokContentToken);
