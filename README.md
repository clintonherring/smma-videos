# smma-videos

A set of agent skills that take a business from "I should be posting videos" to a posting schedule and rendered videos, built from whatever the business already has: a website, some text, photos, clips, screen recordings.

It works the way the OpenSAR `videos` repo works (one viewer, one idea, one CTA, pillars and a calendar, a brief that stops for approval) and renders the way `brag` renders (plan → storyboard → Hyperframes composition → check → render → poster baked as frame 0 → caption). The missing piece in both, and the point of this repo, is the **gap protocol**: when the business does not have a shot the video needs, the agent says so before building and lets the person choose a placeholder, a designed text scene, dropping the scene and reworking the idea, or providing the shot.

## What you get

- A `businesses/<slug>/` folder per business with everything a schedule and a video need: profile, audience, voice, brand, facts, channels, pillars, calendar, seeds, backlog, schedule, performance log, assets.
- `READINESS.md` in that folder: what is still missing, in the order to do it, with the reason ("I need audience first because pillars are defined by their viewer").
- A guide skill per prerequisite. Each one reads what exists before asking anything, asks two or three questions a turn, writes proposals marked `[Owner]` where only you can decide, and tells you what comes next and why.
- `make-video`: an idea or backlog ID → a **brief summary**, an **asset map** and a **gap report**, then a stop. Nothing is built until every gap has a decision.
- `build-video`: the approved brief → a rendered `.mp4`, a poster, a caption. Shorts (9:16, 20–60 s) by default; long form when the type calls for it.
- A video **type** system (how-to, comparison, problem and fix, reveal, launch, walkthrough, origin, story, explainer, invitation, offer) that decides the shape, length, CTA, asset needs and pacing, so videos do not all come out as the same flow.

## Requirements

- Node.js 22 or later
- ffmpeg and ffprobe on `PATH` (only needed to inventory assets and build)
- An agent that reads skills: Cursor, Claude Code, Codex, opencode, or any agent with custom instructions (see [docs/other-agents.md](docs/other-agents.md))

`npx smma-videos doctor` checks all of this and prints install hints for your OS.

## Install

Nothing is published to npm; the repo itself is the package.

```bash
# check the machine
npx github:clintonherring/smma-videos doctor

# start a business folder (in the repo, or in any project you installed the skills into)
npx github:clintonherring/smma-videos init my-business

# see what is still needed and what to do next
npx github:clintonherring/smma-videos readiness my-business
```

Two ways to use it:

