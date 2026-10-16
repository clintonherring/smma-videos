---
name: absorb-source
description: Evaluates outside material the person points at (a talk transcript, an article, a YouTube video, a repo, another creator's method) and absorbs only the parts that fit. Writes reference/<slug>-notes.md with what it is, a layer-by-layer take / leave table, and where each kept piece landed; then wires the kept parts into the relevant strategy or business file and says what changed. Use when the person shares a link, transcript or repo and says "look at this", "is any of this useful", "take what's good from this", "this creator does X", or when a guide needs outside material evaluated before adopting it.
---

# Absorb a source

Nothing from outside is adopted wholesale. It is read, split into layers, each layer judged against the method and the business, and only the kept parts are wired in, with a note that says where they went so the decision can be revisited.

This move built the original method: a launch-video skill was absorbed for its edit laws and pipeline, a social-media-manager repo for its pillars and phases (and not its reply farming), a speaking-to-camera talk for the out-loud delivery check, a founder's channel opening for the default-and-its-cost hook, and a resume-writing repo for the voice profile. Each left a note; the notes are in `reference/`.

## 1. Read it properly

- Transcript or article: read all of it. Note the claims, the moves (what the author *does*, not just says), and the examples.
- Video link without a transcript: ask for the transcript, or for the person's notes on it. Do not summarise a video from its title.
- Repo: read the README and the files that do the work (skills, prompts, templates). Skip build output and vendored code.
- Keep secrets, personal data and other people's customer names out of the note.

## 2. Split it into layers

A source is never one thing. Separate:

| Layer | Example |
|---|---|
| A principle | "decide the feeling before you record" |
| A structure | pillars with share and metric; a five-move opening |
| A tactic | reply to 50 posts a day |
| A tone or persona | parody startup energy |
| A tool or pipeline | compose → check → render → poster |
| A claim about the platform | "the algorithm weights X" |
| The author's own context | their product, their audience, their jokes |

## 3. Judge each layer

For each layer: **useful to this business and this method? yes / partly / no**, with the reason in one line. The method's own rules are the test (`strategy/00-overview.md` "The rules that run through everything"): one person, evidence before pitch, grounded, sounds like the business, one idea, asset-first. Typical outcomes:

- Principles about attention, readability, delivery, structure: usually **take**.
- Structures (pillars, phases, series, review loops): **take or adapt**; rename to the business's world.
- Tactics that farm engagement, chase trends, automate posting, conceal that an agent is involved, or treat people as cohorts: **leave**, and say why in one line.
- Tone presets and personas: **leave**; the business's `voice.md` is the register, the type is the rhythm.
- Pipelines and tools: **take** if they run here (Node, ffmpeg, Hyperframes) and the output fits; otherwise note the idea and leave the tool.
- Platform claims: **leave** unless the person wants to test them; they age in months.
- The author's own context: **leave**; it is theirs.

## 4. Write the note

`reference/<slug>-notes.md` in this repo (method-level) or `businesses/<slug>/reference/<slug>-notes.md` (business-level), with:

```
# <Source> — notes

What it is: <one paragraph; who, what, when, link>

## Layers

| Layer | What it says / does | Useful to us? | Why |
|---|---|---|---|

## Take
- <piece> → landed in <file §section> as <what it became>

## Adapt
- <piece> → <file> as <renamed / generalised how>

## Leave
- <piece>: <reason in one line>

## Where it landed
<the list of files changed by this absorption, each with one line>
```

## 5. Wire the kept parts in

- Method-level pieces go into the relevant `strategy/` file, in that file's own voice, as rules or rows, not as a quoted block. One source note per file section at most ("Source note: adapted from …").
- Business-level pieces go into the business file they belong to (`voice.md`, `seeds.md`, `pillars.md`, `hooks.md`), marked `[Owner]` where the owner has to confirm them.
- A piece that would change a template or a skill is proposed, not applied, unless the person says to apply it.
- Say what changed, file by file, in the reply.

## 6. Finish

- If the absorption touched a prerequisite file, run `npx smma-videos readiness <slug>`.
- Offer the one thing the source makes possible now ("with the out-loud check in delivery, the next brief gets a delivery check").

## Rules

- Never adopt a tactic because the source is popular. Judge the layer.
- Never paste the source's examples into the business's files. Rewrite them in the business's world or leave them in the note.
- Keep the note short enough to read in two minutes. The layers table is the heart of it.
- Say "leave" out loud with a reason; the person may disagree, and the note is where that conversation happens.
