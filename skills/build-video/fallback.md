# Fallback: ffmpeg only

When `npx hyperframes check` or `render` cannot run here (no Chrome, no network for npm, a locked-down machine) and `npx smma-videos doctor` shows `ffmpeg` and `ffprobe` present, the video can still be assembled. It will be plainer: hard cuts, static captions, text cards without entrances. Say so in the build log and in the hand-back; the owner decides whether plain is good enough for this video or whether to wait for a machine that renders.

What the fallback keeps: the storyboard's order and durations, the real assets at their in/out points, the brand colours and a brand font, burned-in captions on a pill, the reading floor, the poster as frame 0. What it loses: entrances, match cuts, sub-composition text scenes with motion, per-element contrast checking (you check by eye).

Everything happens in `videos/<ID>-<slug>/composition-ffmpeg/`; the commands below assume 1080×1920 at 30 fps. Replace the size from `brand.md` for other formats. Fonts: pass a font file (`fontfile=`) that `brand.md` names, or a system font; download nothing without saying so.

## 1. Normalise every scene to one clip each

Every scene becomes `scene-NN.mp4` with the same size, fps, pixel format and an audio track (silent if needed), so the concat is lossless.

Clip at in/out, cropped or letterboxed (see `assets.md`):

```bash
# crop to fill (subject central)
ffmpeg -y -ss 0.5 -t 3 -i ../../../assets/A01.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,format=yuv420p" \
  -an -c:v libx264 -preset fast -crf 18 scene-01.mp4

# letterbox on the brand colour (landscape clip in a portrait canvas)
ffmpeg -y -ss 12 -t 4 -i ../../../assets/A02.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x10201c,fps=30,format=yuv420p" \
  -an -c:v libx264 -preset fast -crf 18 scene-02.mp4
```

Still for 2.5 s:

```bash
ffmpeg -y -loop 1 -t 2.5 -i ../../../assets/A04.png \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x10201c,fps=30,format=yuv420p" \
  -an -c:v libx264 -preset fast -crf 18 scene-03.mp4
```

Text card (gap decision B, plain version) for 3 s on the brand background; the line and the support line in brand colours:

```bash
ffmpeg -y -f lavfi -i "color=c=0x10201c:s=1080x1920:r=30:d=3" \
  -vf "drawbox=x=110:y=780:w=120:h=10:color=0xe8a33d:t=fill,\
drawtext=fontfile=/path/to/Display.ttf:expansion=none:text='Measure it.':fontcolor=0xf3efe6:fontsize=96:x=110:y=830,\
drawtext=fontfile=/path/to/Display.ttf:expansion=none:text='Replace at 0.5 %.':fontcolor=0xf3efe6:fontsize=96:x=110:y=940,\
drawtext=fontfile=/path/to/Body.ttf:expansion=none:text='Past 0.75 % the cassette goes with it.':fontcolor=0xf3efe6@0.85:fontsize=44:x=110:y=1090,format=yuv420p" \
  -c:v libx264 -preset fast -crf 18 scene-04.mp4
```

Placeholder (gap decision A), deliberately grey and monospace:

```bash
ffmpeg -y -f lavfi -i "color=c=0x8c8c8c:s=1080x1920:r=30:d=2" \
  -vf "drawtext=font=monospace:expansion=none:text='[PLACEHOLDER\: worn cassette':fontcolor=0x1a1a1a:fontsize=52:x=(w-text_w)/2:y=(h-text_h)/2-40,\
drawtext=font=monospace:expansion=none:text='next to a new one]':fontcolor=0x1a1a1a:fontsize=52:x=(w-text_w)/2:y=(h-text_h)/2+40,\
drawtext=font=monospace:text='not for publishing':fontcolor=0x1a1a1a@0.8:fontsize=36:x=(w-text_w)/2:y=(h-text_h)/2+160,format=yuv420p" \
  -c:v libx264 -preset fast -crf 18 scene-05.mp4
```

`drawtext` notes: `expansion=none` makes `%` literal (otherwise it is a format character and ffmpeg warns "Stray %"); `:` is written `\:`; `'` as `'\''` (or write the text to a file and use `textfile=`). `drawtext` does not wrap: one `drawtext` per line, ~110 px apart at 96 px, and nothing wider than ~860 px on a 1080 canvas. Six to eight words per caption applies here too. `font=sans` / `font=monospace` resolve through fontconfig when no `fontfile` is given.

## 2. Captions

Burn each spoken line onto its scene on a pill (the same contrast reason as `caption.css`): a `drawbox` under a `drawtext`, lower third, above the bottom 15 %.

```bash
ffmpeg -y -i scene-01.mp4 \
  -vf "drawbox=x=80:y=1420:w=920:h=130:color=0x10201c@0.92:t=fill,\
drawtext=fontfile=/path/to/Body.ttf:text='Your chain is a wear item.':fontcolor=white:fontsize=56:x=112:y=1456" \
  -c:v libx264 -preset fast -crf 18 -an scene-01c.mp4
```

Several lines on one scene: chain `drawtext` filters with `enable='between(t,0,1.4)'` windows, one per line, each window at least the line's reading floor. Alternatively write an `.srt` and burn it with `subtitles=captions.srt:force_style='FontName=Inter,FontSize=20,Outline=0,BackColour=&HEB1C2010&,BorderStyle=4'`, which gives the pill through the ASS box style.

## 3. Audio

- Silence by default: when concatenating, add a silent track so players behave: `-f lavfi -i anullsrc=r=48000:cl=stereo` mixed in step 4.
- On-camera sound for one scene: keep `-c:a aac` on that scene instead of `-an`, and give every other scene a silent track of its length (`anullsrc`), so the concat demuxer sees audio everywhere.
- Narration: concat the video first, then `ffmpeg -i video.mp4 -i narration.mp3 -c:v copy -c:a aac -shortest out.mp4`.

## 4. Concatenate

```
# list.txt
file 'scene-01c.mp4'
file 'scene-02c.mp4'
file 'scene-03.mp4'
file 'scene-04.mp4'
file 'scene-05.mp4'
```

```bash
ffmpeg -y -f concat -safe 0 -i list.txt -f lavfi -i anullsrc=r=48000:cl=stereo \
  -shortest -c:v copy -c:a aac ../output/<ID>.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 ../output/<ID>.mp4
```

The duration must equal the storyboard total (±0.1 s). If it does not, a scene's `-t` is wrong.

## 5. Poster, caption, log

Same as the main route: `npx smma-videos poster ../output/<ID>.mp4 <t>` (frame count unchanged), `output/caption.txt`, the build log in `brief.md` with the line "built with the ffmpeg fallback: no entrances, static captions" and the backlog status `built`.

## Checks (by hand, since `check` did not run)

- [ ] Open the file and watch it once at speed; every caption readable at the floor
- [ ] Caption pill over footage visible in the brightest and darkest scene
- [ ] No stretched clip; letterbox colour is the brand background
- [ ] Text cards in brand colours; placeholders grey and marked
- [ ] Every string grounded in `facts.md` and the brief
- [ ] Duration matches; frame 0 is the poster; dimensions and fps right (`ffprobe`)
