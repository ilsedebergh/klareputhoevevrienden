import { defaultClubLogoUrl } from "@/lib/branding";
import type {
  EventContent,
  PageContent,
  PhotoAlbumContent,
  SbStoryData,
  SiteSettingsContent
} from "@/lib/types";
import { sortStoriesByDate } from "@/lib/utils";

function uid(value: string) {
  return value;
}

const imagery = {
  homeHero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCXDe30awCgKCmZfZBcc17WlCGiP3DveGZPpgMGK-Rq5ElDZkaxRj_P9JXySioTJHl9mlvD_Li9tcR0sj20V5E8PqAxgSPQnHtoAUxmh8mae2A-iIPETiyMOj794Rya8jPfIvMEZB39xDI017JhaT3RzYgtNzj1qxsL4Iz3Yn24LmqAIPBkwpT9tYrxJnqB_DIGlOC0PtlAuZJ2tc7wPTAd8rylphYSK9rPhBnq8stDsu5UAgjTXVBAsTA34zz0RNOmhw6TSk27uFM",
  agendaHero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDC0kgizUHidMv2WAyvDNijk6f1VPrdg614xtpccMaYDvvw4Haic11hJUY4stsZK8z3NVERBxCfXvvbCGTOv_DkWbf_BmsvlZp2y3XzBhipuGETJUNtyLR1GSYWCTuDfqBrTWM28EWVR2zCadSkWm1qZbxT0PKMD6edWu_p51LKcj_v955AxsKE1yLmae8vhC7nf0CzYsmOeHktGeQzIDMFFnUoN74BwdGOGhb3iEMuh4rvkxpf3Z66J8yx7dwpe41tIN2B9R1QCWA",
  galleryHero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCRma2mRRIW-X9_7qRP_RjJKqTszkqeFlBPJEu-fDuzkmVCpNrTa2bP0VgfZvsIWbgjKCoFAOWcIt3jzBrPD5iTDI5vmyAaKxlvahQSzZJoQ-6rNeUbM-wx2cB-87WvKeGWccKEorf7LsuXDOAVf9-QOd8CYe-4fXNO0YjHQpHCg2HMmfRP_xv7oNR4EM-caymdI-N_rffGd3fKbIPskgjhMD6790_gQzIwoTH0CZHnbp9f3TFJCAMXz_dfPipgTjgBFQLVxMqlJ9c",
  members:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDwSG4BJDPuWasuJvFja91MBsoqEEHX7AkPSqIdugfjiVF49lJfiCDqP35dgiQjojuZZdmuuPb0ty4-buFncId4NoFTCnqSAMRwW1ew56A71DxoiyARbn5A-iovodMf9NudtzwOD02HH7wyjYTuT3CxLg18jmsK1lqTnFIw4_EMsHp774HAXy7KKyFMojy_24S-BWEz2EvB7hy3JMOGJfwk1Bm0v9aSkQcNPhMm4z6_iEIodSj_i2roUrylERdbqPPCZ-hX6GCiKoc",
  emblem:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDM1s5AYL0exEzduycDn71ge68bUqZxvLyXiLCWSdswzQJAYF0CXJA2N2vkskjmxE0du32l4bTEV7v-doAd7QeX96MY35Uru02FXp5orXySwqAQWOJfO80JTMuVvnG5lRg-xqP_dhVyHvk2o8mYTi9AEC7-G9xXMOfFhBIAN-Z62chNPAB91VQoRBxk6Artpf4WUMkb3riLyc2DmaO0q41J5_FZiSqRucxomB5DzLKWT_hg5ICFSHEsuIUYoZl8dGnJu0TbtiaP3Y8",
  convoy:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCVaS4lZvpLGfr_qv5qVVkEaFUtKwuOzuo24F1T_sdvIbxDuIy_8_w8lZmAtcJ3JiyNVWvnCeuwlXawZEktqtQU-JZ_2atccxdgyyN97GXPWlROStbrakmYoz5z2UGBL_NJWWHaYQ5lPMUlFraAnKR2H7Glo9tfmUa4nyLyZbDtXG7du31J9hTEi0RXxETFFQhUFWwFvyP2G1Z4iqEgOaOxPSCGJ57hSwh-8R1Ck--Vwvea3IdHKLRBH2-Bp6HTcdeFYab2EWzCTi4",
  barn:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBe07gqN9Mg61m-rHG_jm4DT7uQGPa2LAIHrk1_1rxYLH8o7ATOWqfCmqBizSiyVfYVGPYB0IBZn_Y0cwpgd0yt0z4e7CteHC8L9bi9GQdw1cuuKM7YHAyOhQfT8FGGbQdNEt3cEnGIloYysmkaVkzYR7_nMUYfo3k5YTw1FAHXTUvVQnKcajy4bNI-OISZEXwDEhl2pQzn8ErpV6j4bqNoIW7pkf4c46Hq--7ePoy_o-phY0MINGyfDtK9xI7qB6Ci0T50lxeMFP4"
};

