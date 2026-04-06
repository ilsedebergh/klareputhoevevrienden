import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { hasStoryblokPreviewSecret, storyblokPreviewSecret } from "@/lib/env";

type PreviewLayoutProps = {
  children: ReactNode;
  params: Promise<{ secret: string }>;
};

export default async function PreviewLayout({ children, params }: PreviewLayoutProps) {
  const { secret } = await params;

  if (!hasStoryblokPreviewSecret || secret !== storyblokPreviewSecret) {
    notFound();
  }

  const draft = await draftMode();
  draft.enable();

  return children;
}
