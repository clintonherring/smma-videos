# Audience and voice

The business's own answers live in `businesses/<slug>/audience.md` (who is watching) and `voice.md` (how the business talks). This file is the method those two files follow, and the rules that hold for every business.

## The one viewer

A video is written for one person, not a segment. "Small business owners" is a segment. "The owner who closed the till at nine and is now doing invoices on the kitchen table" is a viewer. The `define-audience` guide gets to that person by asking for **moments they have lived**, because moments are where hooks come from.

What `audience.md` holds, and why each part matters downstream:

| Section | What it is | Used by |
|---|---|---|
| The one viewer | One person, described so you could pick them out of a room | every hook, the signature line, the pillar's "for" column |
| Moments they have lived | 6–10 concrete moments, each a sentence with a specific in it | hooks (`02-hooks.md`), ideas (`seed-ideas`), the story bank |
| What they already believe | What they think the problem is, what they have tried, what they assume about businesses like this one | the room (`02-hooks.md`), comparison and problem-and-fix videos |
| The feeling at the end | How this person should feel when a video of ours ends | the one feeling per video (`06-delivery-and-narration.md`) |
| What they would never forgive | Jargon level (too much or too little), tone they distrust, things that read as a pitch | the voice check, the vet step |
| A second viewer? | Whether a second person deserves a second track (own ID letter, own signature) | backlog IDs, pillars |

Rules:

- **Jargon follows the viewer.** If the viewer is a professional, use their words and do not explain them; explaining signals you are not talking to them. If the viewer is the public, the real names and numbers go in captions and the spoken line stays plain.
- **Two viewers is two tracks.** Same material, two videos, two signatures. A video that tries to serve both serves neither. The second track gets its own ID letter in the backlog.
- **The viewer is never "in the room".** When a video names how most people do it ("most shops still…"), the viewer is standing next to the business looking at the room, never inside it. See `02-hooks.md`, "The room".

## The voice

The business already has a voice: its website, guides, emails, product copy, the way the owner answers a question. The `business-voice` guide calibrates from that writing rather than inventing a tone, and writes `voice.md` with:

| Section | What it holds |
|---|---|
| How they write | 5–8 observed habits with a quoted example each: sentence length, how claims are hedged, whether reasons follow claims, which pronouns, what they never say |
| We say / not | The words they use for their things, and the words they do not (their "subject" vs "target") |
| Slogan to sentence | Lines that sound like marketing on the left, the same thing said the way they would say it on the right |
| Signature line | The recurring 3–6 s opening and its approved variants (`03-signature.md`) |
| Who speaks | Owner on camera, a named person, a narrator, captions only, or a character; and the rules for each |
| Check before handing a line back | The 4–6 questions every line must pass |

Universal rules that go into every `voice.md` unless the business's writing says otherwise:

- **Peer, not vendor.** "I built this because I…" beats "We offer…". Lead with the need, then the thing.
- **Plain statement, then the reason.** A claim is followed by its "because" in the same breath.
- **Numbers are hedged and conditional.** "About 20 minutes, depending on…" beats a round number with no condition.
- **Trade-offs stated.** The cost of the good option is said out loud. People trust businesses that state limits.
- **No hype.** No exclamation marks, no "game-changer", no "simply", no "powerful", no "we are thrilled". Strong words are earned: "reliable", "useful", "acceptable when".
- **Pronouns.** "You" singular. "I" for the person speaking. "We" for the people on the job, or for me-and-you ("we don't have to"); never "we" meaning the company as an institution.

## Language rules (starting table)

Every `voice.md` gets a table like this, filled with the business's own words. The left column comes from their writing; the right column from the things they would cringe at.

| Say | Do not say |
|---|---|
| "you", "your shop", "your morning" | "you guys", "customers like you", "everyone" |
| "I built this because I…" | "[Business] offers…" |
| "here's what it looks like on the screen" | "the platform features…" |
| "it costs €X, free for the first month" | "affordable pricing plans" |
| the business's words for its things | the industry's marketing words for the same things |

## What to leave out

- The owner's name in the first ten seconds. It is in the caption and the channel; the signature line carries identity.
- The product name before the problem.
- "Like and subscribe" in the first half. One CTA, at the end.
- Anything the viewer would never forgive (from `audience.md`).

## Where the voice is enforced

- `make-video` loads `voice.md` before writing any hook, line, abstract, bridge or caption, and runs the "check before handing a line back" on each.
- `build-video` runs the same check on every text scene and caption before composing.
- `video-fundamentals` fails a cut whose lines read as a presenter or a slogan.
