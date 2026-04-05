export type StoryVersion = "draft" | "published";

export type SbBlokData = {
  _uid: string;
  component: string;
  [key: string]: unknown;
};

export type SbStoryData<TContent extends Record<string, unknown> = Record<string, unknown>> = {
  id?: number;
  uuid?: string;
  name: string;
  slug: string;
  full_slug: string;
  content: TContent;
  is_folder?: boolean;
  is_startpage?: boolean;
  published_at?: string | null;
  first_published_at?: string | null;
};

export type NavigationItemBlok = SbBlokData & {
  component: "navigation_item";
  label: string;
  href: string;
  new_tab?: boolean;
};

export type SiteSettingsContent = {
  component: "site_settings";
  site_name: string;
  site_tagline?: string;
  logo_url?: string;
  navigation?: NavigationItemBlok[];
  footer_note?: string;
  address?: string;
  email?: string;
  phone?: string;
  company_number?: string;
};

export type PageContent = {
  component: "page";
  title?: string;
  seo_title?: string;
  seo_description?: string;
  body?: SbBlokData[];
};

export type EventContent = {
  component: "event";
  title: string;
  seo_title?: string;
  seo_description?: string;
  date: string;
  location?: string;
  excerpt?: string;
  contact_details?: string;
  registration_url?: string;
  body?: SbBlokData[];
};

export type PhotoAlbumContent = {
  component: "photo_album";
  title: string;
  seo_title?: string;
  seo_description?: string;
  introduction?: string;
  google_photos_url: string;
  cover_image_url?: string;
};

export type SeoFields = {
  title: string;
  description: string;
};
