---
name: define-brand
description: Guide that writes businesses/<slug>/brand.md: exact colours, fonts, logo path, caption style, text-scene style, default format and safe zones, inferred from the website's CSS (custom properties, most-used colours, loaded fonts) or taken from supplied brand files. Needed before any build; every text scene and caption is set in it. Use when the person says "brand", "colours", "fonts", "logo", "how should the text look", or when setup-business, readiness or build-video names brand as missing.
---

# Define the brand

Upstream: business (`profile.md`).
Downstream: build, text scenes, poster.
Why now: every text scene and caption is set in these; without them a build falls back to defaults that look like no one's.

Shared shape: `strategy/12-guides.md`. Where it is used: `strategy/11-text-scenes.md`, `build-video/text-scenes.md`.

## Before asking anything

1. `npx smma-videos readiness <slug>`. This guide needs only `profile.md` (for the site URL); if that is missing ask for the URL or the brand files directly and go on.
2. Read the site's CSS the way a launch-video tool would: `:root` custom properties (`--primary`, `--bg`, `--accent`, …); failing that, the most-used `background`, `color` and `border` values; `font-family` on `:root`/`body` and headings; Google Fonts links or `@import`s; the logo file linked in the header. Write down exact values and where each came from. Also look at how captions and headings sit on the site (left-aligned? all caps? pill backgrounds?).
   If there is no site: ask for brand files (a logo, a style guide, a few screenshots or photos of signage), or for two colours and a font the person already uses. If nothing exists, propose a restrained default pair and mark everything `[Owner]`.
3. Propose: "Background #…, text #…, accent #… from your CSS; display font X, body font Y; logo at /…; your headings are left-aligned sentence case, so text scenes will be too. Confirm or correct."
4. Check contrast of the text/background and accent/background pairs (WCAG AA for real text). If a pair fails, propose the nearest value inside the family and say so; `npx hyperframes check` will fail the build otherwise.

## Questions (two or three a turn)

- "Is the logo file I found the current one? SVG or transparent PNG preferred. Where may it appear: end card only, a corner mark, never over the hook?"
- "Captions: lower third with a dark pill, or clean text with an outline? About six to eight words per caption."
- "Text scenes: solid brand colour, a brand gradient, or over a blurred frame from the footage?" Show the three as one-line descriptions, not mockups.
- "Default format 9:16 at 1080×1920? Any channel that needs 1:1 or 16:9?"

## Write the file

`brand.md` with `## Colours` (role, value, where it came from), `## Fonts` (display, body, fallback, source), `## Logo` (file under `assets/`, clear space, where it may appear), `## Captions` (position, style, max words), `## Text scenes` (background treatment, type scale, motion, accent use), `## Format and safe zones`, `## Needs the owner`. Remove the template marker. Copy the logo into `assets/logo.*` and add an `A##` row in `assets/ASSETS.md` if the inventory exists. Inferred values are `[Owner]` until confirmed.

## Refine by correction

When the owner supplies the real brand file, replace the inferred values and say which changed. When a build's contrast check fails, update the value here, not in the composition only.

## Finish

- `npx smma-videos readiness <slug>`; show it.
- "Next: assets, because the gap report is the difference between what a video needs and what is here; drop your clips, images and screen recordings into `businesses/<slug>/assets/` and I'll inventory them."

## Do not

- Invent a palette for a business that has a site. Read the CSS.
- Approve a text/background pair that fails AA.
- Put the logo on the hook frame. The first frame is the viewer's moment.
