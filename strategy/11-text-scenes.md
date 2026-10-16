# Text scenes

On-screen text that is a real part of the video: a designed card, in the brand's colours and fonts, carrying one idea. Used when a scene has no footage (gap decision B), as the frame around a flow (one beat), as the centrepiece of a launch, and for the signature and CTA when nobody is on camera. The opposite of a placeholder (gap decision A), which is deliberately plain.

The rule that matters: **it cannot be boring text.** A wall of words on a flat background is a slide. A text scene moves like the rest of the video, reads at the floor, and looks like it belongs to this business.

## What a text scene may carry

| Role | Shape | Example |
|---|---|---|
| **The hook** (when no footage of the moment exists) | one line, large, fast-in, the most generous hold in the video; one real visual behind or beside it if any exists | "Your chain is a wear item." (bike) / "The ovens are on." (bakery) |
| **A number** | the number as a counter or a slam, its unit small, one line of context | **0.5 %** · 11-speed · cassette from €45 if you wait |
| **A rule or step** | step number small, the rule in one line, the condition in a second smaller line | 1 · Photo the receipt the day you get it · *not Sunday night* (bookkeeper) |
| **A quote (the human line)** | pull-quote, the speaker named small; the line held longer than the floor | "I checked it like in your video." — Mara |
| **A comparison side** | the method's name, its limit, in a card that mirrors the other side | Crank the flow temp · warms the house · costs on old radiators (installer) |
| **A list revealed one by one** | 2–4 items, sequential, each at the floor, then the full set held | measure · cut · fit · silicone bead (joiner) |
| **The signature** (no camera) | the line, set as the brand would set a headline, with the logo small | "I find the leak. You keep the floor dry." (plumber) |
| **The CTA** | one line plus the destination; nothing else | Book a Sunday check · northsidecycles.example |

What it may not carry: a paragraph; two ideas; a claim not in `facts.md`; a slogan that fails `business-voice` mode 2; anything the viewer must read in less than the floor.

## Design rules

1. **Brand first.** Background, text and accent colours from `brand.md`; display font for the line, body font for the small text. If `brand.md` is missing, the build stops and asks for it (the readiness check will already have said so).
2. **One idea per card.** If a card needs "and", it is two cards.
3. **Fast-in, then hold.** Entrance 0.3–0.6 s; settled hold at the floor (`07-edit-fundamentals.md`): ~0.8 s for 1–3 words, ~0.3 s per word for a sentence, minimum 1.2 s, plus ~0.5 s when the card carries the idea alone. Exit 0.3 s.
4. **Motion from the type, not from a library.** The type profile sets the entrance (slam, slide, type-on, fade) and the transition out. No particles, no bouncing, no equaliser bars, nothing that could belong to any video.
5. **Hierarchy.** One large line; at most two small lines. Numbers larger than their units. Nothing centred by default if the brand's site is left-aligned.
6. **Safe zones.** Inside `brand.md` "Format and safe zones" (platform UI covers the bottom ~20 % and the right edge of a 9:16 frame).
7. **A real thing where possible.** A text scene over a still, a blurred frame from the next clip, or beside the product shot beats a text scene on a flat colour. Flat colour is fine for the signature and CTA.
8. **Contrast passes.** Text on background meets WCAG AA; `npx hyperframes check` fails it otherwise and the build fixes it inside the brand palette.
9. **Captions and text scenes do not stack.** When a text scene is on screen, the burned-in caption for the spoken line sits in its usual place only if the two do not fight; otherwise the spoken line waits.
10. **Sequential text respects reading.** Items arriving every 0.5 s outrun reading. Reveal quickly, then hold the full set; or space items at the floor.

## Per type

| Type | Text scene role | Default entrance |
|---|---|---|
| How-to | step cards as the frame around the step on screen; the centrepiece only when degraded | slide in from the step's side; hold; slide out |
| Comparison | the two sides' limits, mirrored; the verdict line | split reveal; hard cut between sides |
| Problem and fix | the cost (number) once; the limit once | slam for the number; fade for the limit |
| Reveal | one line on what it means; nothing during the key action | fade, after the result settles |
| Launch | the centrepiece: hook, name, 2–3 highlight cards, punchline | type-on or slam for the hook; cards slide sequentially |
| Walkthrough | chapter titles; the day's numbers as lower thirds | clean wipe |
| Origin | the point, once, held; chapter titles | slow fade, long hold |
| Story | the human line as a pull-quote; nothing else | fade in on the line, held past the floor |
| Explainer | the real names and numbers as technical captions; one mechanism card at most | quiet, no motion beyond fade |
| Invitation | "what you'd do" as a short list revealed one by one | soft slide |
| Offer | tier cards, sequential, each held; "does not include" lines | slide; hold the full set |

## Placeholders (for contrast)

A placeholder (gap decision A) is the opposite on purpose: a neutral grey card, system font, the text `[PLACEHOLDER: shot of …]` and the scene's duration. It must look unfinished so nobody publishes it. `build-video/text-scenes.md` has both patterns.

## The check before a text scene ships

- [ ] One idea; reads at the floor; the hook card holds longest
- [ ] Brand colours and fonts; contrast passes
- [ ] Looks like it belongs to this business and this video, not to a template
- [ ] Every number and name is in `facts.md`; every line passes the voice check
- [ ] Inside the safe zones; does not fight a caption
- [ ] If it replaced a must-be-real scene, the brief says what the video became
