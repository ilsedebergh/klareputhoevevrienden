export const COMPONENTS = [
  {
    name: "page",
    display_name: "Pagina",
    is_root: true,
    schema: {
      title: {
        type: "text",
        pos: 10
      },
      seo_title: {
        type: "text",
        pos: 20
      },
      seo_description: {
        type: "textarea",
        pos: 30
      },
      body: {
        type: "bloks",
        pos: 40
      }
    }
  },
  {
    name: "event",
    display_name: "Event",
    is_root: true,
    schema: {
      title: {
        type: "text",
        pos: 10,
        required: true
      },
      seo_title: {
        type: "text",
        pos: 20
      },
      seo_description: {
        type: "textarea",
        pos: 30
      },
      date: {
        type: "datetime",
        pos: 40,
        required: true
      },
      location: {
        type: "text",
        pos: 50
      },
      excerpt: {
        type: "textarea",
        pos: 60
      },
      contact_details: {
        type: "textarea",
        pos: 70
      },
      registration_url: {
        type: "text",
        pos: 80
      },
      body: {
        type: "bloks",
        pos: 90
      }
    }
  },
  {
    name: "photo_album",
    display_name: "Fotoalbum",
    is_root: true,
    schema: {
      title: {
        type: "text",
        pos: 10,
        required: true
      },
      seo_title: {
        type: "text",
        pos: 20
      },
      seo_description: {
        type: "textarea",
        pos: 30
      },
      introduction: {
        type: "textarea",
        pos: 40
      },
      google_photos_url: {
        type: "text",
        pos: 50,
        required: true
      },
      cover_image_url: {
        type: "text",
        pos: 60
      }
    }
  },
  {
    name: "site_settings",
    display_name: "Site instellingen",
    is_root: true,
    schema: {
      site_name: {
        type: "text",
        pos: 10,
        required: true
      },
      site_tagline: {
        type: "text",
        pos: 20
      },
      logo_url: {
        type: "text",
        pos: 25
      },
      navigation: {
        type: "bloks",
        pos: 30
      },
      footer_note: {
        type: "text",
        pos: 40
      },
      address: {
        type: "textarea",
        pos: 50
      },
      email: {
        type: "text",
        pos: 60
      },
      phone: {
        type: "text",
        pos: 70
      },
      company_number: {
        type: "text",
        pos: 80
      }
    }
  },
  {
    name: "hero",
    display_name: "Hero",
    is_nestable: true,
    schema: {
      eyebrow: {
        type: "text",
        pos: 10
      },
      title: {
        type: "text",
        pos: 20,
        required: true
      },
      intro: {
        type: "textarea",
        pos: 30
      },
      primary_label: {
        type: "text",
        pos: 40
      },
      primary_href: {
        type: "text",
        pos: 50
      },
      secondary_label: {
        type: "text",
        pos: 60
      },
      secondary_href: {
        type: "text",
        pos: 70
      },
      supporting_note: {
        type: "textarea",
        pos: 80
      },
      image_url: {
        type: "text",
        pos: 90
      },
      image_alt: {
        type: "text",
        pos: 100
      },
      show_logo: {
        type: "boolean",
        pos: 110
      }
    }
  },
  {
    name: "rich_text_section",
    display_name: "Rich text sectie",
    is_nestable: true,
    schema: {
      eyebrow: {
        type: "text",
        pos: 10
      },
      title: {
        type: "text",
        pos: 20,
        required: true
      },
      intro: {
        type: "textarea",
        pos: 30
      },
      content: {
        type: "richtext",
        pos: 40
      }
    }
  },
  {
    name: "split_feature",
    display_name: "Split feature",
    is_nestable: true,
    schema: {
      eyebrow: {
        type: "text",
        pos: 10
      },
      title: {
        type: "text",
        pos: 20,
        required: true
      },
      intro: {
        type: "textarea",
        pos: 30
      },
      body: {
        type: "richtext",
        pos: 40
      },
      image_url: {
        type: "text",
        pos: 50
      },
      image_left: {
        type: "boolean",
        pos: 60
      }
    }
  },
  {
    name: "cta_band",
    display_name: "CTA band",
    is_nestable: true,
    schema: {
      eyebrow: {
        type: "text",
        pos: 10
      },
      title: {
        type: "text",
        pos: 20,
        required: true
      },
      text: {
        type: "textarea",
        pos: 30
      },
      primary_label: {
        type: "text",
        pos: 40
      },
      primary_href: {
        type: "text",
        pos: 50
      }
    }
  },
  {
    name: "events_list",
    display_name: "Events lijst",
    is_nestable: true,
    schema: {
      eyebrow: {
        type: "text",
        pos: 10
      },
      title: {
        type: "text",
        pos: 20,
        required: true
      },
      intro: {
        type: "textarea",
        pos: 30
      },
      limit: {
        type: "number",
        pos: 40
      },
      include_past: {
        type: "boolean",
        pos: 50
      }
    }
  },
  {
    name: "photo_album_grid",
    display_name: "Fotoalbum overzicht",
    is_nestable: true,
    schema: {
      eyebrow: {
        type: "text",
        pos: 10
      },
      title: {
        type: "text",
        pos: 20,
        required: true
      },
      intro: {
        type: "textarea",
        pos: 30
      },
      limit: {
        type: "number",
        pos: 40
      }
    }
  },
  {
    name: "newsletter_embed",
    display_name: "Nieuwsbrief embed",
    is_nestable: true,
    schema: {
      eyebrow: {
        type: "text",
        pos: 10
      },
      title: {
        type: "text",
        pos: 20,
        required: true
      },
      intro: {
        type: "textarea",
        pos: 30
      },
      embed_html: {
        type: "textarea",
        pos: 40
      }
    }
  },
  {
    name: "contact_panel",
    display_name: "Contact blok",
    is_nestable: true,
    schema: {
      title: {
        type: "text",
        pos: 10,
        required: true
      },
      intro: {
        type: "textarea",
        pos: 20
      },
      address: {
        type: "textarea",
        pos: 30
      },
      email: {
        type: "text",
        pos: 40
      },
      phone: {
        type: "text",
        pos: 50
      }
    }
  },
  {
    name: "navigation_item",
    display_name: "Navigatie item",
    is_nestable: true,
    schema: {
      label: {
        type: "text",
        pos: 10,
        required: true
      },
      href: {
        type: "text",
        pos: 20,
        required: true
      },
      new_tab: {
        type: "boolean",
        pos: 30
      }
    }
  }
];

