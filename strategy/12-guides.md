# The guides: how setup actually works

Eleven guide skills fill the files in `businesses/<slug>/`, one each. They share one shape, written here once, because the method they follow is the one that produced the pillars and schedule of the business this repo was generalised from, and that method was not an interview.

## Where the shape comes from

What actually happened: facts and voice were pulled from material that already existed (a facts file, guides on the website) → a backlog of about thirty one-line ideas (full briefs were written first, then deliberately scaled back to one line each: "briefs get written when a video is picked") → an outside source was evaluated with a take/leave note → pillars were written as a **sort of the existing backlog** ("Backlog IDs (first sort)"), with shares, dates, exit numbers and series names as proposals marked `[Owner]` and a "Needs the owner" list at the bottom → the columns, briefs and picking rule were wired → and then refined by correction, each time the owner supplied a fact or a story and the agent rewrote a pillar or moved topics between pillars.

Nothing was produced by asking twenty questions up front. The guides keep that.

## The rules every guide follows

1. **Evidence before questions.** Read what exists (the site, text, files, the backlog, earlier files in the folder) and propose; ask only where inference fails. Never open with a questionnaire. Say what was inferred so the person can correct it in a word.
2. **Ideas before pillars.** `define-pillars` needs something to sort. If `BACKLOG.md` is still the template, it says so and runs `seed-ideas` first (or marks everything `[Owner]` if the person insists). Pillars are a first sort of real ideas, not a taxonomy.
3. **Proposals carry the owner's mark.** Anything only the owner can know (shares, dates, exit numbers, series names, which groups exist, consent, prices) is written as a proposal tagged `[Owner]`, and every file ends with a `## Needs the owner` list. `readiness` reads both: the file is `draft` until they are empty, then `ready`.
4. **Refine by correction.** When the owner supplies a fact, story or objection, rewrite the affected section and say what moved where. Do not re-ask the questions.
5. **Outside material goes through a take/leave note.** A transcript, article, talk or repo the person points at is evaluated in `reference/<slug>-notes.md` (what it is, take, leave, where each kept piece landed) and only the kept parts are wired in. That is `absorb-source`; it was used four times in building the original method.
6. **Ideas stay one line until picked.** Briefs are written in `make-video` when a video is chosen, never in bulk.
7. **Two or three questions a turn**, each with options the person can answer in a line.
8. **Finish with readiness.** Every guide ends by running `npx smma-videos readiness <slug>` and saying the next missing prerequisite and why.

## The order, and why it is enforced

Each prerequisite feeds the ones after it. The manifest (`lib/prerequisites.mjs`) is the single source: `needs`, `feeds`, `because`, and the tier (`schedule` / `brief` / `build`) at which its absence blocks an output. `npx smma-videos order` prints it.

| # | Prerequisite | File | Guide | Needs | Because |
|---|---|---|---|---|---|
| 1 | business | `profile.md` | `define-business` | a URL or a paragraph | the one viewer, the facts worth collecting, the channels and the CTA all follow from what is offered and to whom |
| 2 | audience | `audience.md` | `define-audience` | business | a pillar is defined by its viewer, an idea is a moment that viewer has lived, and channels are where that viewer already is |
| 3 | facts | `facts.md` | `collect-facts` | business | ideas are only worth listing if they can be backed; nothing goes on screen that is not here; reading the site once for facts and voice saves reading it twice |
| 4 | voice | `voice.md` | `business-voice` | business | a hook that does not sound like the owner gets rewritten anyway; building the profile once from their own writing is cheaper than correcting every line |
| 5 | channels | `channels.md` | `define-channels` | business, audience | an idea for a group and an idea for LinkedIn are different ideas; the calendar cannot set a cadence without knowing the channels |
| 6 | ideas | `BACKLOG.md` | `seed-ideas` | audience, facts, channels | pillars are a sort of real ideas; the story behind an idea is a seed; which ideas need footage decides the calendar |
| 7 | pillars | `pillars.md` | `define-pillars` | ideas, audience | the schedule picks by pillar share; a pillar with no ideas under it is a sign something is unclear |
| 8 | seeds | `seeds.md` | `collect-seeds` | pillars, ideas | a hook is a moment or a gap, and both need a pillar and an ID to be worth keeping |
| 9 | calendar | `calendar.md` | `define-calendar` | pillars, channels, ideas | slots are filled by pillar share, cadence comes from channels, and which ideas need footage decides where they can sit |
| 10 | brand | `brand.md` | `define-brand` | business | every text scene and caption is set in these; without them a build looks like no one's |
| 11 | assets | `assets/ASSETS.md` | `inventory-assets` | ideas | the gap report is the difference between what a video needs and what is here |
| 12 | render environment | (doctor) | `setup-business` | — | a brief can be written anywhere; a render cannot |

Tiers: **schedule** = 1, 2, 5, 6, 7, 8, 9 · **brief** = schedule + 3, 4 · **build** = brief + 10, 11, 12.

How the order is used:

- `setup-business` walks the list top down, skipping rows already `ready`, and before each guide says the `because` line.
- A guide run out of order reads its `needs`. If one is `missing`, it says "I need audience first because pillars are defined by their viewer; shall we do audience now, or go on and mark the viewer `[Owner]`?" and does what the person says. If one is `draft`, it goes on and lists the open `[Owner]` items it is building on.
- `readiness` lists missing items in manifest order, so "I still need…" is already the order to do them in, and prints the `because` for the first one only.
- `collect-facts` and `business-voice` read the same material and are offered as one pass: "while I'm reading your site I can pull the claims, and keep the pages you wrote yourself as voice samples."

## The shape of a guide SKILL.md

```
---
name: define-<thing>
description: Guide → businesses/<slug>/<file>. Use when the person says "<triggers>", when setup-business or readiness names <thing> as next, or when another skill finds <file> missing or draft.
---
# <Thing>

Upstream / Downstream block (from `npx smma-videos order <id>`): what this needs, what it feeds, why now.

## Before asking anything
- run readiness; check needs; the "I need X first because…" move
- read: the file as it is, profile.md, the site / text / files the person gave, the backlog
- state what can be inferred

## Questions (two or three a turn, with options)
## Write the file
- sections required by the manifest; [Owner] on proposals; ## Needs the owner at the end
## Refine by correction
## Finish
- run readiness; say the next one and why
```

## What "ready" means per file

A file counts as filled when its required sections exist (the manifest lists them), it no longer carries the template marker, and it has no `[Owner]` / `TODO` markers and no open bullets under `## Needs the owner`. A guide may leave a file as `draft` on purpose; the schedule tier can run on drafts (the readiness message says "ready with drafts"), the build tier cannot run on a missing `brand.md` or an empty inventory.

## Skipping the guides

Someone who already has the material can write the files by hand from `templates/business/` and run `npx smma-videos readiness <slug>`. The guides are the conversation; the files are the contract.
