# Despecialise: remove what is specific to the `videos` repo and its business

## Objective

`smma-videos` must read as a method for *any* business. Two changes:

1. Replace the `clinton-voice`-derived voice setup with the generic `my-voice` setup from `clintonherring/skills` (`job-post-resume-writer/skills/my-voice`): samples of the person's own writing → read in full → statistical profile → `voice.md` with patterns to copy (quoted), their phrases, words and shapes to avoid, rewrite examples → read back and correct → apply before every line → add samples later. The voice setup is one of the business setup guides (`business-voice`), and the line check used by `make-video` / `build-video` comes from that profile, not from Clinton's habits.
2. Find and rewrite every place that is still specific to OpenSAR / Clinton / Rover / drone nest search, or that encodes Clinton's personal writing habits (hedged numbers, "leaves the other method its place", "the room", the signature as "who I am · what we share · like you") as if they were generic rules. Strategy examples may stay illustrative if clearly marked as one example among others from different businesses.

## Relevant files

- `skills/business-voice/SKILL.md` — rewrite from `my-voice`
- `skills/make-video/reference.md` — generic step → doc map; voice rows must point at the profile
- `templates/business/voice.md` — section headings follow the my-voice template; `lib/prerequisites.mjs` `voice.sections` must match
- `strategy/01-audience-and-voice.md`, `02-hooks.md`, `03-signature.md`, `06-delivery-and-narration.md` — most likely carriers of OpenSAR examples and "the room"
- `businesses/example-business/voice.md` — rewrite to the new shape
- everything else: scanned by explore subagents (see findings below)

## Constraints

- Node-only CLI (no Python): if the profiler is worth keeping, port `voice_profile.py` to `lib/`
- Keep section headings in sync between template, `prerequisites.mjs`, example business and tests
- `.cursor/skills` mirror must be regenerated (`node bin/cli.mjs install --agent cursor`); `node test/run.mjs` must pass

## Findings (filled from the explore pass)

Three scans, `explore` subagents on `composer-2.5-fast`: `strategy/`, `skills/`, and templates + docs + README + reference + example business. `lib/`, `bin/`, `test/` had nothing (only `clintonherring` GitHub URLs, which are the real repo).

### Vocabulary carried over from the `videos` repo (category b: author habits stated as rules)

| Old | New | Why |
|---|---|---|
| the room (hook that opens on what most people do) | the default, "the default and its cost" | "room" was a private name; the thing it names is generic |
| the abstract (what the video is actually after) | the point | plain word |
| ceiling (what a method cannot do) | limit | plain word |
| one honest limit · both ways cost something | one limit · what each way costs | the honesty rule stays; the phrasing was one person's |
| hedged numbers · condition and limit · number hedged | read from the business's samples (`voice.md` Patterns) | one owner hedges, another does not |
| who I am · what we share · like you (the signature) | shapes the business picks from: peer, presence, place, promise | the three-part line was one business's signature |
| coffee shop rule · coffee-shop check · relaxed "three things" energy | the out-loud test (`business-voice`) | same check, now tied to the profile |
| `business-voice` part 1 / part 2 | mode 1 build · mode 2 apply · mode 3 add sample | my-voice's modes |
| `voice.md` How they write · We say / not · Slogan to sentence · Check before handing a line back | Built from · Patterns to copy · Their phrases · Words and shapes to avoid · Rewrite examples · Signature line · Who speaks · Needs the owner | my-voice's template |
| a hint of "replace" (group posts) | a hint of selling | "help, not replace" was OpenSAR's position |

### OpenSAR examples to replace (category a) — multi-business examples instead

- `strategy/03-signature.md` 17, 20, 28, 32 (drone pilot, Rover, nests); `04-formats.md` 62–69 (two layers: Rover / GPS "3 m off, RTK ±2 cm"); `05-ctas-and-publishing.md` 13, 33–39 (Rover caption); `06-delivery-and-narration.md` 13, 45, 47, 72 (hover, hectares, robot); `07-edit-fundamentals.md` 75; `09-which-videos.md` 13–16, 82, 96 (pillar names "Field knowledge", "Help, not replace", V03/V04/V08 IDs, "Who's got me today" series); `10-assets-and-gaps.md` 36–39, 57, 60, 90–91 (gate at dawn, marker, controller); `11-text-scenes.md` 11–18, 45 (sunrise, 20 ha, divide the height by ten, Anna ground team, Pilot 2 · opensar.eu); `12-guides.md` 3 (provenance sentence)
- `skills/collect-facts/SKILL.md` 24–25; `collect-seeds/SKILL.md` 25; `define-pillars/SKILL.md` 37; `inventory-assets/SKILL.md` 23; `video-schedule/SKILL.md` 26; `build-video/text-scenes.md` 32, 83 ("Here. Not near here.", Anna)
- `templates/composition-brief.md` 22–24, 59–60 (gate-dawn.mp4, phone-marker.jpg, divide the height by ten)
- `README.md` 5 ("works the way the OpenSAR videos repo works")

### Vocabulary sites (category b)

- `skills/absorb-source/SKILL.md` 10, 82; `build-video/SKILL.md` 20; `build-video/text-scenes.md` 66; `build-video/type-profiles.md` 8, 13; `make-video/SKILL.md` 25, 48, 61; `make-video/examples.md` 11, 40, 43; `make-video/reference.md` 15, 18; `video-fundamentals/SKILL.md` 22–23
- `strategy/03-signature.md` 13, 41–51, 68; `08-video-types.md` 12, 17, 21, 36–39, 43–44, 71, 99; `12-guides.md` 31, 48
- `templates/storyboard.md` 23, 25, 39, 41; `templates/video-brief.md` 14, 17; `templates/business/hooks.md` 15; `templates/business/PERFORMANCE.md` 28
- `businesses/example-business/hooks.md` 17; `voice.md` (whole file, old shape); `videos/V03…/brief.md` 12, 15; `videos/V07…/brief.md` 12; `PERFORMANCE.md` 28
- `reference/sources.md` 24 (clinton-voice row → my-voice from `clintonherring/skills`)

### Kept on purpose

- `reference/sources.md` provenance lines naming OpenSAR, Rover and the `videos` repo: that file exists to say where the method came from
- `templates/business/facts.md` "Numbers carry their condition" / "Limit / condition" column: a fact's condition is fact hygiene, not voice; stays
- `package.json`, README install commands: `clintonherring/smma-videos` is the real repo
- `strategy/07-edit-fundamentals.md` 46 multi-business row: already one example among others

### Who did what

- Main agent: `business-voice`, `lib/voice.mjs` + CLI, voice template + manifest, `strategy/01`, `02`, `03`, `08`, `12`, `make-video/*`, `build-video/*`, `video-fundamentals`, `absorb-source`, templates (brief, storyboard, hooks, PERFORMANCE), example business, README, `reference/sources.md`
- Fast `generalPurpose` subagent (BUILD-SIMPLE, example substitution with the vocabulary table above): `strategy/04`, `05`, `06`, `07`, `09`, `10`, `11`, `templates/composition-brief.md`, `skills/collect-facts`, `collect-seeds`, `define-pillars`, `inventory-assets`, `video-schedule`; reviewed by the main agent with `rg` against the keyword list
