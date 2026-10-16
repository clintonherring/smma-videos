---
name: business-voice
description: Two jobs. (1) Guide that writes businesses/<slug>/voice.md by calibrating on the business's own writing: observed habits with quoted examples, a "we say / not" table, slogan-to-sentence pairs, the signature line and variants, who speaks, and the line check. (2) The line check itself, loaded by make-video and build-video before any hook, spoken line, abstract, caption or text scene is written. Use when the person says "voice", "how we sound", "that doesn't sound like me", "signature line", when a line reads as a slogan, or when readiness names voice as next.
---

# The business's voice

Upstream: business (`profile.md`).
Downstream: ideas, every spoken line, hook, caption and text scene.
Why now: a hook or caption that does not sound like the business gets rewritten anyway; calibrating once is cheaper than correcting every line.

Shared shape: `strategy/12-guides.md`. Method: `strategy/01-audience-and-voice.md`, `strategy/03-signature.md`.

## Part 1: the guide (writing `voice.md`)

### Before asking anything

1. `npx smma-videos readiness <slug>`. If `profile.md` is `missing`, offer to do the business first (two minutes) or go on with `[Owner]`.
2. Read their writing: site copy, guides, FAQ answers, product descriptions, posts, emails or messages they give you, and the way they described the business to you in this conversation. The more of their own sentences the better. Keep 10–20 verbatim excerpts in `voice-excerpts.md` next to `voice.md` if there is enough.
3. Calibrate and state: "From your guides and FAQ, here is how you write: 1… 2… 3…, each with a line of yours as the example. And here are five words you use for your things, and five you never use."

### Questions (two or three a turn)

- **Confirm the habits.** Show the 5–8 observed habits with quotes; ask which one is wrong.
- **We say / not.** "You call it a 'subject', not a 'target'. What else do people call wrong?"
- **Slogan to sentence.** Show three marketing-sounding lines about their business and your rewrite in their habits; ask them to fix the rewrites. Their corrections are the best calibration you will get.
- **Who speaks.** "On camera yourself, a named person, a narrator, captions only, or a character?" If a character: first-person, present tense, never explains stakes, never sells (`strategy/06-delivery-and-narration.md`).
- **The signature line.** Propose one per viewer in `audience.md` using the three parts (who I am · what we share · "like you" or its equivalent), plus three variants and a presence variant for long form. Ask them to say it out loud; if it feels wrong in their mouth, rewrite.

### Write the file

`voice.md` with `## How they write` (numbered habits with quotes), `## We say / not`, `## Slogan to sentence`, `## Signature line` (table: viewer, line; then variants; then "not approved"), `## Who speaks`, `## Check before handing a line back`, `## Source material`, `## Needs the owner`. Remove the template marker. The signature line is `[Owner]` until they have said it out loud and kept it.

### Refine by correction

"That doesn't sound like me" is the trigger. Ask for their version of the line, add the pair to "Slogan to sentence", and rewrite the habit that produced the miss. Over time this table is the voice.

### Finish

- `npx smma-videos readiness <slug>`; show it.
- "Next: channels, because an idea for a group and an idea for LinkedIn are different ideas, and the CTA depends on where the video goes."

## Part 2: the line check (used by every writing step)

Before handing back any hook, spoken line, abstract, bridge, caption, share copy or text scene, read `businesses/<slug>/voice.md` and run its "Check before handing a line back". The default check, used until the business's own is written:

- Does it say *when* this applies and *what limits it*, or does it declare?
- Is any number hedged or conditioned the way the business hedges?
- Is the reason in the sentence ("because", "this means")?
- Would it sit next to a paragraph from their own site without a change of tone?
- Would they say it to one customer across a table (`strategy/06-delivery-and-narration.md`, the coffee shop rule)?
- Does it leave the other way its place (`strategy/02-hooks.md`, the room)?
- Is it addressed to one person; no "guys", "everyone", "community"; no "we" meaning the company?

A line that fails is rewritten before the person sees it. When a rewrite is not possible without a fact or a story only the owner has, hand back the line marked `[Owner]` with the question.

## Do not

- Describe the voice in adjectives ("friendly, professional"). Habits with quotes only.
- Invent a signature line that claims a peer identity the viewer does not share.
- Apply a character's voice to technical captions; those stay in the business's plain register.
