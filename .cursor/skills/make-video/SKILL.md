---
name: make-video
description: Takes one video for businesses/<slug> from an idea or backlog ID to an approved, buildable brief. Checks readiness, reads the links and assets, vets type / viewer / one idea / feeling / hook / CTA with a few questions, then STOPS at a BRIEF SUMMARY plus an ASSET MAP and a GAP REPORT; every gap gets one of four decisions (placeholder, text scene, leave out, provide) before anything else is written. After approval it writes the storyboard, text scenes and publish block into videos/<ID>-<slug>/brief.md. Use when the person names a backlog ID, says "new video", "I want a video about", "brief this", "make a video from these clips / this link", or asks what is missing to build one.
---

# Make a video

One video from idea to a buildable brief. Two entry points, one hard stop, four gap decisions.

```
Entry A: new idea ("I want a video about…")          ─┐
Entry B: backlog ID ("V03", "make V03 next")           ─┴─> 1 Readiness → 2 Intake → 3 Vet → 4 BRIEF SUMMARY + ASSET MAP + GAP REPORT (stop)
                                                              → 5 Produce (storyboard, text scenes, publish block) → 6 Write → hand to build-video
```

Nothing after step 4 is produced until the person approves the summary **and** every gap has a decision. Refinements go back to step 3. Which doc each step reads: [reference.md](reference.md). A worked run: [examples.md](examples.md).

## 1. Readiness gate

`npx smma-videos readiness <slug>`. The brief tier needs the schedule tier plus facts and voice.

- `blocked`: show the output, name the next guide and its reason, offer to run it. Then, if the person wants to go on anyway, go on with the gaps marked `[Owner]` in the summary; say what that costs (no facts file means every claim is "to confirm").
- `draft`: go on; list the open `[Owner]` items the brief will rest on.

Load `business-voice` (mode 2, the line check) now; every line below passes it.

## 2. Intake

1. Entry B: read the row in `BACKLOG.md` (type, pillar, slot, phase, assets). Entry A: it gets the next free ID at step 6; run `video-schedule` intake in your head (one line, pillar, slot, phase).
2. Read every link and text the person gave. Read `profile.md`, `audience.md`, `facts.md`, `voice.md`, `channels.md`, `pillars.md`, `seeds.md`.
3. **Assets.** If the person dropped new files, run `npx smma-videos inventory <slug>` and fill the new rows' `[Owner]` cells with them (or run `inventory-assets`). Read `assets/ASSETS.md` and note every asset tagged to this ID or its pillar.
4. **Facts gate.** Every claim the video will make must be in `facts.md`. A missing claim goes to "Facts to confirm" in the summary, never into a line as if true.
5. **Roadmap gate.** A feature that does not work yet: brief it, mark it `on hold`, say so now.
6. **Picking rule** (`strategy/09-which-videos.md` §7): one sentence, "Make this next, because…" or "Not yet, because…". A "not yet" is said once and does not block.

## 3. Vet

State what you inferred and why; ask only what you cannot infer. Two or three questions a turn, with options. Never a questionnaire.

| Fundamental | Infer from | Ask when |
|---|---|---|
| The one viewer (and track) | who the idea is about; `audience.md` | it could be either viewer |
| Type (`strategy/08-video-types.md`) | the idea's shape: teaches → how-to; two methods → comparison; a lived moment + a fix → problem and fix; a lived moment + a person → story; new thing shown → reveal; new thing announced → launch; a whole job → walkthrough; why it exists → origin; a part explained to an outsider → explainer; come and take part → invitation; what you pay → offer | it reads as two |
| One idea | the person's line | it needs "and also" (propose the split) |
| Format and length | the type's default | the idea might carry long form |
| Feeling at the end | rarely inferable; `audience.md` gives the default per kind | almost always; say "not enough to call the feeling" rather than guess |
| Hook direction | the viewer's moment in the idea; `seeds.md` | the idea is about the product |
| The default and the point (`strategy/02-hooks.md`) | the default the idea departs from and its cost from `facts.md` | the cost has no number; the viewer might be the one doing the default |
| Signature | `voice.md` per viewer | a second viewer |
| CTA | `channels.md` per primary channel | knowledge vs product video is unclear |
| Who speaks | `voice.md` "Who speaks" | the footage has no voice and the type wants one |
| Who is in frame, consent | `ASSETS.md` "May publish?" | any person in any asset |
| Why now | backlog columns, picking rule | the idea fits two pillars; footage does not exist and it is out of slot |

