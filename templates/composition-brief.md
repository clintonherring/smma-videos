# Composition brief — [ID] [Title]

Written by `build-video` into `businesses/<slug>/videos/<ID>-<slug>/composition-brief.md` before the composition is created. This brief is the boundary: anything about the one idea, the lines, the type, the assets and the moments to show is decided here; anything about implementation (HTML structure, animation mechanics, exact timing within the storyboard's windows) is Hyperframes' to decide.

## Objective

One `<type>` short (or long) for `<business>`, built from the approved brief at `brief.md`. One idea: `<sentence>`. Feeling at the end: `<feeling>`.

## Output

- Composition directory: `videos/<ID>-<slug>/composition/`
- Rendered video: `videos/<ID>-<slug>/output/<ID>.mp4`
- Poster: `output/<ID>.jpg`, baked as frame 0
- Caption: `output/caption.txt`
- Format: `<9:16 1080x1920 / 16:9 1920x1080 / 1:1 1080x1080>` at 30 fps
- Duration: `<NN s>` (storyboard total)

## Source material (by asset ID)

| Asset | File | Use | In / out | Treatment |
|---|---|---|---|---|
| A04 | `assets/clips/gate-dawn.mp4` | scene 1 hook | 0:12–0:19 | as shot; caption bottom third |
| A01 | `assets/clips/signature-bench.mp4` | scene 2 | 0:00–0:03 | as shot |
| A07 | `assets/images/phone-marker.jpg` | scene 4 result | still | slow push-in 4 s |
| — | brand.md | end card | | text scene |

Copy that must appear verbatim (from `facts.md` / `voice.md`): `<lines>`.
Nothing on screen that is not in `facts.md`. People in frame: `<names / roles, consent confirmed>`.

## Type profile (from `build-video/type-profiles.md`)

- Type: `<type>`
- Beats and holds: `<e.g. 4–6 beats; punchy; one claim each>`
- Transition vocabulary: `<e.g. hard cuts; before then after>`
- Caption style: `<from brand.md; where captions sit; technical caption style if two layers>`
- Text scenes: role `<frame around the flow / centrepiece / none>`; entrance `<slam / slide / type-on / fade>`
- Narration: `<on-camera voice / narrated (file or tts voice) / captions only>`
- Music: `<none / bed at low level, owner-supplied licensed file at assets/… / tts only>`

## Visual identity (from `brand.md`)

- Background: `<value>` · Text: `<value>` · Accent: `<value>`
- Display font: `<font or fallback>` · Body font: `<font or fallback>`
- Logo: `<path>`; where it may appear (end card only unless brand.md says otherwise)
- Safe zones: `<top / bottom / right margins for 9:16>`
- Caption style: `<size, weight, background pill or none, position>`

## Storyboard (the contract)

Scene list from `brief.md` "Storyboard", each with duration, on-screen asset or text scene, the spoken/caption line, the settled hold, the flow beat, any sequential moment, the transition out.

1. `<Scene name> — <d> s — <what must be seen / read> — <asset or text scene>`
2. …

## Gap decisions applied

| Scene | Decision | How it is built |
|---|---|---|
| 3 | B text scene | step card: "2 · Divide the height by ten, add two" · slide in from the right, hold 2.4 s, slide out |
| 4 | A placeholder | grey card `[PLACEHOLDER: her phone showing the marker]` 4 s; must not reach a published cut |

## Reading floor

Every text element the viewer must read, with its settled hold: `<list>`. Hook card holds longest. Sequential text: reveal, then hold the full set.

## Poster

Candidate settled moment: scene `<N>` at `<NN.N>` s (`<what is on screen>`). Confirm after render; nudge by tenths if it lands mid-animation.

## Hyperframes instructions

Load the Hyperframes composition skills that ship with the installed CLI (`npx hyperframes skills` lists and installs them: core composition contract and `data-*` timing, animation, creative/design spec, keyframes, CLI check/render). Build from this brief and `brief.md`; do not run the Hyperframes intent interview or its generic promo workflow. Requirements:

- Use the real assets by path; trim to the in/out points; never stretch or crop out people or captions.
- Captions burned in for every spoken line, in the brand's caption style, inside the safe zones.
- Text scenes exactly as specified (role, line, entrance, hold); placeholders exactly as specified (plain, marked).
- Keep every readable element at or above its settled hold.
- `npx hyperframes check` is the single gate before render; fix every error including contrast, inside the brand palette.
- Render to `output/<ID>.mp4`; then `npx smma-videos poster output/<ID>.mp4 <t>` for the poster and frame 0.
- Keep creation and rendering local.
