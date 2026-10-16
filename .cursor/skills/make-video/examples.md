# Make-video: worked example (to the stop, with a gap report)

The shape of a run on `businesses/example-business` (Northside Cycle Repair, a fictional one-person bike workshop; its files are in the repo). Lines in quotes are what the agent says. The run stops at the summary, the asset map and the gap report; nothing is produced until the owner approves and gives a decision per gap.

## Input (Entry B, backlog ID)

> V03 — make this one next. It's the chain-wear check: people bring bikes in with a worn-out cassette because nobody told them a chain is a wear item. I've got the bench clip and the chain-checker shot.

## Readiness (agent, silently)

`npx smma-videos readiness example-business` → brief tier ready; build tier ready. Loads `business-voice` part 2.

## Intake (agent, silently)

- Reads the V03 row: how-to, short, pillar Workshop knowledge, slot Cadence week 2, phase 1, assets `partial`.
- Reads `facts.md`: chain wear claims (replace at 0.5 % on 11-speed, 0.75 % on ≤10-speed; a worn chain takes the cassette with it; cassette from €45, chain from €25, "as of 2026-09"). All numbers present. Not roadmap.
- Reads `assets/ASSETS.md`: A01 bench signature clip (3 s, 9:16), A02 chain-checker on a chain (4 s, 9:16, no audio), A03 logo, A04 booking page screenshot (still). No clip of a worn cassette.
- Picking rule: Workshop knowledge under share; cadence slot, assets partial, phase 1, under-served ("the decision log: when to replace, with the number"); standalone; own channels + the local commuter group with the guide CTA; seed: take T2 "a chain is a wear item, not a part that breaks". → Make this next, because it is evergreen, phase 1, and two of three must-be-real scenes already exist.

## Vet (agent, one turn)

> "Here is what I can infer. The viewer is the commuter who rides every day and has never measured a chain. How-to, short, ~35 s: the rule is 'measure the chain; at 0.5 % replace it; past 0.75 % the cassette goes with it', and the facts file has the numbers. Guide CTA on own channels; soft ask in the commuter group. Who speaks: you, from the bench, as in A01.
>
> Two things I can't infer:
>
> 1. **Feeling.** 'I can check this myself on Sunday' (capable), or 'I've been riding a €45 mistake' (a jolt)? That decides whether the hook is the gauge or the cassette bill.
> 2. **The worn cassette.** The how-to lands harder if we see what a worn chain does to the teeth. You don't have that shot. We can leave it to a text scene with the number, or you take a 5 s clip of the next one that comes in. Which?"

## Owner

> Capable. And I'll shoot the cassette, there's one on the bench now.

## The stop (agent, then wait)

```
BRIEF SUMMARY — V03 Check your chain before it costs you a cassette

Type · Viewer                how-to · the daily commuter who has never measured a chain
One idea                     A chain is a wear item: measure it, replace it at 0.5 %, and the cassette lasts three chains instead of one.
Room                         none: opens from the viewer's moment
Feeling                      Capable: "I can check this on Sunday in thirty seconds."
Hook (chosen)                "Your chain is a wear item. Nobody told you, so here's the thirty-second check." — first frame: A02 chain checker dropping into the chain
  alternates                 "Most people replace a cassette because nobody told them to replace the chain." (room) / "Thirty seconds on a Sunday saves you about forty-five euros." (viewer's moment)
Signature                    "I fix bikes for a living. Probably yours." (voice.md canonical)
CTA (one ask)                "The full check is on the site. Ask me anything below." → northsidecycles.example/guides/chain-wear
Format · est. length         short 9:16 · ~35 s
Who speaks                   the owner, from the bench (A01); captions burned in
Why now                      Workshop knowledge · Cadence wk 2 · phase 1 · own channels (+ commuter group, soft ask) · assets partial
Facts to confirm             none (0.5 % / 0.75 % / "a worn chain takes the cassette" / €25 / €45 are in facts.md, as of 2026-09)
Still open                   nothing

ASSET MAP — V03

| # | Scene | Needs | Have | Status |
|---|---|---|---|---|
| 1 | hook: the checker in the chain | clip of the gauge dropping in | A02 0:00–0:03 | have |
| 2 | signature | the owner at the bench, clean | A01 0:00–0:03 | have |
| 3 | the rule stated | nothing (text scene) | brand.md | have (text scene) |
| 4 | the check done on screen | the gauge in the chain, the reading | A02 0:00–0:04 | have |
| 5 | what a worn chain does | a worn cassette, close | — | GAP |
| 6 | the result | the number, the replace-at line | brand.md | have (text scene) |
| 7 | CTA | end card | brand.md + A03 | have (text scene) |

Must be real for a how-to: scene 4 (have).
Buildable now: yes, as a 30 s how-to with scene 5 as a text scene. With the cassette clip it is the full how-to.

GAP REPORT — V03

Gap 5 — what a worn chain does (supporting; not must-be-real)
  A  placeholder frame   grey card "[PLACEHOLDER: worn cassette, close, 4 s]"; renders now for timing, never published
  B  text scene          "Past 0.75 % the chain has already reshaped the teeth. New chain, old cassette: it skips." in brand style over a slow push-in on A02's last frame; the video stays a how-to
  C  leave it out        drop the scene; the one idea becomes "measure and replace at 0.5 %" with the cassette only in the result card; summary re-presented
  D  provide it          5 s, 9:16, the worn cassette close with the new chain skipping if you can; your hands only; natural light at the bench; stays `briefed` until it arrives
  Recommended: D, because you have the cassette on the bench today and the shot is what makes the rule land.

Approve the summary, and say the decision for gap 5.
```

## Owner

> Approved. 5 D, I'll shoot it tonight.

## After approval

Agent writes the storyboard from the how-to skeleton with scene 5 marked `awaiting A05`, the text scenes for scenes 3, 6 and 7, and the publish block into `videos/V03-chain-wear-check/brief.md`; adds the shot-list row to `assets/ASSETS.md` "Missing shots requested"; moves V03 to `briefed` (not `gaps-resolved`: a D is outstanding); tags the hook in `hooks.md`; fills "Said in" for take T2 in `seeds.md`; hands back the path and "when A05 arrives, run `inventory-assets`, then `build V03`".

## The same run with no footage at all (Entry A)

If the owner had only the booking-page screenshot and the logo, the asset map would read `GAP` on scenes 1, 2 and 4, and the report's first line would be: "Buildable now: only as a text-led how-to (scenes 1, 2, 4 as text scenes over the still); that is a how-to in name only. Recommended: D for scene 4 (the check on camera is the point of a how-to); B for 1 and 2 if you want a version out this week; or change the type to an explainer and let the cards carry it."
