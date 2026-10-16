# Composition brief — V07 Sunday chain checks

Written by `build-video` before the composition was created. Compare with `../V03-chain-wear-check/composition-brief.md`: same business, same brand, same sub-compositions; a different type and therefore a different contract.

## Objective

One launch short for Northside Cycle Repair, from the approved brief at `brief.md`. One idea: from 4 October a chain check is free with any service on Sunday mornings; you see the number, you keep the cassette. Feeling at the end: welcome.

## Output

- Composition directory: `videos/V07-sunday-chain-check/composition/`
- Rendered video: `output/V07.mp4` · Poster: `output/V07.jpg` (frame 0) · Caption: `output/caption.txt`
- Format: 9:16 1080×1920 at 30 fps · Duration: 18.8 s

## Source material (by asset ID)

| Asset | File | Use | In / out | Treatment |
|---|---|---|---|---|
| A02 | `assets/A02.mp4` | scene 2, the one real visual | 0:00–0:03.5 | as shot; caption pill with the name |
| A03 | `assets/A03.png` | scene 4 corner mark | still | 160 px bottom right |
| — | brand.md | scenes 1, 3a–c, 4 | | text scenes via `compositions/text-scene.html` |

Copy that must appear verbatim (from `facts.md`): "Free with any service"; "ten till one"; "one bike per visit"; "about thirty seconds"; "from €25, fitted". Nothing on screen that is not in `facts.md`. People in frame: hands only.

## Type profile (from `build-video/type-profiles.md`)

- Type: launch
- Beats and holds: 4 beats (6 blocks); text-forward; the hook card holds longest; highlight cards each at the floor
- Transition vocabulary: hard cut from the hook to the real visual; clean slides between cards; slam for the punchline
- Caption style: one caption only (the name on the reveal), ink pill
- Text scenes: the centrepiece; hook `type`, highlights `slide` sequential, punchline `slam`
- Narration: captions only
- Music: none (no owner-supplied licensed bed)

## Visual identity (from `brand.md`)

As V03: ink `#10201c`, paper `#f3efe6`, brass `#e8a33d`; Inter; logo end card only; safe zones top 10 % / bottom 15 %.

## Storyboard (the contract)

0–3.5 hook card · 3.5–7 reveal (A02 + name caption) · 7–9.6 highlight 1 · 9.6–12.6 highlight 2 · 12.6–15.6 highlight 3 · 15.6–18.8 punchline + logo. See `brief.md`.

## Gap decisions applied

None; no gaps.

## Reading floor

Hook 2.2 s settled after the type-on (7 words = 2.1); name caption 3.2 s (8 words); highlights 2.15 / 2.55 / 2.55 s (7, 7, 8 words); punchline 2.8 s (6 words + 0.5). All at or above the floor.

## Poster

Scene 1 at 2.6 s: the hook fully typed on, settled. Confirmed after render.

## Hyperframes instructions

As V03. Cards that slide off canvas are marked `data-layout-allow-overflow`. `npx hyperframes check` then `render --quality high --output ../output/V07.mp4`, then `npx smma-videos poster output/V07.mp4 2.6`.
