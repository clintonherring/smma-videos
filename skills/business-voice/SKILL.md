---
name: business-voice
description: Builds and maintains the voice profile businesses/<slug>/voice.md from samples of the business's own writing (URLs, documents, pasted text, their own captions and emails), then applies it so every hook, spoken line, caption, text scene and share caption reads like they wrote it. Three modes: build the profile (a setup guide), apply the voice (the line check loaded by make-video and build-video), add a sample. Use when readiness names voice as next, when the person says "build my voice", "that doesn't sound like me", "write this the way I'd say it", asks to add a writing sample, or when a line reads as a slogan.
---

# The business's voice

Adapted from the `my-voice` skill in [clintonherring/skills](https://github.com/clintonherring/skills) (job-post-resume-writer): a portable voice profile built from a person's own writing, read back and corrected in chat, applied before anything is written in their name. Here the person is whoever speaks for the business, and the things written are video lines.

Upstream: business (`profile.md`).
Downstream: ideas, every spoken line, hook, caption, text scene and share caption.
Why now: a hook or caption that does not sound like the business gets rewritten anyway; building the profile once from their own writing is cheaper than correcting every line.

Shared guide shape: `strategy/12-guides.md`. Method: `strategy/01-audience-and-voice.md` (the voice section), `strategy/03-signature.md`.

## The test

Every line written in the business's name must pass: *would the person who speaks for this business say this out loud to one customer across the counter?* If not, rewrite it until they would. Nothing else in this skill overrides that.

## Where things are

- `businesses/<slug>/voice.md`, from `templates/business/voice.md`. The template marker on line 1 means the profile has not been built; `readiness` reports it as `missing`.
- Samples the owner agrees to keep: `businesses/<slug>/voice-samples/` (plain text or markdown, one file per sample). URLs are listed in `voice.md` "Built from" instead of copied.
- Helpers: `npx smma-videos extract-text <file-or-url>` (plain text of a `.docx`, `.html`, URL, or `.pdf` via pdftotext) and `npx smma-videos voice-profile <sample> [<sample> …]` (sentence length, first-person share, the verbs they reach for, recurring phrases, hedges, marketing-speak they actually use, exclamation marks).

## Mode 1: build the profile (the setup guide)

### Before asking anything

1. `npx smma-videos readiness <slug>`. If `profile.md` is `missing`, offer to do the business first (two minutes) or go on with `[Owner]`.
2. Gather what already exists without asking: the site pages named in `profile.md` "Sources", any text or links the person has already given, and the way they described the business in this conversation (that is a sample too). `collect-facts` reads the same material; if it has not run, offer the one pass: "while I'm reading your site I can pull both the claims and how you write."

### Collect samples

Ask for three or more pieces of writing that are **theirs and unedited by others**: the page on the site they wrote themselves, an email answering a customer, captions from their own channel, a quote or proposal, messages to a colleague, a guide or FAQ they wrote. Accept URLs, file paths or pasted text. Skip anything a copywriter, an agency or a template wrote for them; if the whole site was written by an agency, say so and lean on their emails and captions. For a file or URL run `extract-text`; if it fails, ask them to paste.

### Read, then profile

1. **Read every sample in full.** Note sentence length, first or third person, the verbs they reach for, how they introduce numbers and names, how they explain a reason, how they address the reader, what they never do (exclamation marks, buzzwords, superlatives, hedging).
2. **Run the profiler** on all samples at once: `npx smma-videos voice-profile voice-samples/*.md`. Use it to confirm or correct what you read; do not paste its output into `voice.md`.
3. **Say what you found before asking anything**: "From your services page, your captions and the email you forwarded, here is how you write: 1… 2… 3…, each with a line of yours as the example. Here are five phrases you keep using. And here are the words I will never put in your mouth."

### Questions (two or three a turn, never a questionnaire)

- **Confirm the patterns.** Show the 5–8 observed habits with quotes; ask which one is wrong.
- **Rewrite examples.** Show three marketing-sounding lines about their real work and your rewrite in their patterns; ask them to pick the column they prefer in each. If they prefer the left column, your reading of their voice is wrong: go back to the samples.
- **Who speaks.** On camera themselves, a named person, a narrator, captions only, or a character? (`strategy/06-delivery-and-narration.md`.)
- **The signature line.** Propose one in their patterns, from their phrases where possible, plus a variant per second viewer in `audience.md` and a presence line for long form (`strategy/03-signature.md`). Ask them to say it out loud; if it feels wrong in their mouth, rewrite.

### Write the file

Follow the template section by section: `## Built from` (the samples, listed), `## Patterns to copy` (quoted), `## Their phrases` (verbatim), `## Words and shapes to avoid` (keep the generic marketing-speak list unless the profiler shows they use a word themselves), `## Rewrite examples` (three, from their real work), `## Signature line`, `## Who speaks`, `## Needs the owner`. Proposals they have not confirmed stay `[Owner]`. Remove the template marker once the file is written.

### Read it back and correct it

Read it back section by section: "Is this how you talk? What is wrong?" Apply corrections in the file, not in the chat. The signature line stays `[Owner]` until they have said it out loud and kept it. The row is `draft` until every `[Owner]` and every "Needs the owner" item is gone.

### Finish

- `npx smma-videos readiness <slug>`; show it. Tell them how to add samples later ("add a writing sample").
- "Next: channels, because an idea for a group and an idea for LinkedIn are different ideas, and the CTA depends on where the video goes."

## Mode 2: apply the voice (the line check)

Loaded by `make-video` before the vet and by `build-video` before captions and text scenes are set. Before handing back any hook, spoken line, caption, share caption or text scene:

1. Read `businesses/<slug>/voice.md` first, every time.
2. Draft, then run each sentence against **Patterns to copy** and **Words and shapes to avoid**: replace any word from the avoid list; break noun fragments into sentences; put the verb they would use; address one person the way they do.
3. Keep **Their phrases** where they fit; never add phrases that are not in the profile or the samples.
4. Numbers, names and claims come from `facts.md`, said the way the profile says they say numbers (rounded, exact, with a condition).
5. Run the test: would they say it out loud to one customer? Then the generic checks that hold for every business (`strategy/01-audience-and-voice.md`): one person addressed, no group address, no hype, no slogan, no "we" meaning the company as an institution.

A line that fails is rewritten before the person sees it. When a rewrite needs a fact or a story only the owner has, hand it back marked `[Owner]` with the question.

Until `voice.md` is built, the generic checks alone apply, and the brief says so under "Still open".

## Mode 3: add a sample, update, "that doesn't sound like me"

- **"That doesn't sound like me"** on any line: ask them to say the point out loud in their own words, write that down verbatim, and add the pair (your line, their line) to **Rewrite examples**. If a pattern produced the miss, rewrite the pattern. Over time that table is the voice.
- **"Add a writing sample" / "update my voice"**: extract the new sample into `voice-samples/`, re-run the profiler on all samples, and amend the profile: add phrases, adjust patterns, append rewrite examples. Never remove a correction the owner made earlier without asking.

## Boundaries

- The profile records how they write, not what they have done or offer. Facts belong in `facts.md`.
- Do not copy whole sentences from the samples into a video; copy the shape and the vocabulary. The signature line is the one deliberate exception, and it is theirs.
- Describe the voice in habits with quotes, never in adjectives.
- A character's voice (mascot, robot, named employee) is its own section under "Who speaks"; technical captions stay in the business's plain register.
- Private samples stay in the business folder; nothing from them is written into this skill.
