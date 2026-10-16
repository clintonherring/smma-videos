---
name: define-audience
description: Guide that writes businesses/<slug>/audience.md: the one viewer (a person, not a segment), the moments they have lived, what they believe, the feeling to leave them with, what they would never forgive, and whether a second viewer deserves a second track. Use when the person says "audience", "who is watching", "my viewer", "who is this for", or when setup-business or readiness names audience as next, or when another skill finds audience.md missing.
---

# Define the audience

Upstream: business (`profile.md`).
Downstream: channels, ideas, pillars, every hook.
Why now: a pillar is defined by its viewer, an idea is a moment that viewer has lived, and channels are where that viewer already is.

Shared shape and rules: `strategy/12-guides.md`. Method: `strategy/01-audience-and-voice.md`.

## Before asking anything

1. `npx smma-videos readiness <slug>`. If `profile.md` is `missing`: "I need the business first, because the viewer follows from what is offered and to whom. Shall we do that now (two minutes), or go on and I mark the viewer `[Owner]`?" Do what they say. If `draft`, go on and list the open `[Owner]` items you are building on.
2. Read `profile.md`, the site's testimonials, reviews, FAQ, support pages, community posts, anything with the customer's own words in it.
3. Propose the one viewer in a paragraph, and five moments they have lived, from the evidence. "From your reviews and the FAQ, the person watching is probably X, in the middle of Y. Here are five moments I think they recognise. Strike the wrong ones."

## Questions (two or three a turn, with options)

- **The one person.** "Picture the last customer who got it immediately. Who were they, what were they doing when they found you?" If the person answers with a segment, ask for one individual from it.
- **Moments.** "Tell me three things that have happened to that person that made them look for something like this." Each answer becomes a one-line moment with a specific in it.
- **What they believe.** "What do they think the problem is? What have they tried? What's the objection they'd say across a table?"
- **The feeling.** "When a video of yours ends, how should they feel: capable, recognised, relieved, curious, invited, something else?" One per kind of video if it differs.
- **What they'd never forgive.** "Would explaining [term] insult them, or do they need it explained? What tone makes them switch off?"
- **A second viewer?** "Is there a second person worth their own videos: the buyer vs the user, the tenant vs the landlord, the parent vs the child?" If yes, one paragraph each for the sections above, and a second ID letter for the backlog (`V##` and e.g. `O##`).

## Write the file

`audience.md` with `## The one viewer`, `## Moments they have lived` (6–10 bullets, each with a specific), `## What they already believe`, `## The feeling at the end`, `## What they would never forgive`, `## A second viewer?`, and `## Needs the owner`. Remove the template marker. Moments that were inferred and not confirmed are `[Owner]`.

## Refine by correction

A new story from the owner becomes a moment here and a story in `seeds.md` later; say so. A corrected viewer may move moments between the two tracks; say what moved.

## Finish

- `npx smma-videos readiness <slug>`; show it.
- "Next: facts and voice, because ideas are only worth listing if they can be backed, and I can pull both from your site in one pass. Then channels, because the calendar needs to know where the videos go."

## Do not

- Accept "everyone" or a demographic as the viewer. Ask for a person.
- Invent moments the evidence does not support without marking them `[Owner]`.
- Write more than one feeling per kind of video.