Offer a reading when you ask: "This reads as a comparison (the old way vs yours) rather than a how-to. Right, or do you want to teach the steps?"

## 4. The stop: brief summary, asset map, gap report

Present these three blocks in this order, then stop and wait.

**Brief summary** (`templates/video-brief.md`, the block): Type · Viewer, One idea, Default, Feeling, Hook (chosen) with first frame named by asset ID or GAP, alternates (one default hook, one viewer's-moment hook), Signature, CTA → where, Format · est. length, Who speaks, Why now (pillar · slot · phase · channel · assets), Facts to confirm, Still open. Every line filled or explicitly open. Hooks are sentences the speaker would say, with a specific, passing the voice check.

**Asset map** (`templates/asset-map.md`): one row per scene of the type's skeleton, `Needs`, `Have` (asset ID and in/out), status `have` / `partial` / `GAP`. Then "Must be real for a <type>: scenes …" and "Buildable now: …" (`strategy/10-assets-and-gaps.md`).

**Gap report**: for each `GAP` or `partial`, the four decisions with the concrete version of each for this scene, a recommendation with its reason, and whether the scene is must-be-real (and what the video becomes if it is resolved as a text scene). End with: "Approve the summary, and say the decision per gap (e.g. '3 D, 4 B')."

Rules:

- Save the stop: write the summary, the map and the report to `videos/<ID>-<slug>/brief.md` with status `briefed — awaiting approval`; move the backlog row to `briefed`; commit if the project is in git.
- If the person changes anything, update the blocks and present again. No partial approval.
- Decision **C** (leave out) rewrites the one idea and the summary; present again.
- Decision **D** (provide) writes the shot list row to `assets/ASSETS.md` "Missing shots requested"; the video stays `briefed` until the file arrives, but the storyboard can still be written with the scene marked `awaiting A##`.
- Placeholders (**A**) are for iterating, never for publishing; say so each time one is chosen.

## 5. Produce (after approval and all decisions)

Load `video-fundamentals` and keep `business-voice` loaded. Build, in order:

1. **Storyboard** from `templates/storyboard.md`, pre-filled from the type's skeleton: per scene what is on screen (asset ID + in/out, text scene, placeholder), spoken / narrated line, caption, settled hold vs the reading floor, flow beat, sequential moment, transition from the type profile. Sum the durations. Name the poster candidate.
2. **Text scenes** (`strategy/11-text-scenes.md`): for every B decision and every planned card, the role, the line(s), entrance, hold. One idea per card; brand colours; passes the voice check.
3. **Publish block** (`strategy/05-ctas-and-publishing.md`): caption (hook / signature / one or two sentences / ask), hashtags, poster moment, distribution line, the set (long form), performance rows to create.
4. **Checks**: delivery, pre-publish and text-scene checklists, each item ticked or noted.

Keep the storyboard honest to the type's body pattern. One idea. One CTA. People and roles as in `facts.md`.

## 6. Write

- `videos/<ID>-<slug>/brief.md`: Brief summary (approved, dated) → Asset map → Gap decisions → Details → Storyboard → Text scenes → Publish → Checks (`templates/video-brief.md` order). Remove "Still open" items once closed.
- `BACKLOG.md`: new idea → row with next ID and columns; status `gaps-resolved` when no D is outstanding, else `briefed`; File column → the brief.
- `seeds.md`: story or take used → fill "Use in" / "Said in"; a new story told during vetting → story bank.
- `hooks.md`: the chosen hook and alternates, tagged with the ID.
- `facts.md`: any confirmed fact → row; anything still open → "Needs the owner".
- Commit after step 4 and after step 6 if in git.
- Hand back: the brief path, the gap decisions applied, what is still awaited (D), and "say `build V##` to render it".

## Do not

- Produce anything past the stop before approval and gap decisions.
- Write briefs for backlog rows nobody asked about.
- Use an asset without an `A##` row or with "May publish?" unanswered.
- Put a claim on screen that is not in `facts.md`; put a presenter line or a slogan in anyone's mouth.
- Make price the hook or the CTA (the offer type is the one place price is explained).
- Treat a placeholder as a finished scene, or a roadmap feature as present.
- Refuse because the picking rule said "not yet". Say it once, record it, go on if the person wants.
