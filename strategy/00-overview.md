# Overview

The method behind every video this repo helps make. Business-agnostic: the business fills in the viewer, the voice, the facts, the channels and the assets in `businesses/<slug>/`; these docs say how those become a schedule and a video.

## What a video is here

One video speaks to **one person** about **one idea**, for **one feeling**, with **one ask**, and is built from **what the business already has** (clips, images, screen recordings, URLs, text). It is planned by pillar and slot, briefed only when picked, approved as a summary before anything is built, and rendered with every gap in the material resolved on purpose.

```
0–3 s    HOOK        the viewer's moment, with footage of it on screen
3–6 s    SIGNATURE   the line that says whose video this is and who it is for
6–12 s   BRIDGE      one sentence that turns the hook into a promise
12 s +   BODY        one idea, shown (entry → key action → result)
last 5 s CTA         one ask, spoken and on screen
```

That shape is the default for a short. Long form keeps the same opening and expands the body into chapters. Each video type (`08-video-types.md`) adjusts the body and the defaults; the opening stays recognisable.

## The rules that run through everything

1. **Speak to one person.** "You", never "you guys", "everyone", "our community". The viewer watches alone on a phone. The business's `audience.md` names that person; every hook, line and caption is addressed to them.
2. **Evidence before pitch.** The product or service is the tool in hand, shown doing its job, never the subject of a brochure. Problem first, then "so here is what we do".
3. **Specific over general.** A number, a place, a time of day, the real screen. Specific is believable; general is skipped.
4. **Grounded.** Nothing goes on screen that is not in `facts.md` or measured on the day. Tone, framing and jokes may be invented; claims may not.
5. **Sounds like the business.** Every spoken line, hook, caption and text scene passes the voice check in `voice.md`. A line that would not sit in the business's own writing gets rewritten before anyone sees it.
6. **One idea, one feeling, one ask.** If a short needs "and also", it is two shorts. If nobody can say how the viewer should feel at the end, the idea is not clear yet.
7. **Asset-first.** Videos are built around what exists. The gap between what a video needs and what the business has is reported before anything is built, and every gap gets a decision (`10-assets-and-gaps.md`).
8. **Readable and postable.** Text holds to the reading floor; any frozen frame should be postable; the poster is a settled moment baked as frame 0 (`07-edit-fundamentals.md`).

## How the pieces fit

| Question | Where it is answered |
|---|---|
| Who is watching, how do we sound | `01-audience-and-voice.md` and the business's `audience.md`, `voice.md` |
| The first three seconds | `02-hooks.md` |
| The line that says whose video this is | `03-signature.md` |
| How long, what shape, what falls out of one source | `04-formats.md` |
| The ask, the caption, where it goes | `05-ctas-and-publishing.md` |
| How to speak on camera or narrate | `06-delivery-and-narration.md` |
| Timing, readability, show the flow, poster, checklist | `07-edit-fundamentals.md` |
| What kind of video this is, and what each kind needs | `08-video-types.md` |
| Which video next: pillars, slots, phases, picking rule | `09-which-videos.md` |
| What we have, what is missing, what to do about it | `10-assets-and-gaps.md` |
| On-screen text that is part of the video, not filler | `11-text-scenes.md` |
| How the setup guides work and why they run in that order | `12-guides.md` |

## The flow in one line

`setup-business` (readiness) → guides fill `businesses/<slug>/` → `video-schedule` fills the backlog and `SCHEDULE.md` → `make-video` briefs one picked idea and stops at the brief summary, asset map and gap report → `build-video` renders it → the person posts → `PERFORMANCE.md` closes the loop.

## What this repo does not do

- Post, schedule or automate anything on a platform. The schedule is a plan the person executes.
- Farm engagement, chase trends or follow quotas. Reach is borrowed by being useful in places the viewer already is, then owned.
- Pretend a feature, number or price that is not in the facts file.
- Produce one generic video shape. The type decides the shape; the business decides the voice.
