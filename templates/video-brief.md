# [ID] [Title]

Status: `briefed — awaiting approval` → `approved` → `gaps-resolved` → `built` → `published`. One file per video at `businesses/<slug>/videos/<ID>-<slug>/brief.md`. Sections are appended in order as the video moves; nothing below "Brief summary" is written before the summary is approved.

## Brief summary (approved <date>, or: awaiting approval)

The block the owner approved. Keep it verbatim; everything downstream answers to it.

```
BRIEF SUMMARY — <ID> <title>

Type · Viewer                <type from strategy/08-video-types.md> · <the one person watching>
One idea                     <one sentence>
Default                      most people <default> (or: for years I <default>) · costs them <number> · the point: <one sentence> · we <the turn>   (or "none: opens from the viewer's moment")
Feeling                      <how the viewer should feel at the end>
Hook (chosen)                "<line>" — first frame: <asset ID or GAP>
  alternates                 "<line 2>" / "<line 3>"   (one default hook and one viewer's-moment hook among them)
Signature                    "<canonical or variant from voice.md>"
CTA (one ask)                "<line>" → <where it points>
Format · est. length         short 9:16 · ~NN s   (or long 16:9 · N–N min)
Who speaks                   <owner on camera / named person / narrator / captions only / character>
Why now                      <pillar> · <slot> · phase <n> · <primary channel> · assets <have / partial / none>
Facts to confirm             <list, or "none">
Still open                   <anything unresolved, or "nothing">

Approve, or tell me what to change.
```

## Asset map

From `templates/asset-map.md`. One row per scene of the type's skeleton; statuses `have` / `partial` / `GAP`. Ends with "Buildable now: …".

## Gap decisions

| Gap | Scene | Decision (A placeholder / B text scene / C leave out / D provide) | Note |
|---|---|---|---|
| | | | |

If any decision was C, the brief summary above was re-presented and re-approved; note the date. If any was D, the shot list is in `assets/ASSETS.md` "Missing shots requested" and this video stays `briefed` until it arrives.

## Details

| | |
|---|---|
| Type | from `strategy/08-video-types.md` |
| Format | short (9:16, ≤60 s) / long (16:9, 5–15 min) |
| Audience | one sentence: the one person watching (from `audience.md`; second track if any) |
| Pillar | from `pillars.md` |
| Slot | from `calendar.md`; note whether the material exists or a shoot is needed |
| Phase | 1 / 2 / 3 / gated |
| Series | episode of …, or standalone |
| Distribution | primary channel · also: … · shared by: … |
| Seed | the gap, take or story from `seeds.md` this draws on, or none |
| Source | URL, text, file or day this comes from |
| Who is in frame | people and roles; consent noted per person |

## Storyboard

From `templates/storyboard.md`, pre-filled from the type's scene skeleton. Durations summed; reading floor checked per line; asset ID per scene.

## Text scenes

For every scene resolved as B, or planned as a text scene: role, the line(s), the entrance, the hold (`strategy/11-text-scenes.md`).

## Publish

```
PUBLISH — <ID>
Caption          <hook / signature / one or two sentences / link or share ask>
Hashtags         <3–6>
Poster           <the settled moment, at NN.N s; baked as frame 0>
Distribution     <primary> · also: … · shared by: …
Set              <long form only: the shorts, stills and cuts this source yields>
Log              <PERFORMANCE.md rows to create, one per channel>
```

## Checks

- Delivery checklist (`strategy/06-delivery-and-narration.md`): ticked or noted
- Pre-publish checklist (`strategy/07-edit-fundamentals.md`): ticked or noted
- Text-scene check (`strategy/11-text-scenes.md`): ticked or noted
- No placeholder (decision A) remains in the cut

## Build log

Written by `build-video`: composition path, `npx hyperframes check` result, render command, output files, poster time, anything that deviated from the storyboard and why.

## Notes
