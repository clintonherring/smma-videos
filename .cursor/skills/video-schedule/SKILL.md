---
name: video-schedule
description: Keeps the backlog and the posting schedule for businesses/<slug>. Takes a new idea into BACKLOG.md (next ID, type, pillar, slot, phase, assets, status idea), runs the picking rule to say "make this next, because", fills SCHEDULE.md slots from pillar shares and the calendar, moves statuses (idea → briefed → gaps-resolved → built → published), groups outstanding shot requests into one shoot list, logs performance and runs the diagnostic. Use when the person says "I have an idea", "add to the backlog", "what should I make next", "schedule", "plan the month", "this one is published", "how did it do", or "review the period".
---

# Video schedule

The backlog is where ideas wait as one line each; the schedule is where picked IDs get a date. Nothing here writes a brief: that is `make-video`, when an idea is picked.

Read first: `strategy/09-which-videos.md` (pillars, slots, phases, saturation, series, distribution, the picking rule, the review). Business files: `pillars.md`, `calendar.md`, `channels.md`, `seeds.md`, `BACKLOG.md`, `SCHEDULE.md`, `PERFORMANCE.md`, `assets/ASSETS.md`.

## Readiness gate

Run `npx smma-videos readiness <slug>` first. The schedule tier needs business, audience, channels, ideas, pillars, seeds, calendar.

- `blocked`: show the readiness output, say which guide comes next and why, and offer to run it. Backlog intake (below) still works on a blocked folder; an idea is never refused for lack of setup.
- `draft`: go on, and list the `[Owner]` items you are planning on top of (usually shares, dates, exit numbers).

## 1. Backlog intake ("I have an idea: …")

1. Write the idea as one line in the shape *the viewer's moment, and what the video gives*, in the owner's words where possible.
2. Next free ID (`V##`; a second track has its own letter per `audience.md`).
3. Infer and state: type (`strategy/08-video-types.md`), format, pillar (whose viewer is it written for), slot (does it need footage from a season or event, or do the assets exist), phase (eligible now or later), assets (`have` / `partial` / `none` from `ASSETS.md`), channel.
4. If the idea carries a story or a number: add the story to `seeds.md` and the number to `facts.md` "Needs the owner"; say so.
5. Append the row with status `idea`. If it is roadmap-gated, "On hold". If it is a second video in disguise, two rows and a "Natural pairs" note.
6. Hand back: "V09 added: <line>. Reads as a problem-and-fix for the peer, pillar Workshop knowledge, Cadence wk 1 (needs a clip of the noise on the stand), phase 1, assets partial. Want the picking rule on it now?"

Never write more than the one line. The brief is written when the idea is picked.

## 2. Picking rule ("what should I make next?")

Run the checklist from `09-which-videos.md` §7 on the candidates (every `idea` row eligible in the current phase, plus anything the person names):

```
PICK — <ID>
Pillar · Slot · Phase · Saturation · Series · Distribution · Cross-over · Seeds · Assets
→ Make this next, because <one sentence>.   (or: not yet, because <one sentence>)
```

Rank by: pillar under its share this period → material exists (assets `have` beats `none`; a shoot is a cost) → phase eligibility → under-served over saturated → a series needing its next episode. Say the top three with their one sentence each, and write the chosen one into `SCHEDULE.md` "Next up". A "not yet" never blocks the owner; record the reason it jumps the queue if they insist.

## 3. Fill the schedule ("plan the month / the season")

1. From `calendar.md`: the slots in the period and their dates; from `channels.md`: the cadence and primary channel; from `pillars.md`: the shares.
2. Compute how many videos the period holds (cadence × weeks) and how many per pillar (share × count, rounded; say the rounding).
3. Fill each slot with an ID by the picking rule, alternating pillars (and tracks) so no channel sees three of the same in a row; leave a slot empty with its pillar named when nothing eligible exists, and say what would fill it (an idea to seed, a shot to provide).
4. Write `SCHEDULE.md`: "Slots" table (date / week, slot, pillar, ID, channel, status), "Pillar balance this period" (target share, planned, published), "Next up".
5. Hand back the plan with the three things that would most improve it ("two Peak slots are empty because no footage exists for V12 and V15; one morning with the phone would fill both").

## 4. Shoot list (when several IDs wait on footage)

Collect every row in `assets/ASSETS.md` "Missing shots requested" plus every backlog row with assets `none` in the next two slots, group by place and day, and write one shoot list: what, framing, length, orientation, who, consent, which IDs it unlocks. Hand it back as the one thing that unblocks the most videos.

## 5. Status moves

| Event | Backlog status | Also |
|---|---|---|
| `make-video` writes the brief summary | `briefed` | File column → `videos/<ID>-<slug>/brief.md` |
| every gap has a decision (no D outstanding) | `gaps-resolved` | |
| `build-video` renders | `built` | |
| the person posts it | `published` | `SCHEDULE.md` slot status; one `PERFORMANCE.md` row per channel, date filled, numbers blank |
| a D shot arrives | stays `briefed` → `gaps-resolved` once nothing else is outstanding | `inventory-assets` clears the request |

Move the row when the event happens; never batch.

## 6. Performance ("how did it do?" / "this one is published")

- On publish: create the rows (one per channel) with the date, the pillar, the channel, and the one number's name from `profile.md`.
- A week and a month later: fill views, completion, saves / shares, the comment that mattered, the attributable result, and the one-line learning. "Attributable" means the person said so or the link was the one in that caption.
- If it is not working: run the table in `PERFORMANCE.md` "If a video is not working" top down; name the one symptom, the one probable cause, and the one fix (an alternate hook from the brief; one ask; the real shot instead of a text scene). One fix per re-cut; the re-cut is its own row.

## 7. Review once a period

When `calendar.md` says the period ends (or the person asks), answer the questions in `09-which-videos.md` §8 from the log, write them dated at the bottom of `PERFORMANCE.md`, and propose changes to shares in `pillars.md` and ratings in `seeds.md` as `[Owner]` edits. Add anything the period produced that is not in the backlog, with a slot.

## Do not

- Write briefs, hooks or scripts here.
- Refuse an idea because setup is incomplete. Take it; say what is missing.
- Set a slot for a footage-dependent idea in a slot where the footage cannot exist.
- Invent numbers in the performance log. Blank beats guessed.
- Automate posting, or suggest tools that do. The schedule is executed by a person.
