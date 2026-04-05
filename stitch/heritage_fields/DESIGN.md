# Design System: Heritage Modernist

## 1. Overview & Creative North Star
The "Heritage Modernist" approach reimagines the rural tractor club not as a dusty archive, but as a premium digital gallery. Our Creative North Star is **"The Pastoral Curator."** We move away from the traditional "bulletin board" layout toward a high-end editorial experience that treats heavy machinery with the reverence of fine art.

This system breaks the generic grid through **intentional asymmetry**. Expect large-scale typography to bleed into margins and images to overlap container boundaries. We avoid the "boxed-in" feel of standard templates, instead using breathing room and tonal depth to create a welcoming, professional atmosphere that feels both grounded and sophisticated.

## 2. Colors & Surface Philosophy
The palette is rooted in a "Deep Earth" primary green and "Harvest Sun" secondary yellow, balanced by a sophisticated range of neutral stone and clay tones.

### The "No-Line" Rule
To achieve a high-end feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined strictly through background color shifts or subtle tonal transitions.
- Use `surface-container-low` sections against a `background` base to define content areas.
- Create rhythm through contrast: a `primary` (Deep Green) section followed immediately by a `surface-bright` section.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of premium paper. Depth is achieved by stacking:
- **Level 0 (Base):** `background` (#fbf9f8)
- **Level 1 (Sub-section):** `surface-container-low` (#f6f3f2)
- **Level 2 (Cards/Promos):** `surface-container-lowest` (#ffffff)
- **Level 3 (Interactive/Floating):** Glassmorphism (see below).

### The "Glass & Gradient" Rule
To add visual "soul" and avoid a flat, industrial feel:
- **Hero Transitions:** Use a subtle linear gradient from `primary` (#163b17) to `primary-container` (#2d522c) at a 135-degree angle.
- **Glassmorphism:** For navigation bars or floating labels, use a 60% opacity version of `surface` with a 12px `backdrop-blur`.

## 3. Typography
We utilize a high-contrast pairing to bridge the gap between heritage and modernity.

*   **Display & Headlines (Plus Jakarta Sans):** A contemporary sans-serif with geometric leanings. This provides the "Modern" feel requested. Use `display-lg` for hero statements with tight letter-spacing (-0.02em) to evoke an editorial magazine aesthetic.
*   **Body & Labels (Inter):** A workhorse typeface chosen for maximum legibility. Inter provides the "Professional" grounding.
*   **Hierarchy as Identity:** Large, bold headlines in `on_surface` convey authority, while `label-md` in `secondary` (Harvest Sun) acts as an accent for "New" tags or category markers, adding a welcoming pop of color.

## 4. Elevation & Depth
Elevation is a matter of **Tonal Layering**, not structural lines.

*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   *Spec:* `0px 12px 32px rgba(27, 28, 28, 0.06)`. This mimics soft, natural daylight.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.
*   **Glassmorphism Depth:** When a card needs to feel "above" a photograph, use a semi-transparent `surface_container_lowest` with a blur. This allows the tractor’s mechanical details to subtly bleed through, integrating the UI with the imagery.

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on_primary` text. Use `xl` (1.5rem) roundedness for a modern, approachable feel.
*   **Secondary:** `secondary_container` background. This is our "Harvest Sun" accent. Use sparingly for high-conversion actions like "Word Lid" (Join Us).
*   **Tertiary:** No background. Use `primary` text with a subtle `surface-variant` underline that expands on hover.

### Cards & Lists
*   **The Divider Forbid:** Horizontal lines between list items are prohibited. Use `2rem` (32px) of vertical whitespace to separate content. 
*   **Card Style:** Use `surface-container-lowest` on a `surface-container-low` background. Use a "Soft Lift" on hover by shifting the background to `surface-bright`.

### Input Fields
*   **Modern Field:** A flat `surface-container-high` background with a `sm` (0.25rem) corner radius. On focus, use a `primary` (2px) bottom-border only.

### Signature Component: The "Heritage Badge"
*   For event dates or tractor years, use a `secondary_fixed` background with `on_secondary_fixed` text, using `full` roundedness. These act as high-visibility "stamps" on the page.

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical image placement. Let a tractor photo overlap two different background color sections.
*   **Do** use `display-lg` for short, punchy titles.
*   **Do** prioritize high-quality, high-resolution photography of vintage tractors as the primary "texture" of the site.

### Don't:
*   **Don't** use standard "Box Shadows" (0, 2, 4). They look dated and cheap. 
*   **Don't** use the `secondary` yellow for large text blocks; it is strictly an accent color for labels, buttons, and highlights.
*   **Don't** cram content. If a section feels full, double the whitespace. The "High-Quality" feel depends on the user's ability to focus on one element at a time.
*   **Don't** use vertical dividers. Let the typography and the "No-Line" background shifts do the organizational work.