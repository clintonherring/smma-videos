# Composition brief — V03 Check your chain before it costs you a cassette

Written by `build-video` before the composition was created. This brief is the boundary: the idea, lines, type, assets and moments are decided here; HTML structure and animation mechanics inside the storyboard's windows are Hyperframes' to decide.

## Objective

One how-to short for Northside Cycle Repair, built from the approved brief at `brief.md`. One idea: a chain is a wear item; measure it, replace it at 0.5 %, and the cassette lasts about three chains instead of one. Feeling at the end: capable.

## Output

- Composition directory: `videos/V03-chain-wear-check/composition/`
- Rendered video: `videos/V03-chain-wear-check/output/V03.mp4`
- Poster: `output/V03.jpg`, baked as frame 0
- Caption: `output/caption.txt`
- Format: 9:16 1080×1920 at 30 fps
- Duration: 34 s (storyboard total)

## Source material (by asset ID)

| Asset | File | Use | In / out | Treatment |
|---|---|---|---|---|
| A02 | `assets/A02.mp4` | scene 1 hook; scene 4a; scene 4c | 0:00–0:04; 0:00–0:04; 0:01–0:04 | as shot, cover; caption pill lower third |
| A01 | `assets/A01.mp4` | scene 2 signature | 0:00–0:03 | as shot, own audio |
| A05 | `assets/A05.mp4` | scene 5 | 0:00–0:05 | as shot |
| A03 | `assets/A03.png` | scene 7 corner mark | still | 160 px, bottom right inside the safe zone |
| — | brand.md | scenes 3, 4b, 6, 7 | | text scenes via `compositions/text-scene.html` |

Copy that must appear verbatim (from `facts.md` / `voice.md`): "I fix bikes for a living. Probably yours."; "0.5 %" / "0.75 %"; "about three chains per cassette"; "Chain from €25. Cassette from €45."
Nothing on screen that is not in `facts.md`. People in frame: Jonas (own footage); hands only elsewhere.

## Type profile (from `build-video/type-profiles.md`)

- Type: how-to
- Beats and holds: 7 scenes; comfortable; the step on screen holds until the viewer could do it
- Transition vocabulary: soft cut; match cut into the hands; step card slides in from the step's side and out again
- Caption style: every spoken line over footage as an ink pill; the rule once as a card instead of a caption
- Text scenes: role frame around the step (3, 4b), result (6), CTA (7); entrances slide / slide / slam / fade
- Narration: Jonas on camera for the signature; narrated over A02 and A05
- Music: none

## Visual identity (from `brand.md`)

- Background: `#10201c` · Text: `#f3efe6` · Accent: `#e8a33d`
- Display font: Inter 700 · Body font: Inter 400–600 (Google Fonts)
- Logo: `assets/A03.png`; end card only, bottom right
- Safe zones: top 10 %, bottom 15 %, centre 80 % horizontally
- Caption style: Inter 600 56 px white on ink at 92 %, 24 × 32 px padding, 16 px radius, bottom edge 420 px from the bottom

## Storyboard (the contract)

See `brief.md` "Storyboard": 9 blocks, 34 s. Windows: 0–4 hook (A02) · 4–7 signature (A01) · 7–11 rule card · 11–15 gauge in (A02) · 15–18 step card · 18–21 three places (A02 from 0:01) · 21–26 worn cassette (A05) · 26–30 result card · 30–34 CTA card + logo.

## Gap decisions applied

| Scene | Decision | How it is built |
|---|---|---|
| 5 | D (arrived as A05) | real footage, two captions |
| 5 (variant only) | A | `variants/gap-a.html`: `compositions/placeholder.html` with `{"shot":"worn cassette, close, 5 s","gap":"5"}` — not for publishing |
| 5 (variant only) | B | `variants/gap-b.html`: text scene "Past 0.75 % the teeth have reshaped." / "New chain on that? It skips." fade, 5 s |

## Reading floor

Hook captions 1.6 s and 1.8 s (6 and 4 words); signature 2.7 s (8 words); rule card 3.3 s; gauge caption 3.7 s (9 words); step card 2.6 s (7 words + 0.5); three places 2.7 s; cassette captions 2.2 s each; result card 3.4 s; CTA card 3.3 s. All at or above the floor. The hook caption holds longest relative to its length.

## Poster

Candidate settled moment: scene 1 at 1.2 s (hook caption fully in over the gauge). Confirmed after render.

## Hyperframes instructions

Load the Hyperframes composition skills that ship with the installed CLI. Build from this brief and `brief.md`; do not run the Hyperframes intent interview or its promo workflow. Requirements:

- Use the real assets by path; trim with `data-media-start` / `data-duration`; never stretch.
- Captions burned in for every spoken line over footage, in the brand's caption style (`caption.css`), inside the safe zones; none stacked on a text scene.
- Text scenes via `compositions/text-scene.html` exactly as specified; the placeholder variant via `compositions/placeholder.html`.
- Keep every readable element at or above its settled hold.
- `npx hyperframes check` is the single gate before render; fix every error including contrast, inside the brand palette.
- Render to `output/V03.mp4`; then `npx smma-videos poster output/V03.mp4 1.2`.
- Keep creation and rendering local.