const homeStory: SbStoryData<PageContent> = {
  name: "Home",
  slug: "home",
  full_slug: "home",
  is_startpage: true,
  content: {
    component: "page",
    title: "Klareputhoevevrienden",
    seo_title: "Klareputhoevevrienden vzw",
    seo_description:
      "Verenigingswebsite met activiteitenkalender, fotoreeksen en nieuwsbrief voor De Klareputhoevevrienden vzw.",
    body: [
      {
        _uid: uid("hero-home"),
        component: "hero",
        eyebrow: "Sedert 1994",
        title: "Klareputhoevevrienden Poperinge",
        intro:
          "Een gemeenschap van liefhebbers die oude tractoren, ritten en veldverhalen met zorg levend houdt. Van optochten tot restauraties: erfgoed blijft hier in beweging.",
        primary_label: "Bekijk de agenda",
        primary_href: "/agenda",
        secondary_label: "Ontdek de galerij",
        secondary_href: "/fotos",
        show_logo: true,
        supporting_note: "Traditie in beweging, met een hart voor machines en mensen.",
        image_url: imagery.homeHero,
        image_alt: "Klassieke oldtimertractor in een groen landschap"
      },
      {
        _uid: uid("home-feature"),
        component: "split_feature",
        eyebrow: "Vereniging",
        title: "Samen houden we landbouwgeschiedenis levend",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "De club draait rond vriendschap, techniek en gedeelde herinneringen. We brengen restauraties, rondritten, demonstraties en ontmoetingen samen in een rustige, editoriale online omgeving die dezelfde zorg uitstraalt als het erfgoed zelf."
                }
              ]
            }
          ]
        },
        image_url: imagery.members,
        image_left: false
      },
      {
        _uid: uid("events-home"),
        component: "events_list",
        eyebrow: "Agenda",
        title: "Komende activiteiten",
        intro: "Van clubmomenten tot optochten en demo's: dit zijn de eerstvolgende data in de kalender.",
        limit: 4,
        include_past: false
      },
      {
        _uid: uid("albums-home"),
        component: "photo_album_grid",
        eyebrow: "Galerij",
        title: "Beelden uit de clubgeschiedenis",
        intro:
          "Een selectie van rondritten, ontmoetingen en technische details. De volledige reeksen blijven beschikbaar via Google Photos.",
        limit: 3
      },
      {
        _uid: uid("newsletter-home"),
        component: "newsletter_embed",
        eyebrow: "Nieuwsbrief",
        title: "Blijf op de hoogte van ritten, demo's en clubnieuws",
        intro:
          "Voeg in Storyblok de Mailchimp embedcode toe. Tot dan toont de website een verzorgde placeholder in dezelfde stijl."
      },
      {
        _uid: uid("home-cta"),
        component: "cta_band",
        eyebrow: "Meedoen",
        title: "Word deel van de Klareputhoevevrienden",
        text:
          "Rij mee, help restaureren of steun de vereniging als sympathisant. Nieuwe leden en helpende handen zijn altijd welkom.",
        primary_label: "Neem contact op",
        primary_href: "/contact"
      },
      {
        _uid: uid("contact-home"),
        component: "contact_panel",
        title: "Bezoek, contact of lid worden",
        intro: "Voor praktische vragen, deelname aan activiteiten of nieuwe inschrijvingen.",
        address: "Prof-Dewulfstraat 122\n8970 Poperinge",
        email: "info@klareputhoevevrienden.be",
        phone: "0475 62 48 86"
      }
    ]
  }
};

