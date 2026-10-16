# Make-video: which doc for which step

Read only what the step needs. Business files are under `businesses/<slug>/`.

| Step | Read |
|---|---|
| Readiness gate | the output of `npx smma-videos readiness <slug>`; `strategy/12-guides.md` for what each tier means |
| Intake: the idea | `BACKLOG.md` (row: type, pillar, slot, phase, assets; natural pairs; on hold); the links and text the person gave |
| Intake: facts gate | `facts.md` (claims, numbers, what it does not do, roles, roadmap) |
| Intake: assets | `assets/ASSETS.md`; `npx smma-videos inventory <slug>` for new files; `strategy/10-assets-and-gaps.md` |
| Intake: picking rule, "Why now" | `strategy/09-which-videos.md` §1–§7; `pillars.md`, `calendar.md`, `channels.md`, `seeds.md` |
| Vet: type | `strategy/08-video-types.md` (the table, "Inferring the type", each type's "brief must settle" and "must be real") |
| Vet: viewer, feeling | `audience.md`; `strategy/01-audience-and-voice.md`; `strategy/06-delivery-and-narration.md` "One feeling per video" |
| Vet: who speaks | `voice.md` "Who speaks"; `strategy/06-delivery-and-narration.md` (narration, captions only, characters) |
| Summary: hook, room, abstract | `strategy/02-hooks.md`; `hooks.md` (the bank); `seeds.md` (moments, gaps, takes, stories) |
| Summary: signature, bridge | `voice.md` "Signature line"; `strategy/03-signature.md` |
| Summary: CTA, channel | `channels.md` ("CTA per channel"); `strategy/05-ctas-and-publishing.md` |
| Any line anyone says or reads | `voice.md` "Check before handing a line back" via `business-voice` part 2 |
| Asset map, gap report | `templates/asset-map.md`; `strategy/10-assets-and-gaps.md`; the type's "must be real" and "degrades to" in `08-video-types.md` |
| Produce: storyboard | `templates/storyboard.md` (skeleton per type); `strategy/04-formats.md`; `strategy/07-edit-fundamentals.md` (reading floor, flow, sequential moments, poster) |
| Produce: text scenes | `strategy/11-text-scenes.md`; `brand.md` |
| Produce: publish block | `strategy/05-ctas-and-publishing.md`; `strategy/04-formats.md` "The set from one source" (long form) |
| Produce: checks | `video-fundamentals` skill |
| Write | `templates/video-brief.md` (section order); `BACKLOG.md`; `seeds.md`; `hooks.md`; `facts.md` |

## Inference defaults

| If the idea… | Type | Default CTA |
|---|---|---|
| teaches one rule or step the viewer does | how-to | guide / "ask me below" |
| sets two ways of doing a job against each other | comparison | follows the winner: method → guide, feature → product |
| starts from a moment that cost something, and there is a fix to show | problem and fix | product |
| starts from a moment with a person in it, and the moment is the point | story | share |
| shows something new doing its job (footage exists) | reveal | product / "show someone who…" |
| announces something new from copy and one visual | launch | share / link |
| covers a whole job | walkthrough (long) + 3–5 shorts | product, end card |
| is about why the business exists | origin / why (long) | "try it and tell me what breaks" |
| makes a part of it understandable to an outsider | explainer | "show this to someone who…" / "talk to [owner]" |
| asks the viewer to turn up or join | invitation | "come and…" |
| is about what you pay | offer / pricing explainer (long only) | "pick the one that matches what you do" |

## Length defaults (short unless stated)

| Type | Length |
|---|---|
| How-to | 25–45 s (whole guide: 5–8 min) |
| Comparison | 35–55 s |
| Problem and fix | 40–55 s |
| Reveal | 30–45 s |
| Launch | 15–30 s |
| Story | 30–55 s |
| Explainer | 40–60 s |
| Invitation | 30–45 s |
| Walkthrough | 5–15 min |
| Origin / why | 4–9 min; cut under 3 min |
| Offer | 5–8 min; never a short |

## Asset-map defaults

| Scene | Usually needs | Usual gap resolution |
|---|---|---|
| hook | footage of the viewer's moment | B: the hook line as a text scene over the best still; or D |
| signature | the speaker, clean, anywhere (library clip) | B: signature text scene in brand style when captions-only |
| the step / the fix / the key action | the thing in use (must be real for how-to, problem and fix, reveal) | D; B degrades the type (say what it becomes) |
| the result | the result on screen; a still is often enough | B over the still; a push-in |
| the number / the cost | nothing (text scene is the natural form) | B |
| the human line | the person saying it, or the moment it refers to | B as a pull-quote over the stills |
| CTA | end card | B (always a text scene) |
