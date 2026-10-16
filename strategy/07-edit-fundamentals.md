# Edit fundamentals

Timing, readability, what to show, the poster, and how to know a cut is done. Adapted from the planning and composition laws of [latent-spaces/brag](https://github.com/latent-spaces/brag), with the launch packaging removed. The strategy docs own hooks, signature, voice and audience; this file owns the edit.

## Creative laws

1. **The hook is everything.** The first 2 seconds decide whether anyone keeps watching. Plan it before anything else; the first frame is the moment, not a card.
2. **Show the thing.** At least one scene shows the product or the work *doing its job*: the screen, the hands, the result arriving. Not a diagram of what it does. Not abstract filler.
3. **Specific.** The video feels made for this exact business, problem and person. Real numbers, real names (from `facts.md`), real UI. No "streamline your workflow".
4. **Readable.** Pace comes from motion and cuts, never from pulling text off screen early. Fast-in, then hold.
5. **Ground every claim.** Names, numbers, capabilities, prices, ranges: only what is in `facts.md` or was measured on the day. Tone, framing and jokes may invent; claims may not.
6. **Funny earns its place.** Humour comes from the material (the gap between the work and how someone sees it), never from trying.
7. **Every frozen frame should be postable.** Pause anywhere: if it is mid-transition, a half-readable caption, or an empty frame with no subject, the cut is not done.
8. **Clear after one viewing.** A stranger who finishes the short knows what the problem was, what you did, and what to do next.

## Reading-time floor

Applies to spoken captions, technical captions, text scenes, and any on-screen text the viewer must read. Texture text (UI chrome that is not the point) is exempt.

| Text | Settled time on screen (fully in, not yet exiting) |
|---|---|
| Short label, 1–3 words | ~0.8 s |
| Headline or full sentence | ~0.3 s per word, minimum ~1.2 s |
| Hook line | the most generous hold of the video |
| Text scene carrying the idea (`11-text-scenes.md`) | the sentence floor plus ~0.5 s |

Entrances and exits stay snappy (0.3–0.6 s). A line can slam in fast and then hold; that reads as punchy and legible.

Design out two failures at the plan stage:

- **Too much text for the scene length.** A 4 s scene lands 2–3 short reads, not 6. Cut copy or split the scene; never speed up.
- **Sequential text on a fast beat.** Lines arriving every 0.5 s outrun reading. Reveal quickly and hold the full set, or space readable lines further apart. Non-text accents may still tick fast.

When a technical caption and a spoken line fight for the same two seconds, cut one or hold longer.

## Show the flow, not the brochure

The strongest material is the work **in use**:

```
entry → key action → result
```

| Business | Entry | Key action | Result |
|---|---|---|---|
| Search tool | marker dropped on the controller | walker taps "send" on her phone | robot at the spot; walker flags it |
| Bike repair | bike wheeled in, the noise | the part found, the fix | the ride home, quiet |
| Bookkeeping app | the shoebox of receipts | photo, categorised | the quarter's number on screen |
| Bakery | 4 a.m., dough | the oven, the turn | the tray out; the first customer |

Prefer these over feature cards, pricing slides, "how it works" diagrams, or a talking head explaining without the thing in frame. Stat cards and text scenes still have a place: at most one beat, as a frame around the flow, not a substitute (the launch type is the one exception; `08-video-types.md`).

## Sequential and interaction moments

Before locking a storyboard, ask: **what can appear one by one, and what action can be shown rather than described?** A thing appearing on one screen then another, results arriving with a verdict each, a thumb tapping the button, a finger on the dial. Commit to them in the storyboard ("3 verdicts appear one by one") rather than hoping the edit finds them.

## Pacing comes from the type

Pacing (beat count, hold length, transition vocabulary) is set per video type in `build-video/type-profiles.md`, derived from this table. There are no tone presets; the business's voice sets the register, the type sets the rhythm.

| Type | Beats (short) | Holds | Transitions |
|---|---|---|---|
| How-to | 3–5 | comfortable; room to read the step | soft cut / match cut to the screen |
| Comparison, problem and fix | 4–6 | punchy; one claim each | harder cuts; before, then after |
| Reveal | 4–5 | the thing holds; text does not | cut on the action |
| Launch | 4–6 | text-forward; headline holds, accents move | clean wipes, slides |
| Story, invitation | 3–5 | warm; the human line holds | soft; footage first |
| Explainer, origin, offer | 3–5 (short) / chapters (long) | restrained; captions carry numbers | clean; no chaos |
| Walkthrough | chapters | breathing room; cold open holds | cut on action between viewpoints |

## Poster and first frame

Platforms grab **frame 0** as the idle thumbnail. Do not leave it to a fade, a black field, or mid-animation text.

1. Pick the strongest **settled** moment (hook line fully in, or the result, or the worn part on the bench).
2. Extract that frame as the poster (`npx smma-videos poster <video> <t>`).
3. Bake it as frame 0 of the delivered file (pixels of frame 0 only; duration, frame count and audio unchanged). The same command does this.
4. Keep the poster image alongside for platforms that accept a custom thumbnail.

Rule of thumb: if the poster alone were a photo post, would the one viewer stop scrolling?

## Pre-publish checklist

- [ ] Hook planned first; first 2 seconds are the moment, not a title card
- [ ] Signature is the right peer line for this viewer
- [ ] One idea (short) or clear chapters (long)
- [ ] Centrepiece shows entry → key action → result, not a brochure
- [ ] Every on-screen claim is in `facts.md` or measured on the day
- [ ] Reading-time floor met for every line the viewer must read
- [ ] Technical captions and spoken lines do not fight
- [ ] Every gap in the asset map has its decision applied (no unplanned placeholder reached the render)
- [ ] Text scenes are in brand colours and fonts, one idea each, and look like part of the video
- [ ] People, roles and claims on camera match the facts
- [ ] Poster is a settled frame, baked as frame 0
- [ ] Caption is hook, signature, 1–2 sentences, one CTA
- [ ] Any frozen frame is postable
