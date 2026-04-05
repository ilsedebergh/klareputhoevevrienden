"use client";

import type { ReactNode } from "react";
import { apiPlugin, storyblokInit } from "@storyblok/react";

import { hasStoryblokConfig, storyblokContentToken, storyblokRegion } from "@/lib/env";

let initialized = false;

type StoryblokProviderProps = {
  children: ReactNode;
};

export default function StoryblokProvider({ children }: StoryblokProviderProps) {
  if (hasStoryblokConfig && !initialized) {
    storyblokInit({
      accessToken: storyblokContentToken,
      use: [apiPlugin],
      apiOptions: {
        region: storyblokRegion
      }
    });
    initialized = true;
  }

  return children;
}
