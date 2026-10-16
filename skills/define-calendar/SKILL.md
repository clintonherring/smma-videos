---
name: define-calendar
description: Guide that writes businesses/<slug>/calendar.md: calendar slots from the business's own seasonality, key dates and launches (or a plain cadence), cold-start phases with exit numbers, key dates, and the rule "shoot in season, publish before it"; then fills the backlog's Slot and Phase columns. Use when the person says "calendar", "season", "when do we post", "phases", "key dates", or when setup-business or readiness names calendar as next.
---

# Define the calendar

Upstream: pillars (`pillars.md`), channels (`channels.md`), ideas (`BACKLOG.md`).
Downstream: SCHEDULE.md.
Why now: slots are filled by pillar share, cadence comes from channels, and which ideas need footage or a season decides where they can sit.

Shared shape: `strategy/12-guides.md`. Method: `strategy/09-which-videos.md` §2–3.

## Before asking anything

1. `npx smma-videos readiness <slug>`. If `pillars.md` or `channels.md` is `missing`: "I need pillars and channels first, because slots are filled by pillar share and the cadence comes from the channels. Which shall we do now?" If `draft`, go on and name the open items (usually shares and cadence).
2. Read `profile.md` and `facts.md` for seasonality (a busy period, a buying cycle, weather, school terms, a product launch, a conference), `channels.md` for cadence and the primary channel, `BACKLOG.md` for which ideas need footage from a season or an event and which can be made from what exists (`Assets` column).
3. Propose the slots. Two shapes:
   - **Seasonal.** Before / Early / Peak / After / Quiet, with the business's own names and rough months `[Owner]`, what is happening for the viewer in each, what to make and what to publish. Footage-dependent ideas sit in the busy slots; evergreen ideas publish before the season.
   - **Cadence.** No season: slots are weeks or fortnights at the sustainable cadence from `channels.md`, pillars alternating by share.
   Say which shape you chose and why; mark months and dates `[Owner]`.
4. Propose the phases with exit numbers `[Owner]` scaled to the business ("6 videos in 2 places each; 20 sign-ups attributable; one conversation that started from a video").

## Questions (two or three a turn)

- "When is the busy time as you live it: first job of the year, peak, last? Any dates that matter (a launch, a fair, a deadline the viewer has)?"
- "Which of these exit numbers would you actually believe? Make them smaller if they feel like marketing."
- "Which ideas can only be shot in season? I've marked these; correct me." (Those get the busy slot and a shoot-list later.)
- "If the cadence is one a fortnight, the first slot is <date>. Start with <pillar> because it is evergreen and safe to share, or with <idea> because you have the footage?"

## Write the file

`calendar.md` with `## Slots` (slot, when `[Owner]`, what is happening for the viewer, what to make, what to publish), `## Phases` (phase, what we make, where it goes, exit when `[Owner]`), `## Rules`, `## Key dates`, `## Needs the owner`. Remove the template marker. Then fill the **Slot and Phase columns in `BACKLOG.md`** for every idea and say so. Roadmap-gated ideas get phase `gated`.

## Refine by correction

When the owner gives real dates, replace the proposals and re-sort any idea whose slot changed; say which. When cadence changes in `channels.md`, redo the slot count, not the video length.

## Finish

- `npx smma-videos readiness <slug>`; show it. If the schedule tier is now ready (or ready with drafts), say so and offer `video-schedule` to fill `SCHEDULE.md`.
- "Before a build I still need brand and assets; brand first, because every text scene and caption is set in it."

## Do not

- Impose a weekly rhythm on a seasonal business, or a season on a business that has none.
- Set exit numbers as targets the agent chose. They are `[Owner]` until confirmed.
- Schedule a footage-dependent idea in a slot where the footage cannot exist.