function navItem(label, href) {
  return {
    component: "navigation_item",
    label,
    href
  };
}

function richTextParagraph(text) {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text
          }
        ]
      }
    ]
  };
}

export const FOLDERS = [
  {
    name: "Instellingen",
    slug: "instellingen"
  },
  {
    name: "Activiteiten",
    slug: "activiteiten"
  },
  {
    name: "Foto albums",
    slug: "foto-albums"
  }
];

export const STARTER_STORIES = [
  {
    name: "Home",
    slug: "home",
    content: {
      component: "page",
      title: "Klareputhoevevrienden",
      seo_title: "Klareputhoevevrienden vzw",
      seo_description:
        "Activiteiten, fotoalbums en verenigingsnieuws van De Klareputhoevevrienden.",
      body: [
        {
          component: "hero",
          eyebrow: "De Klareputhoevevrienden vzw",
          title: "Een moderne thuisbasis voor tractoren, tradities en ontmoetingen.",
          intro:
            "Bouw pagina's visueel op, beheer events centraal en hou foto's extern op Google Photos.",
          primary_label: "Bekijk de agenda",
          primary_href: "/agenda",
          secondary_label: "Ontdek de foto's",
          secondary_href: "/fotos",
          show_logo: true,
          supporting_note:
            "Vervang deze starterinhoud in Storyblok door jullie eigen teksten, acties en context."
        },
        {
          component: "events_list",
          eyebrow: "Agenda",
          title: "Komende activiteiten",
          intro: "Nieuwe events kunnen manueel of via Excel/CSV-import toegevoegd worden.",
          limit: 4,
          include_past: false
        },
        {
          component: "photo_album_grid",
          eyebrow: "Foto's",
          title: "Albumoverzicht met doorklik naar Google Photos",
          intro:
            "Foto's blijven extern gehost. De site houdt de context, covers en navigatie compact."
        },
        {
          component: "newsletter_embed",
          eyebrow: "Nieuwsbrief",
          title: "Schrijf je in via Mailchimp",
          intro:
            "Voeg hier de embedcode van Mailchimp toe zodra die beschikbaar is."
        }
      ]
    }
  },
  {
    name: "Agenda",
    slug: "agenda",
    content: {
      component: "page",
      title: "Agenda",
      seo_title: "Agenda | Klareputhoevevrienden",
      seo_description: "Publiek overzicht van geplande activiteiten.",
      body: [
        {
          component: "hero",
          eyebrow: "Agenda",
          title: "Alle activiteiten op één plek",
          intro:
            "Gebruik deze pagina voor het publiek overzicht en laat events in de map 'activiteiten' beheren."
        },
        {
          component: "events_list",
          eyebrow: "Kalender",
          title: "Geplande activiteiten",
          intro: "Datum, locatie en korte omschrijving worden automatisch getoond.",
          limit: 12,
          include_past: false
        }
      ]
    }
  },
  {
    name: "Foto's",
    slug: "fotos",
    content: {
      component: "page",
      title: "Foto's",
      seo_title: "Fotoalbums | Klareputhoevevrienden",
      seo_description: "Overzichtspagina voor fotoalbums.",
      body: [
        {
          component: "hero",
          eyebrow: "Fotoalbums",
          title: "Herbeleef rondritten, ontmoetingen en demonstraties",
          intro:
            "Maak per Google Photos-album een inhoudspagina aan in Storyblok en laat bezoekers van hieruit doorklikken."
        },
        {
          component: "photo_album_grid",
          eyebrow: "Albums",
          title: "Beschikbare albums",
          intro: "De foto's blijven extern gehost."
        }
      ]
    }
  },
  {
    name: "Over ons",
    slug: "over-ons",
    content: {
      component: "page",
      title: "Over ons",
      seo_title: "Over ons | Klareputhoevevrienden",
      seo_description: "Starterpagina met verenigingsinformatie.",
      body: [
        {
          component: "hero",
          eyebrow: "Over de vereniging",
          title: "Traditie en ontmoeting rond landbouw-erfgoed",
          intro:
            "Gebruik deze starterpagina om jullie verhaal, missie en werking te beschrijven."
        },
        {
          component: "rich_text_section",
          eyebrow: "Vereniging",
          title: "Een duidelijke structuur voor inhoud",
          content: richTextParagraph(
            "Pagina's bestaan uit herbruikbare bouwblokken. Daardoor blijft de site beheersbaar zonder telkens code te moeten aanpassen."
          )
        }
      ]
    }
  },
  {
    name: "Contact",
    slug: "contact",
    content: {
      component: "page",
      title: "Contact",
      seo_title: "Contact | Klareputhoevevrienden",
      seo_description: "Contactgegevens en nieuwsbriefinschrijving.",
      body: [
        {
          component: "contact_panel",
          title: "Algemene contactgegevens",
          intro: "Pas deze gegevens aan in Storyblok.",
          address: "Prof-Dewulfstraat 122\n8970 Poperinge",
          email: "info@klareputhoevevrienden.be",
          phone: "0475 62 48 86"
        },
        {
          component: "newsletter_embed",
          eyebrow: "Nieuwsbrief",
          title: "Mailchimp-inschrijving",
          intro: "Vervang de placeholder door de echte Mailchimp embedcode."
        }
      ]
    }
  },
  {
    name: "Site settings",
    slug: "site-settings",
    parent_folder_slug: "instellingen",
    content: {
      component: "site_settings",
      site_name: "Klareputhoevevrienden",
      site_tagline: "Activiteiten, foto's en verenigingsnieuws",
      logo_url:
        "https://www.klareputhoevevrienden.be/wp-content/uploads/2021/07/Logo_Klareputhoevevrienden_-kopie.jpeg",
      navigation: [
        navItem("Home", "/"),
        navItem("Activiteiten", "/agenda"),
        navItem("Foto's", "/fotos"),
        navItem("Over ons", "/over-ons"),
        navItem("Contact", "/contact")
      ],
      footer_note: "Klareputhoevevrienden vzw",
      address: "Prof-Dewulfstraat 122\n8970 Poperinge",
      email: "info@klareputhoevevrienden.be",
      phone: "0475 62 48 86",
      company_number: "0845.617.294"
    }
  }
];
