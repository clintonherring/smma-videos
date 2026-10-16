# Audience and voice

The business's own answers live in `businesses/<slug>/audience.md` (who is watching) and `voice.md` (how the business talks). This file is the method those two files follow, and the rules that hold for every business.

## The one viewer

A video is written for one person, not a segment. "Small business owners" is a segment. "The owner who closed the till at nine and is now doing invoices on the kitchen table" is a viewer. The `define-audience` guide gets to that person by asking for **moments they have lived**, because moments are where hooks come from.

What `audience.md` holds, and why each part matters downstream:

| Section | What it is | Used by |
|---|---|---|
| The one viewer | One person, described so you could pick them out of a room | every hook, the signature line, the pillar's "for" column |
| Moments they have lived | 6–10 concrete moments, each a sentence with a specific in it | hooks (`02-hooks.md`), ideas (`seed-ideas`), the story bank |
| What they already believe | What they think the problem is, what they have tried, what they assume about businesses like this one | "the default and its cost" hooks (`02-hooks.md`), comparison and problem-and-fix videos |
| The feeling at the end | How this person should feel when a video of ours ends | the one feeling per video (`06-delivery-and-narration.md`) |
| What they would never forgive | Jargon level (too much or too little), tone they distrust, things that read as a pitch | the voice check, the vet step |
| A second viewer? | Whether a second person deserves a second track (own ID letter, own signature) | backlog IDs, pillars |

Rules:

- **Jargon follows the viewer.** If the viewer is a professional, use their words and do not explain them; explaining signals you are not talking to them. If the viewer is the public, the real names and numbers go in captions and the spoken line stays plain.
- **Two viewers is two tracks.** Same material, two videos, two signatures. A video that tries to serve both serves neither. The second track gets its own ID letter in the backlog.
- **The viewer is never the one doing it wrong.** When a video names how most people do it ("most shops still…"), the viewer stands next to the business looking at those people, never among them. See `02-hooks.md`, "The default and its cost".

## The voice

The business already has a voice: its website, emails, captions, quotes, the way the owner answers a question. The `business-voice` guide builds a **voice profile** from samples of that writing (the `my-voice` method from `clintonherring/skills`), rather than inventing a tone or applying someone else's habits. `voice.md` holds:

| Section | What it holds |
|---|---|
| Built from | The samples the profile was read from: their own, unedited by a copywriter |
| Patterns to copy | 5–8 observed habits, each with a quoted example: sentence shape, the verbs they use, how they handle numbers and names, how they explain a reason, how they address the reader, what they never do |
| Their phrases | Recurring phrases, verbatim; the only ready-made lines that may be put in their mouth |
| Words and shapes to avoid | Marketing-speak that sounds false in their mouth; their trade's words they do not use; noun fragments, passive voice, slogans, group address |
| Rewrite examples | Marketing lines about their real work on the left, the same thing as they would say it on the right; grows every time they say "that doesn't sound like me" |
| Signature line | The recurring 3–6 s opening, in their patterns (`03-signature.md`) |
| Who speaks | Owner on camera, a named person, a narrator, captions only, or a character; and the rules for each |

How the person hedges numbers, whether they put the reason before or after the claim, how dry or warm they are, whether they state trade-offs: all of that is **read from their samples**, not prescribed. One business writes "about 8 hectares, depending on the field"; another writes "€39. That's the price." Both are right for their owner.

The test that holds for everyone: *would the person who speaks for this business say this line out loud to one customer across the counter?*

## What holds for every business

The few rules that do not depend on the voice, because they come from the medium (one viewer, a phone, a stranger) rather than from the person:

- **One person addressed.** "You" singular. No "you guys", "everyone", "community", "[profession]s". "We" is the people on the job or me-and-you, never the company as an institution.
- **Peer, not vendor.** The speaker is someone who does what the viewer does, has what the viewer has, or has been where the viewer is. "I built this because I…" beats "[Business] offers…".
- **Grounded.** Every number, name, price and capability is in `facts.md`, said the way the profile says they say numbers.
- **No hype.** No exclamation marks, no superlatives, no "game-changer", no "we are thrilled", unless the samples show the person genuinely writes that way, in which case it goes in the profile and the viewer's "what they would never forgive" decides.
- **No slogan.** If a line could be printed on any business's van, it is not a line for this video.
- **Show, then say.** The thing on screen first; the line about it second.

## What to leave out

- The owner's name in the first ten seconds. It is in the caption and the channel; the signature line carries identity.
- The product name before the problem.
- "Like and subscribe" in the first half. One CTA, at the end.
- Anything the viewer would never forgive (from `audience.md`).

## Where the voice is enforced

- `make-video` loads `voice.md` before writing any hook, line, bridge or caption, and runs `business-voice` mode 2 (the line check) on each.
- `build-video` runs the same check on every text scene and caption before composing.
- `video-fundamentals` fails a cut whose lines read as a presenter or a slogan.
