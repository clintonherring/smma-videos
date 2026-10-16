---
name: setup-business
description: Orchestrates onboarding a business into smma-videos. Runs the environment doctor and the readiness check for businesses/<slug>, reports which outputs are possible (schedule / brief / build), names the next missing prerequisite with the reason it comes first, and hands off to that guide skill or walks all guides in order. Use when the person says "set up <business>", "new business", "onboard", "where am I", "what do you still need", "am I ready to make a video", or when any other skill finds the business folder missing or incomplete.
---

# Set up a business

The front door. It never fills a file itself; it says what is missing, why that one comes next, and hands off to the guide that fills it.

## 1. Find or create the folder

- Slug: lowercase letters, digits, hyphens (`acme-bikes`). If the person gives a name, propose the slug.
- If `businesses/<slug>/` does not exist: `npx smma-videos init <slug>` (inside this repo, or in any project where the skills were installed; `init` creates `businesses/` where it runs). Show the output.
- If the person has pointed at a URL, text or files already, keep them; the first guide reads them.

## 2. Doctor

Run `npx smma-videos doctor`. Report in one line. A failing ffmpeg or Node blocks the build tier only; say "briefs and schedules still work, builds need X" and give the OS hint it printed. Offer `doctor --full` (runs `npx hyperframes doctor`) only when the person is about to build.

## 3. Readiness

Run `npx smma-videos readiness <slug>`. Show its output as-is; it already says:

```
READINESS: <slug>
Ready for: nothing yet.
Before a schedule I still need: business, audience, channels, ideas, pillars, seeds, calendar.
Before a brief I also need: facts, voice.
Before a build I also need: brand, assets.

Next: business, because the one viewer, the facts worth collecting, the channels that matter and the CTA all follow from what is offered and to whom.
Run the `define-business` guide (say "business"), or say "all" to go through everything in order.
```

Then ask one question: **"Shall we go through <next> now, all of them in order, or a different one?"**

## 4. Hand off

| The person says | Do |
|---|---|
| the next one, or "yes" | load that guide skill (the `guide` column in READINESS.md) and run it |
| "all" | run the guides top down in manifest order, skipping rows already `ready`; before each, say its `because` line in one sentence ("Next: channels, because ideas and the calendar both depend on where the videos go and how often you can post"); after each, re-run readiness |
| a different one | load that guide; it checks its own upstream and may say "I need X first because…" |
| "just the schedule" | run only the schedule-tier guides (business, audience, channels, ideas, pillars, seeds, calendar), then `video-schedule` |
| "I have a video idea" | add it to `BACKLOG.md` via `video-schedule` first, then come back; an idea is never lost to setup |
| hands over a transcript, article or repo | run `absorb-source` first, then continue |

Drafts: a row that is `draft` (filled, but with `[Owner]` proposals or open items under "Needs the owner") does not block. Say "ready for a schedule, with drafts in pillars and calendar; the open items are: …" and offer to resolve them now or later.

## 5. When everything is ready

Say so and offer the two next moves:

- `video-schedule`: fill `SCHEDULE.md` from pillar shares and the calendar, and run the picking rule.
- `make-video <ID or idea>`: brief one video (it stops at the brief summary, asset map and gap report).

## Rules

- Never open with a questionnaire. The guides read first and ask second (`strategy/12-guides.md`).
- Never write a prerequisite file from here. The guides own their files and their `[Owner]` marks.
- Always show the readiness output verbatim; it is the contract between the person and the system.
- One next step per message. The person chooses the order; the system explains it.
- A render-environment failure is never a reason to stop setup. Everything up to the build tier works without ffmpeg.

## Where things are

| | |
|---|---|
| The order and the reasons | `strategy/12-guides.md`; `npx smma-videos order` |
| The business folder layout | `templates/business/`, `README.md` |
| What each file is for | the header comment in each template file |
| Agents without skill discovery | `docs/other-agents.md` |
