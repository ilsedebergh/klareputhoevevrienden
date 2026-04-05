import type { ReactNode } from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";

import StoryblokProvider from "@/components/storyblok/StoryblokProvider";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { siteUrl } from "@/lib/env";
import { getSiteSettings } from "@/lib/storyblok-api";
import { ensureStoryblokInit } from "@/lib/storyblok";
import type { StoryVersion } from "@/lib/types";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Klareputhoevevrienden",
  description: "Activiteiten, fotoalbums en verenigingsnieuws van De Klareputhoevevrienden."
};

function resolveVersion(isDraft: boolean): StoryVersion {
  return isDraft || process.env.NODE_ENV !== "production" ? "draft" : "published";
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  ensureStoryblokInit();

  const { isEnabled } = await draftMode();
  const version = resolveVersion(isEnabled);
  const settings = await getSiteSettings(version);

  return (
    <html lang="nl">
      <body className="app-body">
        <StoryblokProvider>
          <div className="site-shell">
            <SiteHeader settings={settings} />
            {children}
            <SiteFooter settings={settings} />
          </div>
        </StoryblokProvider>
      </body>
    </html>
  );
}
