---
name: seed-ideas
description: Guide that does the first fill of businesses/<slug>/BACKLOG.md: proposes 10–20 one-line video ideas from the profile, audience, facts, channels and the site, asks the person to strike and add, gives survivors IDs, and notes which already have assets. Ideas stay one line until picked; it never writes briefs. Use when the person says "ideas", "seed the backlog", "what videos could we make", "brainstorm", when define-pillars finds the backlog empty, or when setup-business or readiness names ideas as next.
---

# Seed the ideas

Upstream: audience (`audience.md`), facts (`facts.md`), channels (`channels.md`).
Downstream: pillars, seeds, calendar, assets.
Why now: pillars are a sort of real ideas, not categories invented in the abstract; the story behind an idea is a seed, and which ideas need footage decides the calendar.

Shared shape: `strategy/12-guides.md` ("ideas before pillars", "ideas stay one line until picked"). Types: `strategy/08-video-types.md`. Hooks come from moments: `strategy/02-hooks.md`.

## Before asking anything

1. `npx smma-videos readiness <slug>`. If `audience.md` is `missing`: "I need the audience first, because an idea is a moment that viewer has lived; shall we do it now?" If `facts.md` or `channels.md` is missing, say what that costs ("ideas I propose without facts may not be backable; I'll mark the claim in each") and go on if the person wants. If `draft`, go on.
2. Read `audience.md` (the moments), `facts.md` (what can be backed, what it does not do, roadmap), `channels.md` (which channel each idea would suit), `profile.md`, the site, and any ideas the person has already said in passing in this conversation.
3. Propose **10–20 one-line ideas**, each in this shape: *the viewer's moment, and what the video gives*, with a provisional type and channel. Group them loosely by the viewer's job to be done, not by product feature. Include at least: three how-tos (the product as the tool in hand), two problem-and-fix, one story, one invitation, one origin or explainer, and one for each channel in `channels.md`. Roadmap-only features go in "On hold".

Say: "Here are N ideas. Strike the ones that aren't yours. Add the ones only you would think of. Then I'll give the survivors IDs."

## Questions (two or three a turn)

- "Which three of these would you make first if you had the footage tomorrow?" (Signals pillars later.)
- "What's the one video you've wanted to make for a year?" (Often the origin or a story; add it.)
- "Which of these do you already have clips, screenshots or recordings for?" (Fills the Assets column: `have` / `partial` / `none`.)
- "Any of these two videos in disguise?" (Split; note natural pairs.)
- When the person tells a story in answering: "That's a story idea and a seed; adding both."

## Write the file

`BACKLOG.md` with `## Ideas` as a table (`ID | Idea | Type | Format | Pillar | Slot | Phase | Assets | Status | File`), IDs `V01…` (second track gets its own letter per `audience.md`), Type from `08-video-types.md`, Format short/long, Pillar / Slot / Phase left blank for `define-pillars` and `define-calendar`, Assets `have` / `partial` / `none`, Status `idea`. Plus `## Natural pairs`, `## On hold`, `## Parking lot`, `## Needs the owner`. Remove the template marker. At least three rows; survivors only.

Ideas the person has not reacted to yet stay `[Owner]` in the idea column's end ("… [Owner]") so readiness counts the file as a draft until they strike or keep.

## Refine by correction

Striking is the correction. When the owner adds an idea, write it in their words, infer type and channel, and say so. When an idea reveals a missing fact, add a row to `facts.md` "Needs the owner".

## Finish

- `npx smma-videos readiness <slug>`; show it.
- "Next: pillars, because the schedule picks by pillar share and your N ideas need a first sort. I'll propose the pillars from these ideas, not the other way round."

## Do not

- Write briefs, scripts or hooks here. One line per idea; `make-video` writes the brief when one is picked.
- Propose ideas built on claims not in `facts.md` without marking the claim.
- Propose fewer than ten or more than twenty on the first pass. Ten is enough to sort; twenty is enough to see the pillars.
- Delete a struck idea silently. Move it to the parking lot or say it is gone.