const agendaStory: SbStoryData<PageContent> = {
  name: "Agenda",
  slug: "agenda",
  full_slug: "agenda",
  content: {
    component: "page",
    title: "Agenda",
    seo_title: "Agenda | Klareputhoevevrienden",
    seo_description: "Overzicht van komende activiteiten en oldtimerevents.",
    body: [
      {
        _uid: uid("agenda-hero"),
        component: "hero",
        eyebrow: "Agenda",
        title: "Ritten, optochten en clubmomenten op één plek",
        intro:
          "Gebruik deze pagina als publiek overzicht van komende activiteiten. Data, locatie en praktische info blijven rechtstreeks beheerd vanuit het CMS.",
        primary_label: "Terug naar home",
        primary_href: "/",
        secondary_label: "Nieuwsbrief",
        secondary_href: "/contact",
        image_url: imagery.agendaHero,
        image_alt: "Detail van een vintage tractor in ochtendlicht"
      },
      {
        _uid: uid("agenda-list"),
        component: "events_list",
        eyebrow: "Kalender",
        title: "Alle geplande activiteiten",
        intro: "Een overzichtelijke kalender met de eerstvolgende ontmoetingen, demonstraties en ritten.",
        limit: 12,
        include_past: false
      }
    ]
  }
};

const photosStory: SbStoryData<PageContent> = {
  name: "Foto's",
  slug: "fotos",
  full_slug: "fotos",
  content: {
    component: "page",
    title: "Foto's",
    seo_title: "Fotoalbums | Klareputhoevevrienden",
    seo_description: "Albumoverzicht met doorklik naar Google Photos.",
    body: [
      {
        _uid: uid("photos-hero"),
        component: "hero",
        eyebrow: "Galerij",
        title: "Kijk terug op machines, mensen en momenten",
        intro:
          "Albums worden vanuit het CMS beheerd, terwijl de volledige beeldreeksen extern op Google Photos blijven staan.",
        primary_label: "Bekijk de agenda",
        primary_href: "/agenda",
        image_url: imagery.galleryHero,
        image_alt: "Vintage tractor tijdens een clubmoment"
      },
      {
        _uid: uid("photos-grid"),
        component: "photo_album_grid",
        eyebrow: "Albums",
        title: "Een editoriale selectie van fotoreeksen",
        intro: "Elk album krijgt een eigen pagina met doorklik naar Google Photos.",
        limit: 12
      }
    ]
  }
};

const aboutStory: SbStoryData<PageContent> = {
  name: "Over ons",
  slug: "over-ons",
  full_slug: "over-ons",
  content: {
    component: "page",
    title: "Over ons",
    seo_title: "Over ons | Klareputhoevevrienden",
    seo_description: "Informatie over de vereniging en haar werking.",
    body: [
      {
        _uid: uid("about-hero"),
        component: "hero",
        eyebrow: "Over de vereniging",
        title: "Een vereniging die techniek en traditie samenbrengt",
        intro:
          "De Klareputhoevevrienden brengen mensen samen rond oude tractoren, landbouwtradities en het plezier van samen activiteiten organiseren.",
        primary_label: "Neem contact op",
        primary_href: "/contact",
        image_url: imagery.barn,
        image_alt: "Oude tractor in een schuur"
      },
      {
        _uid: uid("about-copy"),
        component: "rich_text_section",
        eyebrow: "Missie",
        title: "Traditie, ontmoeting en zorg voor mechanisch erfgoed",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Wat begon als gedeelde passie voor landbouwmachines groeide uit tot een warme vereniging waar vakkennis, herinneringen en gezamenlijke ritten centraal staan."
                }
              ]
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "We bewaren niet alleen machines, maar ook verhalen, kennis en ontmoetingen tussen generaties. Dat karakter mag ook op de website voelbaar zijn."
                }
              ]
            }
          ]
        }
      },
      {
        _uid: uid("about-feature"),
        component: "split_feature",
        eyebrow: "Beheer",
        title: "Erfgoed met handen en harten",
        body: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Activiteiten, fotoalbums en vaste pagina's zijn zo opgebouwd dat de vereniging haar inhoud eenvoudig kan beheren, zonder de rust en kwaliteit van de presentatie te verliezen."
                }
              ]
            }
          ]
        },
        image_left: false,
        image_url: imagery.emblem
      }
    ]
  }
};

