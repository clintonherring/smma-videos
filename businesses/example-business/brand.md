# Brand

Filled by `define-brand` from the site's CSS (custom properties `--ink`, `--paper`, `--brass`) and the logo file. Feeds every build: captions, text scenes, poster.

## Colours

Exact values. Contrast is checked at build (`hyperframes check` fails real text under WCAG AA).

| Role | Value | Where it came from |
|---|---|---|
| Background | `#10201c` (deep green-black, "ink") | site `--ink`; the shop's wall colour |
| Text | `#f3efe6` (warm off-white, "paper") | site `--paper` |
| Accent | `#e8a33d` (brass) | site `--brass`; the logo |
| Secondary / muted | `#9aa39f` | site body text on dark sections |
| Caption background (if any) | `rgba(16, 32, 28, 0.92)` (ink at 92 %) | chosen at build so captions pass contrast over footage |

## Fonts

| Role | Font | Fallback | Source (file / Google Fonts / system) |
|---|---|---|---|
| Display | Inter, weight 700, tight tracking | ui-sans-serif, system-ui | Google Fonts |
| Body / captions | Inter, weight 400–600 | ui-sans-serif, system-ui | Google Fonts |

## Logo

| | |
|---|---|
| File | `assets/images/logo.png` (A03; 400×400, transparent; "NCR" in brass) |
| Clear space / minimum size | one letter height around; never under 120 px on a 1080 canvas |
| Where it may appear | end card (CTA) bottom right; never over the hook frame; never on a how-to step |

## Captions

Burned in, always (most shorts are watched on mute).

| | |
|---|---|
| Position | lower third, bottom edge at 420 px from the bottom on 1080×1920 (above the platform UI) |
| Style | Inter 600, 56 px, `#ffffff` on the ink pill (24 × 32 px padding, 16 px radius); the stated rule gets a brass left border |
| Max words per caption | 6–8 |

## Text scenes

How on-screen text looks when it stands in for a shot (`strategy/11-text-scenes.md`). Not slides.

| | |
|---|---|
| Background treatment | solid ink; over a dimmed still when a real thing exists for the card |
| Type scale | display 96 px for the one line; support 44 px; kicker 40 px uppercase in brass |
| Motion | fast-in then hold; step cards slide in from the right; the result slams; CTA fades |
| Accent use | one brass element per card: the short rule above the line, or the kicker |
| Alignment | left, like the site |

## Format and safe zones

| | |
|---|---|
| Default format | 9:16, 1080×1920, 30 fps |
| Long form | 16:9, 1920×1080 |
| Safe zone | keep text inside the centre 80 % horizontally; avoid the bottom 15 % (platform UI) and top 10 % |

## Needs the owner

- none
