# Working with the real assets

The asset map in the brief names which asset ID plays in which scene and at which in/out point. This file is how each kind of asset goes into the composition without lying about it. Assets live in `businesses/<slug>/assets/`, inventoried in `ASSETS.md` (`npx smma-videos inventory <slug>` fills the technical columns).

## Copy, never reference outside

Copy each asset the storyboard names into `composition/assets/` under its ID (`A04.mp4`, `A03.png`). Hyperframes serves from the project folder; a path outside it breaks `check` and `render`. Originals stay where they are and are never edited on disk.

## Clips

```html
<video class="clip" data-start="0" data-duration="3" data-media-start="0.5" src="assets/A01.mp4" muted></video>
```

- **Trim in the markup**: `data-media-start` is the in-point in the source file (seconds), `data-duration` the length used. The out-point is implied. Nothing is re-encoded by hand.
- **On-camera sound**: drop `muted`, add `data-has-audio="true"` and `data-volume="1"`. Only one clip's sound plays at a time; other clips in the same window stay muted.
- **Speed**: not changed. A step that is too slow is cut, not sped up (reading floor and honesty both). If the brief explicitly wants a time-lapse feel, use `data-playback-rate` and say so in the build log.
- **Slow push-in on a locked-off shot**: a GSAP `scale` from 1.0 to 1.06 over the clip's duration, `transformOrigin` at the subject. Nothing faster.
- **Proxies**: `hyperframes.json` `"media": {"autoProxy": true}` lets `check` and preview use lighter copies; render uses the originals.
- **Sparse keyframes**: phone and screen recordings often have one keyframe every few seconds; the compiler warns ("sparse keyframes … seek failures and frame freezing"). Re-encode the *copy* in `composition/assets/` (never the original): `ffmpeg -i A02.mp4 -c:v libx264 -r 30 -g 30 -keyint_min 30 -movflags +faststart -c:a copy A02.fixed.mp4` and reference the fixed file. Note it in the build log.

What a clip may not do: play beyond its real content (a 3 s clip in a 4 s slot freezes; cut the slot to 3 s or add the next shot); be mirrored or colour-shifted to look like a different place; be reused for a scene it does not show (that is a gap, not a reuse).

## Orientation and framing

Platform format comes from `brand.md`. A clip in the wrong orientation is framed, never stretched:

| Clip | Canvas | Do |
|---|---|---|
| 9:16 | 9:16 | `object-fit: cover` (default `.clip`) |
| 16:9 | 9:16 | **crop** when the subject is central and the brief allows (`object-fit: cover; object-position: <x>% 50%`), else **letterbox** on the brand colour (`.clip.letterbox` in `caption.css`) with a caption or card in the free space |
| 9:16 | 16:9 | pillarbox on the brand colour, or two 9:16 clips side by side for a comparison |
| 1:1 or 4:3 | any | letterbox on the brand colour |
| screen recording (any) | 9:16 | crop to the region that matters with `object-position`, or letterbox and put the step card in the free space |

Never: stretch (`object-fit: fill`), blurred-copy-of-itself backgrounds (that is stock motion), or crop a person's head or a caption burned into the source. If a crop would cut the thing the scene exists to show, letterbox.

## Stills and screenshots

```html
<img class="clip" data-start="6" data-duration="2.5" src="assets/A04.png">
```

- A still holds for its storyboard duration; add a slow push-in (`scale` 1.0 → 1.05) only if the type profile allows motion there; explainer and origin stills can sit perfectly still.
- Screenshots: crop in the markup to the region (`object-fit: cover; object-position`), never scale text below the reading floor. If the UI text must be read, it holds like a caption (0.3 s per word).
- Logos: `<img>` positioned small (`width: 160px` on 1080 wide) in a corner inside the safe zone; the signature and CTA cards may carry it; nothing else does.
- Photos of people: consent column in `ASSETS.md` must say yes before the still is in a cut that will be published.

## Screen recordings

- Trim to the moment: entry → key action → result, by `data-media-start` and `data-duration`. Cursor wandering is cut.
- No text over the key action (type profiles: problem and fix, reveal, how-to). The caption for the spoken line sits in the free space or waits.
- If the recording is landscape and the canvas portrait, the step card in the letterbox space is the how-to frame; it is a feature, not a workaround.

## Audio

Three choices, from the brief, in this order of preference: the on-camera sound; narration on its own track; nothing.

- **On-camera**: the clip's own audio (`data-has-audio="true"`). Captions still burned in; most viewers watch muted.
- **Narration**: a single file at `assets/narration.mp3` (recorded by the person, or `npx hyperframes tts` when the brief says a generated voice is acceptable; never a generated voice imitating a real named person): `<audio data-start="0" src="assets/narration.mp3"></audio>`. Captions are timed to it.
- **Music**: only a licensed file the owner supplied, listed in `ASSETS.md`, at a low level (`data-volume="0.15"`), fading under the punchline or CTA. Never a bundled bed, never the type's "feel" chosen from a library. The type profile says which types allow a bed at all (launch; walkthrough's cold open).
- Captions are not optional even with sound. The default assumption is a muted viewer.

## The poster

The poster is a frame of the finished render, not a separate design. Pick the settled moment (hook card fully in, or the result), run `npx smma-videos poster output/<ID>.mp4 <t>`. If the chosen frame has a caption mid-fade, nudge `t`. Any frozen frame should be postable; the poster is just the best one.

## Checks before the assets are final

- [ ] Every scene plays the asset ID the storyboard names, at its in/out; no reuse for a scene it does not show
- [ ] No stretch; crops keep the subject, the person, the burned-in caption; letterbox on brand colour
- [ ] No clip runs past its real content
- [ ] One sound source at a time; captions present regardless
- [ ] People in frame have consent in `ASSETS.md`; music is owner-supplied and licensed, or absent
- [ ] All asset files are inside `composition/assets/`
