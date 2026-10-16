# Asset map and gap report — [ID] [Title]

Written by `make-video` right after the brief summary, before any storyboard detail. Scenes come from the type's skeleton (`templates/storyboard.md`); assets from `assets/ASSETS.md`. Method in `strategy/10-assets-and-gaps.md`.

## Asset map

```
ASSET MAP — <ID>

| # | Scene | Needs | Have (asset ID, in/out) | Status |
|---|---|---|---|---|
| 1 | hook: <the moment> | <clip / still / screen of …> | | have / partial / GAP |
| 2 | signature | <who, clean> | | |
| 3 | <body scene> | | | |
| 4 | <body scene> | | | |
| 5 | <result / payoff> | | | |
| 6 | CTA | end card in brand style | brand.md | have (text scene) |

Must be real for a <type>: scenes <#, #>.
Buildable now: <yes, as … (~NN s) / no, because …>. With <gap #> filled it is a <type> with <what>.
```

## Gap report

One block per `GAP` or `partial` row. Recommend one decision and say why; the person chooses.

```
GAP REPORT — <ID>

Gap <#> — <scene> (<must be real for this type / supporting>)
  A  placeholder frame   plain card "[PLACEHOLDER: <shot>]"; renders now, swap later; never published
  B  text scene          <the line(s) the card would carry, in brand style>; the video becomes <same type / degraded type>
  C  leave it out        drop the scene; the one idea and the brief summary are rewritten around what remains and shown again
  D  provide it          <what, framing, length, orientation, who, consent>; video stays `briefed` until it arrives
  Recommended: <letter>, because <one sentence>.

Gap <#> — …

Say the decision per gap (for example "3 D, 4 B").
```

## Decisions (filled when the person answers)

| Gap | Decision | Applied as | Shot list row (D) |
|---|---|---|---|
| | | | |

After every row has a decision: backlog row → `gaps-resolved` (or stays `briefed` while any D is outstanding); any C → brief summary re-presented.
