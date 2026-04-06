# Klareputhoevevrienden

Next.js-website met Storyblok als visueel CMS, een eventmodule, fotoalbum-overzicht en Mailchimp-embedondersteuning.

## Stack

- Next.js App Router
- Storyblok visual editor en content delivery API
- Component-based pagebuilder met herbruikbare blokken
- Eventimport via Excel/CSV

## Lokale start

1. Installeer dependencies:

   ```bash
   npm install
   ```

2. Maak een `.env.local` op basis van `.env.example`.

3. Start de site lokaal:

   ```bash
   npm run dev
   ```

Als er nog geen Storyblok-token is ingesteld, gebruikt de site lokale fallback-inhoud zodat frontendontwikkeling meteen werkt.

## Storyblok instellen

1. Maak een nieuwe Storyblok space aan.
2. Vul in `.env.local` deze waarden in:

   ```bash
   NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN=...
   STORYBLOK_SPACE_ID=...
   STORYBLOK_MANAGEMENT_TOKEN=...
   STORYBLOK_PREVIEW_SECRET=...
   ```

3. Bootstrap componenten, folders en starterpagina's:

   ```bash
   npm run bootstrap:cms
   ```

De bootstrap maakt deze inhoudsstructuur aan:

- root pages: `home`, `agenda`, `fotos`, `over-ons`, `contact`
- folders: `instellingen`, `activiteiten`, `foto-albums`
- settings story: `instellingen/site-settings`

## Storyblok preview

Voor de visuele editor gebruikt deze site een beveiligde preview-route die draft-modus activeert en daarna doorstuurt naar de juiste pagina:

```txt
/preview/<STORYBLOK_PREVIEW_SECRET>?slug={{story.full_slug}}
```

Gebruik in Storyblok als preview-basis bijvoorbeeld:

```txt
https://jouwdomein.be/preview/<STORYBLOK_PREVIEW_SECRET>?slug={{story.full_slug}}
```

Een praktische editorhandleiding staat in `docs/storyblok-editor-gids.md`.

## Eventimport

Importeer activiteiten uit een Excel- of CSV-bestand:

```bash
npm run import:events -- ./pad/naar/events.xlsx
```

Standaard worden events gepubliceerd. Gebruik `--draft` om ze als draft aan te maken.

Ondersteunde kolommen:

- `titel` of `title`
- `datum` of `date`
- `locatie` of `location`
- `korte tekst`, `omschrijving`, `beschrijving`, `excerpt` of `tekst`

## Beheerafspraken

- Gebruik de `page` content type voor gewone pagina's en bouw de inhoud op via blokken.
- Voeg events toe in de map `activiteiten`.
- Voeg fotoalbums toe in de map `foto-albums` met een Google Photos-link.
- Plak de Mailchimp embedcode in een `newsletter_embed` blok.
- Laat `site_settings` in `instellingen/site-settings` de navigatie en footer beheren.
