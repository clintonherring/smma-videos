---
name: build-video
description: Renders an approved, gaps-resolved brief for businesses/<slug> into a finished short or long video. Writes the composition brief, composes with Hyperframes from the real assets (trimmed clips, stills, screen recordings), brand colours and fonts, burned-in captions, designed text scenes or marked placeholders per the gap decisions, runs `npx hyperframes check`, renders output/<ID>.mp4, extracts the poster and bakes it as frame 0, writes the caption file, and logs the build. Falls back to an ffmpeg-only route when Hyperframes cannot run. Use when the person says "build V##", "render it", "make the video", or after make-video hands off a brief with every gap decided.
---

# Build a video

From `videos/<ID>-<slug>/brief.md` (approved summary, asset map, gap decisions, storyboard, text scenes, publish block) to `output/<ID>.mp4` with its poster as frame 0 and a caption file. Adapted from the Hyperframes hand-off in [latent-spaces/brag](https://github.com/latent-spaces/brag), made asset-aware and type-aware.

```
0 gates → 1 composition brief → 2 compose (Hyperframes) → 3 check → 4 render → 5 poster + caption → 6 log and hand back
```

References, read when the step needs them: [type-profiles.md](type-profiles.md) (pacing, transitions, captions, text-scene role, narration, music per type), [text-scenes.md](text-scenes.md) (the text-scene and placeholder sub-compositions and their rules), [assets.md](assets.md) (clips, stills, screen recordings, orientation, audio, trims), [fallback.md](fallback.md) (ffmpeg-only route). Starter sub-compositions: `compositions/text-scene.html`, `compositions/placeholder.html`, `compositions/caption.css` in this skill's folder.

## 0. Gates

1. `npx smma-videos readiness <slug>`: the build tier needs brand, assets and the render environment. If `brand.md` is `missing`, stop and run `define-brand`; a build with no brand looks like no one's. If the render environment fails, run `npx smma-videos doctor` and either fix per its hints or take the [fallback](fallback.md).
2. The brief: status must be `approved` with **every gap decided** and no D outstanding (or the person explicitly says "build with the placeholder for now"). If not, hand back to `make-video`.
3. Load `business-voice` (part 2) and `video-fundamentals`. Every caption and text-scene line is checked before it is set.
4. Hyperframes skills: run `npx hyperframes skills check`; if the core skills are not installed for this agent, `npx hyperframes skills update` and load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-cli` (and `media-use` for footage treatments). Do not enter the `hyperframes` intent interview or its promo workflows; this skill is the workflow. If the skills cannot be installed, `npx hyperframes docs data-attributes|gsap|compositions` plus the starter files here are enough for the patterns below.

## 1. Composition brief

Write `videos/<ID>-<slug>/composition-brief.md` from `templates/composition-brief.md`: objective (type, one idea, feeling), output paths and format from `brand.md`, source material by asset ID with in/out points and treatment, the type profile, visual identity (exact values from `brand.md`), the storyboard as the contract, gap decisions applied, the reading floor per text element, the poster candidate. Grounding: every line that will be on screen is in `facts.md` or the approved brief; names of people in frame have consent in `ASSETS.md`.

## 2. Compose

Project at `videos/<ID>-<slug>/composition/`:

- `npx hyperframes init . --non-interactive --resolution portrait` (or `landscape` / `square` per `brand.md`); set `HYPERFRAMES_SKIP_SKILLS=1` if the skills check is not wanted here.
- Copy the needed assets into `composition/assets/` by ID (never reference files outside the project). Trim nothing on disk; trim with `data-media-start` and `data-duration`.
- Copy `compositions/text-scene.html` and `compositions/placeholder.html` from this skill into `composition/compositions/`, and `caption.css` into `composition/`. Adjust the text-scene's type scale and layout to `brand.md` (alignment, display font, accent use) once; every text scene in the video then mounts that file with `data-variable-values`.
- `index.html`: the root composition `data-composition-id="main"`, `data-duration` = storyboard total, one top-level element per scene:
  - footage: `<video class="clip" data-start data-duration data-media-start src="assets/A04.mp4" muted>` (`data-has-audio="true"` and `data-volume` when its sound is used); stills: `<img class="clip">` with a slow push-in via GSAP `scale` when the storyboard says so.
  - captions: one `<div class="clip caption">` per spoken line, timed to the line, styled from `brand.md` (`caption.css` gives the pill pattern that passes contrast over footage). Six to eight words per caption; inside the safe zones.
  - text scenes: `<div class="clip" data-composition-src="compositions/text-scene.html" data-variable-values='{"line":…,"support":…,"bg":…,"fg":…,"accent":…}'>`, one per card, duration = entrance + settled hold + exit from the storyboard.
  - placeholders: the same with `compositions/placeholder.html` and `{"shot":"<what is missing>"}`; grey, system font, bracketed text; it must look unfinished.
  - transitions and entrances from the type profile only (hard cut, match cut, slide, fade, wipe; slam / type-on / fade for text). No particles, no equaliser bars, no stock motion.
  - audio: on-camera sound from the clip, or narration on its own track (`npx hyperframes tts` for a generated voice when the brief says so), or nothing. Music only when the brief names a licensed file the owner supplied; never a bundled bed.
- Register the GSAP timeline on `window.__timelines["main"]`, paused, with absolute positions; sub-compositions carry their own.
- Fonts: Google Fonts or system fallbacks declared in `brand.md`; Hyperframes fetches and pins declared families at check time.

## 3. Check

```
cd videos/<ID>-<slug>/composition && npx hyperframes check
```

Fix every error: lint (nested structure → sub-composition), runtime, layout overflow, motion, **contrast** (fix inside the brand palette or add the caption pill; `--no-contrast` is not used). Re-run until it passes. Then a grounding pass by eye: read every string in the composition once against `facts.md` and the brief; `check` has no opinion on copy.

Optional visual check: `npx hyperframes snapshot` and look at the hook frame, one text scene and the CTA.

## 4. Render

```
npx hyperframes render --quality draft --output ../output/<ID>.mp4    # iterate
npx hyperframes render --quality high  --output ../output/<ID>.mp4    # deliver
```

Confirm with ffprobe: dimensions, 30 fps, duration = storyboard total (±0.1 s).

## 5. Poster and caption

- Pick the settled moment from the storyboard (hook line fully in, or the result). `npx smma-videos poster output/<ID>.mp4 <t>` extracts `output/<ID>.jpg` and bakes it as frame 0 (duration and frame count unchanged; it prints both). If the frame is mid-animation, nudge `t` by tenths and run again.
- Write `output/caption.txt`: the publish block's caption (hook / signature / one or two sentences / ask), then a blank line, then the hashtags. One canonical caption; variants in `output/caption-variants.md` only if the brief asked.

## 6. Log and hand back

- Append "Build log" to `brief.md`: composition path, check result, render command and quality, output files, poster time, anything that deviated from the storyboard and why (a hold lengthened for the floor; a caption split).
- `BACKLOG.md`: status `built`. `video-schedule` moves it to `published` when the person posts.
- Hand back: the mp4 and jpg paths, the caption file, the poster time, one sentence on what the cut does, and the pre-publish checklist from `strategy/07-edit-fundamentals.md` with each item ticked or noted. If any placeholder (decision A) is in the cut, say so in the first line: **not for publishing**.

## Self-review before handing back

- [ ] Type profile followed: beat count, holds, transitions, text-scene role, narration default
- [ ] Every clip is the asset the storyboard named, at its in/out; nothing stretched; people and captions not cropped out
- [ ] Every readable element at or above its settled hold; the hook holds longest
- [ ] Text scenes in brand colours and fonts, one idea each, entrance per profile; placeholders plain and marked
- [ ] Every on-screen string grounded; every line passed the voice check
- [ ] `npx hyperframes check` passed with contrast on
- [ ] Duration matches the storyboard; frame 0 is the poster; `output/<ID>.jpg` and `caption.txt` exist
- [ ] Any frozen frame postable

## Do not

- Build a brief with an undecided gap, or publish one with a placeholder.
- Invent copy, numbers or names to fill a card. Quote the facts file or leave the card out.
- Use music, SFX or stock motion the owner did not supply. Pacing comes from the type.
- Render a 9:16 video with a landscape clip stretched to fill; frame it per [assets.md](assets.md).
- Skip `check`, or pass `--no-contrast`.
- Publish, upload or post anything. The person does that.
