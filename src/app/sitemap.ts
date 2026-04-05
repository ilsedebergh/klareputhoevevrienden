import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/env";
import { getStoryPaths } from "@/lib/storyblok-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = await getStoryPaths(process.env.NODE_ENV === "production" ? "published" : "draft");

  return paths.map((path) => ({
    url: path === "home" ? siteUrl : `${siteUrl}/${path}`,
    lastModified: new Date()
  }));
}