const contactStory: SbStoryData<PageContent> = {
  name: "Contact",
  slug: "contact",
  full_slug: "contact",
  content: {
    component: "page",
    title: "Contact",
    seo_title: "Contact | Klareputhoevevrienden",
    seo_description: "Contactgegevens en nieuwsbriefinschrijving.",
    body: [
      {
        _uid: uid("contact-hero"),
        component: "hero",
        eyebrow: "Contact",
        title: "Neem contact op met de vereniging",
        intro:
          "Gebruik deze pagina voor algemene vragen, praktische info en nieuwe inschrijvingen.",
        primary_label: "Terug naar home",
        primary_href: "/",
        image_url: imagery.convoy,
        image_alt: "Oldtimertractoren tijdens een rit"
      },
      {
        _uid: uid("contact-panel"),
        component: "contact_panel",
        title: "Algemene contactgegevens",
        intro: "Voor vragen over activiteiten, lidmaatschap of praktische informatie.",
        address: "Prof-Dewulfstraat 122\n8970 Poperinge",
        email: "info@klareputhoevevrienden.be",
        phone: "0475 62 48 86"
      },
      {
        _uid: uid("contact-newsletter"),
        component: "newsletter_embed",
        eyebrow: "Nieuwsbrief",
        title: "Schrijf je in via Mailchimp",
        intro:
          "Vervang deze placeholder in Storyblok door de echte embedcode uit Mailchimp."
      }
    ]
  }
};

const eventStories: Array<SbStoryData<EventContent>> = [
  {
    name: "Oldtimertractorrondrit te Wulvergem",
    slug: "oldtimertractorrondrit-te-wulvergem",
    full_slug: "activiteiten/oldtimertractorrondrit-te-wulvergem",
    content: {
      component: "event",
      title: "Oldtimertractorrondrit te Wulvergem",
      seo_title: "Oldtimertractorrondrit te Wulvergem",
      seo_description: "Oldtimertractorrondrit te Wulvergem met tractorwijding.",
      date: "2026-04-25T12:00:00+02:00",
      location: "Wulvergem, Heuvelland",
      excerpt:
        "Oldtimertractorrondrit te Wulvergem met tractorwijding. Info: Feestcomité Wulvergem.",
      contact_details: "Info: Feestcomité Wulvergem",
      body: []
    }
  },
  {
    name: "Dag van de verzamelaar Watou",
    slug: "dag-van-de-verzamelaar-watou",
    full_slug: "activiteiten/dag-van-de-verzamelaar-watou",
    content: {
      component: "event",
      title: "Dag van de verzamelaar Watou",
      seo_title: "Dag van de verzamelaar Watou",
      seo_description: "Bezoek aan een tractorverzameling in Watou.",
      date: "2026-04-26T13:30:00+02:00",
      location: "Kapellestraat 23, Watou",
      excerpt:
        "Bezoek aan de verzameling van Jurgen Struye in Watou, met vrije bezichtiging in de namiddag.",
      contact_details: "Jurgen Struye",
      body: []
    }
  },
  {
    name: "Busreis van De Klareputhoevevrienden vzw",
    slug: "busreis-klareputhoevevrienden",
    full_slug: "activiteiten/busreis-klareputhoevevrienden",
    content: {
      component: "event",
      title: "Busreis van De Klareputhoevevrienden vzw",
      seo_title: "Busreis van De Klareputhoevevrienden vzw",
      seo_description: "Busreis georganiseerd door De Klareputhoevevrienden.",
      date: "2026-05-16T12:00:00+02:00",
      location: "Vertrek volgens ledencommunicatie",
      excerpt:
        "Busreis van De Klareputhoevevrienden vzw. Meer informatie via Hugo Vercruysse, Eddy Debergh of info@klareputhoevevrienden.be.",
      contact_details:
        "Hugo Vercruysse, Eddy Debergh of info@klareputhoevevrienden.be",
      body: []
    }
  },
  {
    name: "Oude landbouw in beweging",
    slug: "oude-landbouw-in-beweging",
    full_slug: "activiteiten/oude-landbouw-in-beweging",
    content: {
      component: "event",
      title: "Oude landbouw in beweging",
      seo_title: "Oude landbouw in beweging",
      seo_description: "Demonstratiedag waarop oude landbouwtechnieken getoond worden.",
      date: "2026-05-31T13:30:00+02:00",
      location: "Ezelboerderij Ezelpad, Poperinge",
      excerpt:
        "Een dag waar iedereen kan ploegen, eggen, maaien en oude landbouwtechnieken in actie kan zien.",
      contact_details: "Ezelboerderij Ezelpad",
      body: []
    }
  }
];

