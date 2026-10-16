# Assets and gaps

Videos here are built from what the business already has. This file says how what exists is inventoried, how a video's needs are mapped onto it, and what happens when a scene has nothing to stand on.

## The inventory

`assets/ASSETS.md` in each business folder, kept by the `inventory-assets` guide and `npx smma-videos inventory <slug>`:

| Column | What goes in it |
|---|---|
| ID | `A##`; the brief refers to assets by ID |
| File / location | path under `assets/`, or a URL; files over 100 MB are linked, not committed |
| Kind | clip, image, screen recording, URL, text, logo, audio, document |
| Duration / size, orientation, audio | from ffprobe |
| What it shows | the owner's words: who, what, where, the moment |
| May publish? | licence; consent of people in frame; anything in frame that cannot be shown (data, plates, prices that will change) |
| Could serve | backlog IDs or pillars this asset could carry |

Sources that are not files (a URL, a paragraph of text, a product page) get rows too: they supply facts, copy, screenshots and the voice.

Rules:

- Nothing is used that is not in the inventory. The build reads assets by ID.
- "May publish?" is a gate. A clip with a stranger's face and no consent is a gap, not an asset.
- Each asset is tagged to the ideas it could serve when it arrives, so the backlog's Assets column (`have` / `partial` / `none`) stays true.

## The asset map

Written by `make-video` after the brief summary, from the type's scene skeleton (`08-video-types.md`) and the inventory. One row per storyboard scene:

```
ASSET MAP — <ID>

| # | Scene | Needs | Have | Status |
|---|---|---|---|---|
| 1 | hook: the moment | clip of the gauge dropping into the chain | A02 (0:00–0:04) | have |
| 2 | signature | the owner, clean, anywhere | A01 | have |
| 3 | the step on screen | the gauge in the chain, the reading | A02 (0:01–0:04) | have |
| 4 | the result | worn cassette close on the bench | — | GAP |
| 5 | CTA | end card in brand style | brand.md | have (text scene) |
```

Statuses: `have`, `partial` (something, not the right thing: a still where motion was needed, the wrong orientation, too short), `GAP`.

The map also says whether the video is buildable at all from what exists, before any gap decisions: "Enough for a 30 s text-and-image cut today; a clip of X would make it a demonstration." It names which gaps hit the type's **must-be-real** scenes, because those change what the video is.

## The gap report and the four decisions

Every `GAP` and `partial` row gets exactly one decision from the person before anything is built. Nothing is built until every row has one.

```
GAP REPORT — <ID>

Buildable now: yes, as a text-and-image cut (~30 s). With gap 4 filled it is the full how-to with the worn teeth on screen.

Gap 4 — the result (must be real for this how-to)
  A  placeholder frame    plain card "[PLACEHOLDER: worn cassette close on the bench]"; renders now, swap later
  B  text scene           the teeth and the rule as a designed card in brand colours (one idea, held to the floor); the video becomes a text-led how-to
  C  leave it out         drop the scene; I rewrite the one idea and the brief summary around what remains and show it again
  D  provide it           shot list: 5 s close of a worn cassette on the bench, 9:16, hands only, natural light; video stays `briefed` until it arrives

Recommended: D, because the hooked teeth are the point of the video.

Say the decision per gap (e.g. "4 D").
```

| Decision | What it is | When it fits |
|---|---|---|
| **A. Placeholder frame** | A plain, clearly marked card (`[PLACEHOLDER: shot of …]`), deliberately boring, so the video renders now and the shot is swapped later. Never published. | iterating on timing and lines before the shoot; internal review |
| **B. Text scene** | The shot is replaced by designed on-screen text that is a real part of the video: brand colours and fonts, one idea per card, fast-in then hold, sequential reveals, numbers as counters, quotes as pull-quotes (`11-text-scenes.md`). | the scene carries a number, a quote, a rule, a name, a step; the type degrades gracefully (how-to, explainer, launch, story's human line) |
| **C. Leave it out** | The scene is dropped. The agent rewrites the one idea and the brief summary around what remains and presents it again for approval. The type may change. | the scene was a must-be-real scene and the person does not want a text version; the material supports a different, honest video |
| **D. Provide it** | A shot list for exactly that scene: what, framing, length, orientation, who is in it, consent. Written to `assets/ASSETS.md` "Missing shots requested". The video stays `briefed` until the file arrives and gets an `A##` row. | the scene is the point of the video |

Rules:

- The report recommends one decision per gap and says why, but the person chooses.
- A must-be-real scene (per type) resolved as B changes what the video is; the report names the new type ("without the fix on screen this is an explainer"). The person can keep the type and choose D, or accept the new type.
- A is never the final state of a published video. If a placeholder is still in the cut at publish time, the pre-publish checklist fails it.
- C always goes back through the brief summary. The one idea may have moved.
- Decisions are recorded in the brief (`videos/<ID>-<slug>/brief.md`, "Gap decisions") and the backlog row moves to `gaps-resolved`.

## Shot lists (decision D)

A shot list here is a request, not a plan for a shoot day. One row per missing scene:

| Column | Example |
|---|---|
| For | <ID> gap 4 |
| What | worn cassette on the bench, close; hooked teeth visible |
| Framing | hands only, natural light at the bench; the teeth fill most of frame |
| Length | 5 s, settled on the worst tooth |
| Orientation | 9:16 |
| Who / consent | the owner's hands only |
| Why it matters | without it the video is an explainer, not a how-to |

When several videos in the backlog are waiting on shots from the same place or day, `video-schedule` groups them into one shoot list so one morning yields the set (`04-formats.md`).

## Working with partial assets

- **Still where motion was needed:** a slow push-in on the still with the caption as a text scene is often enough for a result or a setup; never for the key action of a how-to or a reveal.
- **Wrong orientation:** a landscape clip in a 9:16 video sits in a brand-coloured frame with the caption above or below; never stretched; never blurred-background filler.
- **Too short:** hold the last frame if it is settled; otherwise it is a gap.
- **Audio unusable:** captions and a text scene carry the line; the clip plays muted under music or silence.
- **People without consent in frame:** crop, or it is a gap.
