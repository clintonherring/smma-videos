# Sources: what was taken, adapted and left out

`smma-videos` is built from three places. None was adopted wholesale; each was read for the layer it is good at, and the kept parts were rewritten business-agnostic. This file says what came from where, so a future change knows what it is changing. Reviewed 2026-10-16.

| Source | What it is | What we took from it |
|---|---|---|
| [clintonherring/videos](https://github.com/clintonherring/videos) | One business's (OpenSAR) video strategy, backlog, skills and reference notes, built in conversation over a few weeks | the **method** (one viewer, hook → signature → one idea → one CTA, the brief-summary stop, pillars / calendar / phases, backlog, performance log) and the **way it was built** (evidence before questions, ideas before pillars, proposals marked for the owner, refine by correction, take/leave notes for outside sources) |
| [latent-spaces/brag](https://github.com/latent-spaces/brag) | Turns a project website into a 15–25 s launch video via Hyperframes | the **edit laws** and the **production pipeline** (plan → storyboard → composition brief → compose → `check` → render → poster as frame 0 → share copy), made asset-aware and type-aware |
| [prateekjain98/social-media-manager-skills](https://github.com/prateekjain98/social-media-manager-skills) | Agent skills for growing a personal brand on X and Shorts | the **planning layer above the brief**: pillars with share and metric, cold-start phases, gaps / takes / story bank, saturation map, performance log, per-business folders |

The two evaluations written for `videos` ([brag-evaluation.md](https://github.com/clintonherring/videos/blob/main/reference/brag-evaluation.md), [social-media-manager-evaluation.md](https://github.com/clintonherring/videos/blob/main/reference/social-media-manager-evaluation.md)) still hold here. Their leave-alone lists are inherited unchanged. What changed: the brag pipeline is now taken (it was left alone in `videos`), and everything from `videos` had OpenSAR removed.

## 1. From `videos`

### Taken as the method (generalised in `strategy/`)

| In `videos` | Here | How it changed |
|---|---|---|
| `strategy/00-overview.md` one viewer, the stack hook → intro → bridge, one idea, one CTA | `strategy/00-overview.md`, `01-audience-and-voice.md`, `02-hooks.md`, `03-signature.md`, `05-ctas-and-publishing.md` | OpenSAR's pilots, walkers and Rover removed; "intro" became "signature" (the recurring peer line); two tracks became "a second viewer, if any" settled in `audience.md` |
| `08-video-types.md` (ten OpenSAR types, two of them Rover's) | `strategy/08-video-types.md` (eleven generic types) | the two Rover types became the generic story and explainer; each type now carries a scene skeleton, the scenes that must be real footage, a degrade path and a build profile, so the type reaches the renderer (`build-video/type-profiles.md`) |
| `09-which-videos.md` pillars, season slots, phases, saturation, series, the picking rule | `strategy/09-which-videos.md`, `templates/business/{pillars,calendar,seeds}.md`, `video-schedule` | "season" became "calendar slots" (seasonal, key dates, or plain cadence); the picking rule adds an Assets line |
| `06-delivery.md` on-camera delivery, coffee-shop test, feeling | `strategy/06-delivery-and-narration.md` | adds narration and captions-only as first-class ways to speak, since many businesses have no one on camera |
| `make-video` skill (intake, vet, brief-summary stop, storyboard, publish block) | `skills/make-video` | asset-first: the stop now shows an **asset map** and a **gap report**, and nothing is written until every gap has one of four decisions |
| `clinton-voice` skill (we say / not, slogan to sentence, the check) | `skills/business-voice` | part 1 is a guide that calibrates `voice.md` from the business's own writing; part 2 is the same line check, loaded by every writing step |
| `video-fundamentals` skill | `skills/video-fundamentals` | OpenSAR roles and Rover removed; adds gap decisions, text scenes and the poster to the fail list |
| `videos/BACKLOG.md`, `recordings/PERFORMANCE.md`, `reference/content-seeds.md` | `templates/business/` | per business, same columns; backlog statuses `idea → briefed → gaps-resolved → built → published` |
| `reference/*-evaluation.md`, `reference/*-notes.md` | `skills/absorb-source` | the take/leave move made repeatable: what it is, table of layers, take, leave, where each piece landed |

### Taken as the way it was built (`strategy/12-guides.md`, the eleven guide skills, `lib/prerequisites.mjs`)

In `videos` the pillars and schedule were not filled in from a questionnaire; they came from reading the site and the existing backlog first, proposing, and letting the owner strike and correct. That is now the shape of every guide: read what exists and say what can be inferred; two or three questions a turn; proposals marked for the owner with a "Needs the owner" list; the row stays `draft` until both are empty. The order the files were actually produced in (business → audience → facts and voice → channels → ideas → pillars → seeds → calendar; brand and assets for a build) is the manifest, and each step says why it comes before the next.

### Left out

- Everything OpenSAR: Rover, pilots, weidevogel groups, the nest season, Dutch/English cuts as a fixed set, the investor cut.
- `recordings/LOG.md` as a log of shoot days; here footage is inventoried as assets with IDs (`assets/ASSETS.md`).
- The two-track backlog letters (P/R) as a default; a second viewer is optional.

## 2. From `brag`

### Taken (now including the pipeline)

| In brag | Here | How it changed |
|---|---|---|
| Creative laws: hook first, show the thing, specific, readable, ground claims, every frame postable | `strategy/07-edit-fundamentals.md` | unchanged in substance; "show the thing" became "show the flow: entry → key action → result" for services as well as products |
| Reading-time floor and the storyboard contract (settled hold, sequential / interaction flags) | `07-edit-fundamentals.md`, `templates/storyboard.md`, `video-fundamentals` | per-type skeletons pre-filled |
| Composition brief as the boundary between creative decisions and Hyperframes' implementation | `templates/composition-brief.md`, `build-video` step 1 | adds source material by asset ID with in/out points, gap decisions applied, the type profile |
| Hyperframes: compose → `npx hyperframes check` (lint, runtime, layout, motion, contrast) → render | `skills/build-video` | real clips trimmed with `data-media-start`, stills, screen recordings, brand colours and fonts; text scenes and placeholders as reusable sub-compositions with variables; `--no-contrast` never used |
| Poster as frame 0 | `npx smma-videos poster` (`lib/poster.mjs`) | ffmpeg extract and bake, duration and frame count unchanged; the sidecar records the time |
| Share copy discipline (one canonical caption) | `output/caption.txt`, the publish block | caption = hook / signature / one or two sentences / one ask |
| Tone presets as a structure for pacing tables | `build-video/type-profiles.md` | the presets themselves are gone; **the video type** sets beats, holds, transitions, caption style, text-scene role, narration and music; the business's voice sets the register |
| The launch shape (hook → reveal → highlights → punchline, text-forward) | one type among eleven (`08-video-types.md` "Launch") | the only type where text scenes are the centrepiece |

### Left out

- Bundled music beds, casino / UI SFX, beat grids, audio-reactive effects. Music only when the owner supplies a licensed file.
- Kokoro TTS as a default voice; `npx hyperframes tts` is allowed only when the brief says a generated voice is acceptable, never imitating a real named person.
- Landing-page scraping as the primary source. Here the source is the business's own assets and facts; the site's CSS is read once for `brand.md`.
- The hard 15–25 s ceiling; shorts run 20–60 s by type, long form separately.
- `brag-output/`, the intent interview and the promo workflows. `build-video` is the workflow; Hyperframes' own skills are loaded for the composition contract only.

## 3. From `social-media-manager-skills`

Only the video-related rows from the `videos` evaluation; the leave-alone list is inherited as is.

### Taken

| In the source | Here |
|---|---|
| Pillars with purpose, share, metric; review questions | `templates/business/pillars.md`, `define-pillars`; review once a period |
| Cold-start phases with exit criteria; distribute into existing communities first | `templates/business/calendar.md` "Phases", `define-calendar` |
| Content gaps rated 1–10; takes; story bank | `templates/business/seeds.md`, `collect-seeds` |
| Saturation map | `seeds.md`, applied in the picking rule |
| Per-post performance log with an "if not working" diagnostic | `templates/business/PERFORMANCE.md`, per published video per channel; diagnostic rewritten for hook / CTA / product shown too late / peer line / text scenes carried the whole video |
| Series / recurring formats | `seeds.md` "Series", `pillars.md` |
| Repurpose set from one piece of work | the publish block's "Set" line for long form |
| One folder per client / brand | `businesses/<slug>/` with a readiness tracker per folder |

### Left out (inherited)

Reply farming, X communities, follow / unfollow quotas, engagement cohorts, three sessions a day, trending audio, algorithm weighting tables, AI-identity concealment, generic hook templates.

## What none of the three had

- **The asset map and the gap protocol.** All three assume the material exists (a website, a shoot day, a feed). Here the first question of every brief is what footage, stills and screens are actually there, and every missing scene gets one of four decisions: placeholder, designed text scene, leave out and redo the summary, or the owner provides it (`strategy/10-assets-and-gaps.md`).
- **Text scenes as a real part of the video**, with the rule that they cannot be boring text (`strategy/11-text-scenes.md`, `build-video/compositions/text-scene.html`), and placeholders that must look unfinished.
- **The ordered prerequisite manifest and readiness tracker** (`lib/prerequisites.mjs`, `npx smma-videos readiness`): "I still need x, y, z before a schedule / a brief / a build; next is x, because …".
- **A type system that reaches the renderer**, so a how-to and a launch from the same assets come out as different cuts (`businesses/example-business/videos/V03-*` vs `V07-*`).
- **A dependency-checked install** that works from Cursor, Claude, Codex or opencode on Linux, macOS and Windows (`npx smma-videos doctor`, `install --agent`).
