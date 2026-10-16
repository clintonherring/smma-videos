---
name: collect-seeds
description: Guide that writes businesses/<slug>/seeds.md, where hooks come from: content gaps rated 1–10, takes the owner holds and what backs them, the story bank in the owner's words, the saturation map, and series candidates; each tagged to a pillar and backlog IDs. Use when the person says "seeds", "stories", "hooks come from where", "what's missing in my niche", "series", tells a story that should be kept, or when setup-business or readiness names seeds as next.
---

# Collect the seeds

Upstream: pillars (`pillars.md`), ideas (`BACKLOG.md`).
Downstream: hooks at brief time, the saturation filter, series.
Why now: a hook is a moment or a gap, and both need a pillar and an ID to be worth keeping.

Shared shape: `strategy/12-guides.md`. Method: `strategy/09-which-videos.md` §4–5, `strategy/02-hooks.md`.

## Before asking anything

1. `npx smma-videos readiness <slug>`. If `pillars.md` is `missing`: "I need pillars first, because every seed is tagged to a pillar; otherwise the stories pile up untagged. Pillars now, or go on and tag later?" If `draft`, go on.
2. Read `pillars.md`, `BACKLOG.md`, `audience.md` (moments and beliefs), `facts.md` (what it does not do often hides a take), the stories the person has already told in this conversation, and what the niche's content looks like if the person can point at examples.
3. Propose: a first saturation map (what everyone in this niche posts vs what nobody shows), three content gaps with a provisional rating, two takes you can infer from the facts and the profile, and any stories already told, each tagged to a pillar and IDs. "Here is what I think the niche is full of, and what it is missing. Rate the gaps; tell me which takes you'd actually say."

## Questions (two or three a turn)

- **Gaps.** "What do people in your niche never show: the cost, the mess, the decision, the failed attempt?" Rate each 1–10 for room and for how well placed the business is.
- **Takes.** "What do you believe about this work that most people in it would argue with? What number or moment backs it?" A take without backing is an opinion; write the backing or mark `[Owner]`.
- **Stories.** "Tell me about a morning this actually happened." Two sentences in their words: what happened, the lesson. Then: "Is there footage, a photo, or would you tell it to camera?" (Feeds the asset map later.)
- **Series.** "Is there a shape you could repeat ten times: one job one number; what it cost me; who's got me today?" A series needs three episodes planned before the first goes out; name three IDs or it is a candidate only.

## Write the file

`seeds.md` with `## Content gaps` (gap, what exists instead, why we can fill it, opportunity `[Owner]`, backlog IDs), `## Takes` (take, backed by, said in), `## Story bank` (#, what happened, the lesson, use in, footage?), `## Saturation map`, `## Series` (`[Owner]` names, episode shape, feeds pillar, episodes), `## Needs the owner`. Remove the template marker. Stories not yet in the owner's words stay `[Owner]`.

## Refine by correction

Every story the owner tells in any later conversation comes here (and to `facts.md` if it carries a number). When a take is used on camera, fill "Said in" with the ID. When a gap closes (a video filled it), note the ID and lower the rating.

## Finish

- `npx smma-videos readiness <slug>`; show it.
- "Next: calendar, because slots are filled by pillar share, cadence comes from channels, and which ideas need footage decides where they can sit."

## Do not

- Write stories in the agent's words. The owner's sentences, lightly tidied, or `[Owner]`.
- Rate gaps yourself as final. Propose, then the owner rates.
- Turn seeds into hooks here. Hooks are written in the brief, for one video, from these.
