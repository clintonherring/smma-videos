<!-- smma-videos:template — the define-brand guide replaces this file and removes this line -->
# Brand

Filled by `define-brand`, from the site's CSS (custom properties, most-used colours, loaded fonts) or from supplied files. Needs `profile.md`. Feeds every build: captions, text scenes, poster. Without it a build falls back to defaults that look like no one's.

## Colours

Exact values. Contrast is checked at build (`hyperframes check` fails real text under WCAG AA).

| Role | Value | Where it came from |
|---|---|---|
| Background | [Owner] | |
| Text | [Owner] | |
| Accent | [Owner] | |
| Secondary / muted | | |
| Caption background (if any) | | |

## Fonts

| Role | Font | Fallback | Source (file / Google Fonts / system) |
|---|---|---|---|
| Display | [Owner] | | |
| Body / captions | [Owner] | | |

## Logo

| | |
|---|---|
| File | [Owner] `assets/logo.*` (SVG or PNG with transparency) |
| Clear space / minimum size | |
| Where it may appear | end card; corner mark; never over the hook frame |

## Captions

Burned in, always (most shorts are watched on mute).

| | |
|---|---|
| Position | [Owner] lower third / centre-safe |
| Style | font, size, colour, background or outline |
| Max words per caption | ~6–8 |

## Text scenes

How on-screen text looks when it stands in for a shot (`strategy/11-text-scenes.md`). Not slides.

| | |
|---|---|
| Background treatment | [Owner] solid brand colour / brand gradient / blurred brand image |
| Type scale | display size for the one line; secondary size for the support line |
| Motion | fast-in then hold; counters for numbers; one line at a time |
| Accent use | one accent element per card (underline, number, pull-quote mark) |

## Format and safe zones

| | |
|---|---|
| Default format | 9:16, 1080×1920, 30 fps |
| Long form | 16:9, 1920×1080 |
| Safe zone | keep text inside the centre 80 % horizontally; avoid the bottom 15 % (platform UI) and top 10 % |

## Needs the owner

- Confirm colours and fonts if they were inferred from the site
- Logo file
