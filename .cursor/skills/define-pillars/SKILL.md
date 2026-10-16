---
name: define-pillars
description: Guide that writes businesses/<slug>/pillars.md by sorting the existing backlog into 3–5 pillars, each with a viewer, a job, a proposed share, a "working when" signal and the backlog IDs under it (the first sort), then fills the backlog's Pillar column. Refuses to invent pillars from nothing: if BACKLOG.md is empty it runs seed-ideas first. Use when the person says "pillars", "content pillars", "themes", "sort my ideas", "redo my pillars", or when setup-business or readiness names pillars as next.
---

# Define the pillars

Upstream: ideas (`BACKLOG.md`), audience (`audience.md`).
Downstream: calendar, the picking rule, the backlog's Pillar column.
Why now: the schedule picks by pillar share, and a pillar with no ideas under it is a sign the pillar or the concept is not clear yet.

Shared shape: `strategy/12-guides.md` ("ideas before pillars", "proposals carry the owner's mark"). Method: `strategy/09-which-videos.md` §1.

## Before asking anything

1. `npx smma-videos readiness <slug>`.
   - If `BACKLOG.md` is `missing` (template, or fewer than three ideas): say **"I need ideas first, because pillars are a sort of real ideas, not categories invented in the abstract. Shall I propose ten to twenty one-liners now (seed-ideas), or do you want to dictate some?"** Do not produce a pillar list. If the person insists on pillars without ideas, write them with every row `[Owner]` and say the sort will come when the ideas exist.
   - If `audience.md` is `missing`: "I need the audience first, because a pillar is defined by its viewer." Same offer.
   - If either is `draft`, go on and list the open items you are building on.
2. Read `BACKLOG.md` (every idea), `audience.md` (the viewer or viewers, the feelings), `profile.md` (what a video should cause), `channels.md` (which channel each pillar would mostly feed).
3. **Sort first, name second.** Group the ideas by *who they are for* and *what they are meant to do* (make the owner the one who knows; show the thing in use; earn a place in someone else's group; context and trust for people deciding). Name each group in the business's words. Three to five groups; an idea that fits nowhere is either a parking-lot idea or a missing pillar: say which.
4. Present the proposal as the table, with shares and "working when" marked `[Owner]`: "Here is a first sort of your N ideas into four pillars. The shares are my proposal to react to, not a decision. Which pillar name doesn't sound like you? Which idea is in the wrong pillar?"

## Questions (two or three a turn)

- "Of these pillars, which one would you be happiest to be known for?" (It usually gets the largest share.)
- "For each pillar: what would you look at to know it is working?" (saves and watch time; sign-ups; posted in groups without being removed; conversations). Write their words into "Working when".
- "Is there a pillar with nothing under it that you still want? Then we need ideas for it; or is it a topic inside another pillar?"
- "Which pillar mostly goes to which channel?" (Feeds the distribution column later.)

## Write the file

`pillars.md` with `## Pillars` (table: pillar, for, what it is meant to do, share `[Owner]`, working when, backlog IDs first sort), `## Topics under each pillar` (the things the business keeps returning to inside each), `## Rules`, `## Review questions`, `## Needs the owner`. Remove the template marker. Then fill the **Pillar column in `BACKLOG.md`** for every sorted idea and say "backlog columns filled".

## Refine by correction

When the owner supplies a fact or a story that changes a pillar's job, rewrite that pillar and move the affected IDs; say "moved V06 from Show the part to Come in because the viewer there is the hesitant first-timer, not the commuter who already trusts the bench". When a pillar is struck, redistribute its IDs and say where each went.

## Finish

- `npx smma-videos readiness <slug>`; show it.
- "Next: seeds, because a hook is a moment or a gap, and both need a pillar and an ID to be worth keeping; then calendar, because slots are filled by pillar share."

## Do not

- Produce pillars from the profile alone. The backlog is the raw material; the profile is context.
- Write more than five or fewer than three.
- Set shares as decisions. They are `[Owner]` proposals until confirmed, and a period's mix, never a weekly quota.
- Leave an idea unsorted without saying why.
