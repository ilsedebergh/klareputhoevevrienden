function normalizeUrl(value?: string) {
  if (!value) {
    return "";
  }

  const trimmed = value.replace(/\/$/, "");
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const siteUrl =
  normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  normalizeUrl(process.env.VERCEL_URL) ||
  "http://localhost:3000";

export const storyblokContentToken =
  process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN || "";

export const storyblokRegion = process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu";

export const hasStoryblokConfig = Boolean(storyblokContentToken);

export const storyblokPreviewSecret = process.env.STORYBLOK_PREVIEW_SECRET || "";

export const hasStoryblokPreviewSecret = Boolean(storyblokPreviewSecret);
