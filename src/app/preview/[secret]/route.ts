import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { hasStoryblokPreviewSecret, storyblokPreviewSecret } from "@/lib/env";

function resolvePreviewPath(rawSlug: string | null) {
  if (!rawSlug || rawSlug === "home" || rawSlug === "/home") {
    return "/";
  }

  return rawSlug.startsWith("/") ? rawSlug : `/${rawSlug}`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ secret: string }> }
) {
  const { secret } = await params;

  if (!hasStoryblokPreviewSecret || secret !== storyblokPreviewSecret) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();

  const requestUrl = new URL(request.url);
  const slug = requestUrl.searchParams.get("slug");
  const targetUrl = new URL(resolvePreviewPath(slug), requestUrl.origin);

  requestUrl.searchParams.delete("slug");
  targetUrl.search = requestUrl.searchParams.toString();

  return NextResponse.redirect(targetUrl);
}
