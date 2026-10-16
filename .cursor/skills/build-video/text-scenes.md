# Text scenes and placeholders in the composition

The rules are in `strategy/11-text-scenes.md`. This file is how they land in Hyperframes. Two starter sub-compositions ship with this skill:

| File | Gap decision | Look | Purpose |
|---|---|---|---|
| `compositions/text-scene.html` | B (and frame cards, signature, CTA) | brand colours, display type, one entrance | a real scene of the video |
| `compositions/placeholder.html` | A | grey, monospace, dashed border, `[PLACEHOLDER: …]`, "not for publishing" | marks a missing shot; must look unfinished |

Both are **sub-compositions**: a timed `<div>` in `index.html` with `data-composition-src` mounts the file and passes variables. Hyperframes lints nested children inside a timed element ("use a sub-composition"), so text never goes inline in the main composition; it goes through these files.

## Mounting

```html
<!-- a designed card, 3 s -->
<div class="clip" data-start="3" data-duration="3" data-composition-id="ts1"
     data-composition-src="compositions/text-scene.html"
     data-variable-values='{"line":"Measure it. Replace at 0.5 %.",
                            "support":"Past 0.75 % the cassette goes with it.",
                            "kicker":"2","bg":"#10201c","fg":"#f3efe6","accent":"#e8a33d",
                            "entrance":"slide","align":"left"}'></div>

<!-- a placeholder, 2 s -->
<div class="clip" data-start="6" data-duration="2" data-composition-id="ph1"
     data-composition-src="compositions/placeholder.html"
     data-variable-values='{"shot":"worn cassette next to a new one, close","gap":"5"}'></div>
```

- `data-composition-id` must be unique per mount; the sub-composition's own id (`text-scene`, `placeholder`) is internal.
- Variables are declared in `data-composition-variables` on the sub-composition's `<html>` and read with `window.__hyperframes.getVariables()`. Unset variables take the defaults.
- `data-duration` on the mount wins over the sub-composition's own `data-duration`. The sub-composition's GSAP timeline is registered on `window.__timelines["text-scene"]` and runs from the mount's start.
- JSON inside a single-quoted attribute: use `&apos;` for an apostrophe in a line (`"line":"Here. Not near here. That&apos;s the rule."`), or `&quot;` for quotation marks.

## text-scene.html variables

| Variable | Meaning | From |
|---|---|---|
| `line` | the one idea, large | storyboard, voice-checked |
| `support` | one smaller line (condition, unit, context, speaker); empty hides it | storyboard |
| `kicker` | small uppercase label above the rule: step number, "Gap 5", a pillar word; empty hides it | storyboard |
| `bg`, `fg`, `accent` | the three brand colours, exact hex | `brand.md` |
| `entrance` | `slide` \| `slam` \| `fade` \| `type` | type profile (`type-profiles.md`) |
| `align` | `left` (default) \| `center` | `brand.md` (match the site) |

Per-business adjustments are made **once** in the copied file, not per mount: the font family (`brand.md` display and body fonts; Google Fonts are fetched at check time), the type scale for the format (`type-profiles.md` "Format defaults"), and the padding if the brand's safe zones differ. Everything else varies through the variables.

## Durations

Mount duration = entrance + settled hold + exit.

| Card | Entrance | Settled hold | Exit |
|---|---|---|---|
| 1–3 words (label, number) | 0.3–0.4 s | 0.8 s (+0.5 s if the card is the only thing saying it) | 0.3 s |
| Sentence | 0.35–0.45 s | 0.3 s × words, min 1.2 s (+0.5 s alone) | 0.3 s |
| Hook card | 0.3 s | the longest hold in the video | cut |
| Pull-quote (story, origin) | 0.6 s fade | floor + 1 s | 0.4 s fade |
| List item (sequential) | 0.3 s each | each item at the floor, **then the full set held** | 0.3 s |

The exit is a timeline tween in `index.html` on the mount element (`opacity` or `x`), or a hard cut when the type profile says so; the sub-composition only animates the entrance.

## Role by type

From `strategy/11-text-scenes.md` "Per type" and `type-profiles.md`. Short form:

- **How-to**: step cards as the frame around the real step (kicker = step number, `slide`), out again before the hands move. Centrepiece only when the step footage is missing (degraded; the brief says so).
- **Comparison**: two mirrored cards (name in `kicker`, ceiling in `line`), hard cut between them; the verdict as `slam`.
- **Problem and fix**: the cost as a number card (`slam`, unit in `support`); the limit as `fade`. Never over the key action.
- **Reveal**: one `fade` card after the result settles.
- **Launch**: the centrepiece; hook `type` or `slam` and held longest; 2–3 highlight cards `slide` in sequence; punchline card.
- **Walkthrough / Origin**: chapter titles (`fade`, `center` allowed); numbers as lower thirds (`caption.css .lower-third`), not cards.
- **Story**: the human line as a pull-quote (`fade`, `support` = speaker), ideally over a still (`<img class="clip">` under it, see below) rather than flat colour.
- **Explainer**: technical captions (`.caption.quiet`) carry names and numbers; at most one mechanism card.
- **Invitation / Offer**: lists and tiers revealed one by one, then the whole set held.

## A text scene over a real thing

A card on a still or on a blurred frame from the next clip beats a card on flat colour (rule 7). Set `bg` to a transparent colour and layer:

```html
<img class="clip" data-start="8" data-duration="3" src="assets/A03.jpg" style="filter: blur(6px) brightness(0.55);">
<div class="clip" data-start="8" data-duration="3" data-composition-id="ts2"
     data-composition-src="compositions/text-scene.html"
     data-variable-values='{"line":"Here. Not near here.","support":"Anna, ground team","bg":"rgba(0,0,0,0)","fg":"#ffffff","accent":"#e8a33d","entrance":"fade"}'></div>
```

`check` measures contrast against what is actually behind the text; the dimmed still is what makes it pass. If it fails, darken the still further or revert to the brand background. Flat colour is fine for the signature and CTA.

## Placeholders

- Variable `shot` is the gap report's shot description, verbatim; `gap` the gap number.
- Duration = the storyboard's duration for that scene, so the cut's timing is right even though the scene is not.
- Do not restyle it, do not give it the brand colours, do not animate it. If the placeholder looks acceptable, it has failed.
- A cut with any placeholder is handed back with **not for publishing** in the first line, and the backlog status stays `built` with a note, not `published`.

## Before the text scenes ship

- [ ] One idea per card; `line` without "and" (two ideas → two cards)
- [ ] Hold at or above the floor; the hook card holds longest; sequential sets held as a whole
- [ ] Colours exactly from `brand.md`; font and scale adjusted once in the copied file
- [ ] Entrance from the type profile; no motion that could belong to any video
- [ ] Every number and name is in `facts.md`; every line passed the voice check
- [ ] Inside the safe zones; not stacked on a spoken-line caption
- [ ] Placeholders plain and marked; none in a cut that will be published
