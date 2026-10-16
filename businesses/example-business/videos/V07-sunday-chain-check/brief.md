# V07 Sunday chain checks: free with any service, from October

Status: `built` (2026-09-26). The type test for the example: a **launch** built from the same assets as V03 (how-to), so the two skeletons, pacings and text-scene roles can be compared side by side (`composition/index.html` here against `../V03-chain-wear-check/composition/index.html`).

## Brief summary (approved 2026-09-25)

```
BRIEF SUMMARY — V07 Sunday chain checks

Type · Viewer                launch · Mara, who has a bike that "probably needs looking at" and has never been in
One idea                     From 4 October, a chain check is free with any service on Sunday mornings; you see the number, you keep the cassette.
Default                      none: a date and an offer
Feeling                      Welcome: "I can just turn up with it."
Hook (chosen)                "Sunday chain checks. Free with any service." — first frame: the hook card (type-on), no footage of a Sunday exists yet
  alternates                 "What happens if I just turn up on a Sunday?" (question)
Signature                    none (launch; the name is on the reveal)
CTA (one ask)                "Bring the bike." → northsidecycles.example/book?from=V07
Format · est. length         short 9:16 · ~19 s
Who speaks                   captions only (launch default); no narration
Why now                      Come in · October launch slot · phase 1 · Instagram and TikTok only (not the groups: it is an offer) · assets have
Facts to confirm             none (#8 Sundays 10:00–13:00, one bike, check only; #5 about thirty seconds; chain from €25; #3 the cassette)
Still open                   nothing

Approve, or tell me what to change.
```

## Asset map

| # | Scene | Needs | Have | Status |
|---|---|---|---|---|
| 1 | hook card | nothing (text scene is the launch centrepiece) | brand.md | have (text scene) |
| 2 | reveal: the name and the one real visual | the gauge in a chain | A02 0:00–0:03.5 | have |
| 3 | highlight cards ×3 | nothing | brand.md | have (text scenes) |
| 4 | punchline + CTA | end card | brand.md + A03 | have (text scene) |

Must be real for a launch: scene 2, the one real visual (have).
Buildable now: yes.

## Gap decisions

| Gap | Scene | Decision | Note |
|---|---|---|---|
| — | — | — | no gaps |

## Details

| | |
|---|---|
| Type | launch |
| Format | short (9:16, 18.8 s) |
| Audience | Mara; the hallway-bike owner |
| Pillar | Come in |
| Slot | October launch (publish 2026-10-01, again 2026-10-03) |
| Phase | 1 |
| Series | standalone (pairs later with an invitation short once the Sundays have run) |
| Distribution | Instagram · also: TikTok same cut · shared by: Jonas only (offers do not go into the groups) |
| Seed | none; the news post |
| Source | news post 2026-09 (S03); prices (S02) |
| Who is in frame | hands only (A02) |

## Storyboard

Type: `launch` · Format: `9:16 short` · Target length: `18.8 s` · Who speaks: `captions only`

```
### Scene 1 — hook card — 3.5 s (0–3.5)
On screen:          text scene, type-on, holds longest
Spoken / narrated:  —
Caption (must read):— (the card)
Text scene:         kicker FROM 4 OCTOBER · line "Sunday chain checks. Free with any service." · type
Settled hold:       2.2 s after the type-on completes (floor: ok; 7 words = 2.1)
Flow beat:          entry
Sequential:         the line typing on
Transition →:       hard cut to the real visual

### Scene 2 — reveal: name + the one real visual — 3.5 s (3.5–7)
On screen:          A02 0:00–0:03.5
Spoken / narrated:  —
Caption (must read):"Northside Cycle Repair. Sundays, ten till one."
Text scene:         —
Settled hold:       3.2 s (floor: ok; 8 words = 2.4)
Flow beat:          key action (the gauge going in)
Sequential:         none
Transition →:       slide

### Scene 3a — highlight 1 — 2.6 s (7–9.6)
Text scene:         kicker 1 · line "About thirty seconds. One bike per visit." · slide
Settled hold:       2.15 s (floor: ok; 7 words = 2.1; window lengthened from 2.3 s)
Transition →:       slide

### Scene 3b — highlight 2 — 3 s (9.6–12.6)
Text scene:         kicker 2 · line "You see the number on the gauge." · slide
Settled hold:       2.55 s (floor: ok; 7 words = 2.1)
Transition →:       slide

### Scene 3c — highlight 3 — 3 s (12.6–15.6)
Text scene:         kicker 3 · line "Chain from €25, fitted, if it needs one." · slide
Settled hold:       2.55 s (floor: ok; 8 words = 2.4)
Transition →:       hard cut

### Scene 4 — punchline + CTA — 3.2 s (15.6–18.8)
On screen:          text scene + A03 logo
Text scene:         line "Bring the bike. Keep the cassette." · support "northsidecycles.example/book" · slam
Settled hold:       2.8 s (floor: ok; 6 words + 0.5 = 2.3)
Flow beat:          result
Transition →:       end
```

### Totals

| | |
|---|---|
| Scenes | 4 (6 blocks) |
| Sum of durations | 18.8 s (target: ~18 s) |
| Lines below the reading floor | none |
| Scenes with GAP | none |
| Must-be-real scenes that are not real footage | none |
| Poster candidate | scene 1 at 2.6 s (hook fully typed, settled) |

## Text scenes

The launch is the one type where text scenes are the centrepiece (`strategy/08-video-types.md`). Hook `type`; highlights `slide` in sequence, each held at the floor; punchline `slam`. Compare V03, where the cards frame the real step and the footage carries the video.

## Publish

```
PUBLISH — V07
Caption          Sunday chain checks. Free with any service, from 4 October.
                 Ten till one, one bike per visit, about thirty seconds. You see the number on the gauge; if the chain needs replacing it's from €25 fitted, and you keep the cassette.
                 Bring the bike. Booking link in bio.
Hashtags         #northside #fietsonderhoud #ketting #sunday
Poster           scene 1 at 2.6 s; baked as frame 0
Distribution     Instagram · also: TikTok · shared by: Jonas
Set              —
Log              PERFORMANCE.md rows: Instagram, TikTok
```

## Checks

- Delivery checklist: n/a (captions only).
- Pre-publish checklist (`strategy/07-edit-fundamentals.md`): ticked; the launch exception for text-forward applies; one real visual present.

## Build log

- 2026-09-26 · `composition/` from the same `hyperframes init`; A02 and A03 copied by ID; `text-scene.html` and `caption.css` copied from the skill.
- `npx hyperframes check`: passed (lint 0, contrast 38/38). Highlight cards that slide off canvas carry `data-layout-allow-overflow`.
- `npx hyperframes render --quality high --output ../output/V07.mp4`: 18.8 s, 1080×1920, 30 fps, 564 frames.
- Poster: `npx smma-videos poster output/V07.mp4 2.6`.
- Deviations: highlight 1 window lengthened from 2.3 s to 2.6 s so the line reaches the floor (total 18.8 s, not 18.5 s).