const photoAlbumStories: Array<SbStoryData<PhotoAlbumContent>> = [
  {
    name: "Rondritten en bijeenkomsten",
    slug: "rondritten-en-bijeenkomsten",
    full_slug: "foto-albums/rondritten-en-bijeenkomsten",
    content: {
      component: "photo_album",
      title: "Rondritten en bijeenkomsten",
      seo_title: "Fotoalbum | Rondritten en bijeenkomsten",
      seo_description: "Fotoalbum met beelden van rondritten en ontmoetingen.",
      introduction:
        "Een sfeervolle terugblik op rondritten, ontmoetingen en gedeelde momenten binnen de club.",
      google_photos_url: "https://photos.google.com/",
      cover_image_url: imagery.convoy
    }
  },
  {
    name: "Ploegdemo's en veldwerk",
    slug: "ploegdemos-en-veldwerk",
    full_slug: "foto-albums/ploegdemos-en-veldwerk",
    content: {
      component: "photo_album",
      title: "Ploegdemo's en veldwerk",
      seo_title: "Fotoalbum | Ploegdemo's en veldwerk",
      seo_description: "Fotoalbum met beelden van ploegdemo's en demonstraties.",
      introduction:
        "Detailbeelden van ploegen, veldwerk en restauraties die tonen hoe techniek en landschap samenkomen.",
      google_photos_url: "https://photos.google.com/",
      cover_image_url: imagery.emblem
    }
  },
  {
    name: "Clubmomenten en vrijwilligers",
    slug: "clubmomenten-en-vrijwilligers",
    full_slug: "foto-albums/clubmomenten-en-vrijwilligers",
    content: {
      component: "photo_album",
      title: "Clubmomenten en vrijwilligers",
      seo_title: "Fotoalbum | Clubmomenten en vrijwilligers",
      seo_description: "Fotoalbum met sfeerbeelden van de vereniging.",
      introduction:
        "Portretten van vrijwilligers, leden en clubmomenten die de vereniging dragen.",
      google_photos_url: "https://photos.google.com/",
      cover_image_url: imagery.members
    }
  }
];

const siteSettings: SbStoryData<SiteSettingsContent> = {
  name: "Site settings",
  slug: "site-settings",
  full_slug: "instellingen/site-settings",
  content: {
    component: "site_settings",
    site_name: "Klareputhoevevrienden",
    site_tagline: "Traditie in beweging sinds 1994",
    logo_url: defaultClubLogoUrl,
    navigation: [
      {
        _uid: uid("nav-home"),
        component: "navigation_item",
        label: "Home",
        href: "/"
      },
      {
        _uid: uid("nav-agenda"),
        component: "navigation_item",
        label: "Agenda",
        href: "/agenda"
      },
      {
        _uid: uid("nav-fotos"),
        component: "navigation_item",
        label: "Galerij",
        href: "/fotos"
      },
      {
        _uid: uid("nav-over"),
        component: "navigation_item",
        label: "Over ons",
        href: "/over-ons"
      },
      {
        _uid: uid("nav-contact"),
        component: "navigation_item",
        label: "Contact",
        href: "/contact"
      }
    ],
    footer_note: "Klareputhoevevrienden vzw | Poperinge",
    address: "Prof-Dewulfstraat 122\n8970 Poperinge",
    email: "info@klareputhoevevrienden.be",
    phone: "0475 62 48 86",
    company_number: "0845.617.294"
  }
};

const fallbackStories = [
  homeStory,
  agendaStory,
  photosStory,
  aboutStory,
  contactStory,
  ...eventStories,
  ...photoAlbumStories,
  siteSettings
];

const fallbackMap = new Map(fallbackStories.map((story) => [story.full_slug, story]));

export function getFallbackStory(slug: string) {
  return fallbackMap.get(slug) || null;
}

export function getFallbackSiteSettings() {
  return siteSettings;
}

export function getFallbackEvents() {
  return sortStoriesByDate(eventStories);
}

export function getFallbackPhotoAlbums() {
  return photoAlbumStories;
}

export function getFallbackPaths() {
  return fallbackStories
    .filter((story) => !story.is_folder && !story.full_slug.startsWith("instellingen/"))
    .map((story) => story.full_slug);
}
