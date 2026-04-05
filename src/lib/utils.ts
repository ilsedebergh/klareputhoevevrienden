import type { NavigationItemBlok, SbStoryData } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export function formatDateShort(date: string) {
  return new Intl.DateTimeFormat("nl-BE", {
    day: "2-digit",
    month: "short"
  }).format(new Date(date));
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function normalizeHref(href: string) {
  if (!href) {
    return "/";
  }

  if (isExternalHref(href)) {
    return href;
  }

  return href.startsWith("/") ? href : `/${href}`;
}

export function storyPath(fullSlug: string) {
  return fullSlug === "home" ? "/" : `/${fullSlug}`;
}

export function sortStoriesByDate<T extends SbStoryData>(stories: T[]) {
  return [...stories].sort((left, right) => {
    const leftDate = new Date(String(left.content.date || 0)).getTime();
    const rightDate = new Date(String(right.content.date || 0)).getTime();
    return leftDate - rightDate;
  });
}

export function navigationToLinks(items?: NavigationItemBlok[]) {
  return (items || []).map((item) => ({
    label: item.label,
    href: normalizeHref(item.href),
    newTab: Boolean(item.new_tab)
  }));
}

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function excerpt(text: string, length = 160) {
  const normal = text.replace(/\s+/g, " ").trim();
  if (normal.length <= length) {
    return normal;
  }

  return `${normal.slice(0, length - 1).trim()}…`;
}