1. **Fork or clone this repo and keep businesses in it** (default). Cursor picks up `.cursor/skills/` with no install step; for Claude Code, Codex or opencode run `npx smma-videos install --agent claude|codex|opencode|all` once, which copies `skills/` into that agent's discovery directory. Business data lives in git, so a Cloud Agent can build from it.
2. **Install the skills into another project.** `npx skills add github:clintonherring/smma-videos` (the [skills CLI](https://github.com/vercel-labs/skills)) or `npx github:clintonherring/smma-videos install --agent <agent>` from inside that project, then `init <slug>` there. A `businesses/` folder is created in that project.

Inside a clone, the same commands run as `npx smma-videos <command>` or `npm run <command>`.

### CLI

| Command | What it does |
|---|---|
| `doctor` | Node ≥ 22, ffmpeg, ffprobe, git, Hyperframes; per-OS fix hints. `--full` also runs `npx hyperframes doctor`. |
| `init <slug>` | Copy `templates/business` to `businesses/<slug>`, write `READINESS.md`, say what to do first. |
| `readiness <slug>` | Rebuild `READINESS.md` and print what is still needed, in order, with the reason for the next one. |
| `inventory <slug>` | Probe `businesses/<slug>/assets/` with ffprobe and write rows into `assets/ASSETS.md`. |
| `poster <video.mp4> <seconds>` | Extract the settled frame at that time as `<video>.jpg` and bake it as frame 0 (duration and audio unchanged). |
| `install --agent <cursor\|claude\|codex\|opencode\|all>` | Copy `skills/` into that agent's project discovery directory. |

## How it flows

```
doctor / init
  → setup-business          readiness check; offers the next guide, with the reason
  → guide skills            one per prerequisite, in dependency order (see below)
  → video-schedule          BACKLOG.md (ideas with IDs) and SCHEDULE.md (dated slots from pillar shares)
  → make-video              idea or ID → brief summary + asset map + gap report → STOP for approval
  → gap decisions           placeholder / text scene / leave out / provide
  → make-video (cont.)      storyboard from the type's skeleton, captions, publish block, checks
  → build-video             composition → hyperframes check → render → poster as frame 0 → caption
  → you post                PERFORMANCE.md a week and a month later; the diagnostic says what to fix
```

### The order, and why

Each prerequisite feeds the ones after it. `readiness` lists what is missing in this order and names the reason for the next one.

| # | Prerequisite | File | Guide | Why it comes here |
|---|---|---|---|---|
| 1 | business | `profile.md` | `define-business` | The viewer, the facts worth collecting, the channels and the CTA all follow from the offer |
| 2 | audience | `audience.md` | `define-audience` | A pillar is defined by its viewer; an idea is a moment that viewer has lived |
| 3 | facts | `facts.md` | `collect-facts` | Ideas are only worth listing if they can be backed; nothing goes on screen that is not here |
| 4 | voice | `voice.md` | `business-voice` | Same source material as facts; calibrating once beats correcting every line |
| 5 | channels | `channels.md` | `define-channels` | A group video and a LinkedIn video are different ideas; cadence comes from here |
| 6 | ideas | `BACKLOG.md` | `seed-ideas` | Pillars are a sort of real ideas, not categories invented in the abstract |
| 7 | pillars | `pillars.md` | `define-pillars` | The schedule picks by pillar share |
| 8 | seeds | `seeds.md` | `collect-seeds` | Hooks come from gaps, takes and stories; each needs a pillar and an ID |
| 9 | calendar | `calendar.md` | `define-calendar` | Slots by pillar share, cadence from channels, footage needs from ideas |
| 10 | brand | `brand.md` | `define-brand` | Every text scene and caption is set in these |
| 11 | assets | `assets/ASSETS.md` | `inventory-assets` | The gap report is the difference between what a video needs and what is here |
| 12 | render environment | (doctor) | `setup-business` | A brief can be written anywhere; a render cannot |

Tiers: a **schedule** needs 1, 2, 5–9. A **brief** adds 3 and 4. A **build** adds 10–12.

## Where things live

```
skills/            the canonical skills (copied into .cursor/skills/ here; into other agents by `install`)
strategy/          the method, business-agnostic: audience, hooks, signature, formats, CTAs, delivery, edit laws,
                   video types, which videos, assets and gaps, text scenes, how guides behave
templates/         business skeleton (what `init` copies) and per-video templates (brief, storyboard, asset map, composition brief)
reference/         where the method came from (videos, brag, smma) and what was taken or left
businesses/        one folder per business; example-business is a filled example
bin/, lib/         the CLI (Node only, no Python or bash, runs on Linux, macOS and Windows)
docs/              notes for agents without skill discovery
tasks/             working notes per piece of work
```

## Start here

- [strategy/00-overview.md](strategy/00-overview.md): the whole approach on one page
- [strategy/08-video-types.md](strategy/08-video-types.md): the types and what each one needs
- [strategy/10-assets-and-gaps.md](strategy/10-assets-and-gaps.md): the gap protocol
- [strategy/12-guides.md](strategy/12-guides.md): how every guide skill behaves
- [skills/make-video/examples.md](skills/make-video/examples.md): a worked run from idea to gap report
- [businesses/example-business/](businesses/example-business/): a filled example
- [reference/sources.md](reference/sources.md): what came from where

## Media and git

Rendered videos (`businesses/*/videos/*/output/`) and composition caches are ignored. Source assets under `businesses/*/assets/` are tracked by default so an agent working from a clone can build from them. GitHub refuses files over 100 MB; put large clips in Git LFS or keep them out of git and link them from `ASSETS.md`.
