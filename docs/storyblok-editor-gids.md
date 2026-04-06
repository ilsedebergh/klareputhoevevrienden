# Storyblok Editor Gids

Deze website is opgezet zodat een redacteur zonder code of terminal de inhoud kan beheren in Storyblok.

## 1. Eenmalige technische setup

Zet deze variabelen in Vercel en lokaal in `.env.local`:

```txt
NEXT_PUBLIC_SITE_URL=https://klareputhoevevriendentest.vercel.app
NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN=<preview-token>
NEXT_PUBLIC_STORYBLOK_REGION=eu
STORYBLOK_SPACE_ID=<space-id>
STORYBLOK_MANAGEMENT_TOKEN=<management-token>
STORYBLOK_PREVIEW_SECRET=<lange-unieke-string>
```

Voer daarna eenmalig uit:

```bash
npm run bootstrap:cms
```

Dat maakt in Storyblok automatisch de contenttypes, folders en startpagina's aan.

## 2. Storyblok preview instellen

Gebruik in Storyblok als preview-basis deze URL:

```txt
https://klareputhoevevriendentest.vercel.app/preview/<STORYBLOK_PREVIEW_SECRET>?slug={{story.full_slug}}
```

Voorbeeld:

```txt
https://klareputhoevevriendentest.vercel.app/preview/mijn-geheime-preview-sleutel?slug={{story.full_slug}}
```

De preview-route zet de site in draft-modus en stuurt daarna door naar de gevraagde Storyblok-pagina, zodat niet-gepubliceerde wijzigingen zichtbaar zijn in de editor.

## 3. Wat een redacteur in Storyblok ziet

De inhoud is opgesplitst in:

- `home`, `agenda`, `fotos`, `over-ons`, `contact`
- `instellingen/site-settings`
- map `activiteiten`
- map `foto-albums`

## 4. Gewone pagina's beheren

Open een pagina van type `Pagina`.

In het veld `body` kan de redacteur blokken toevoegen, verplaatsen en verwijderen.

Beschikbare blokken:

- `Hero`
- `Rich text sectie`
- `Split feature`
- `CTA band`
- `Events lijst`
- `Fotoalbum overzicht`
- `Nieuwsbrief embed`
- `Contact panel`

## 5. Activiteiten beheren

Maak in de map `activiteiten` een nieuwe story van type `Event`.

Belangrijkste velden:

- `title`
- `date`
- `location`
- `excerpt`
- `contact_details`
- `registration_url`

Events worden op de website automatisch op datum gesorteerd.

## 6. Fotoalbums beheren

Maak in de map `foto-albums` een nieuwe story van type `Fotoalbum`.

Belangrijkste velden:

- `title`
- `introduction`
- `google_photos_url`
- `cover_image_url`

De pagina `Foto's` toont deze albums als overzicht. Een klik opent rechtstreeks Google Photos.

## 7. Navigatie en footer beheren

Open `instellingen/site-settings`.

Daar kan de redacteur aanpassen:

- sitenaam
- tagline
- logo-URL
- navigatie
- footertekst
- adres
- e-mail
- telefoon

## 8. Praktische workflow voor redacteurs

1. Log in op Storyblok.
2. Open de juiste pagina of map.
3. Pas de inhoud aan in het formulier of in de blokkenlijst.
4. Controleer de preview.
5. Klik op `Publish`.

## 9. Belangrijke opmerking

De website werkt ook zonder Storyblok-tokens door terug te vallen op lokale voorbeeldinhoud. Voor echte redactie in de Storyblok UI moeten de tokens en preview-secret wel ingevuld zijn.
