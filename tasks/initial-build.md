# Initial build

Sources: `clintonherring/videos` (method), `latent-spaces/brag` (render pipeline), `prateekjain98/social-media-manager-skills` (pillars, phases, seeds, performance log, per-business layout). Take/leave in `reference/sources.md`.

Decisions:

- Per-business folders under `businesses/`; skills are shared.
- Prerequisites are an ordered manifest (`lib/prerequisites.mjs`) with `needs`, `feeds`, `because`, tier. `readiness` and every guide read it, so the reason for the order is said the same way everywhere.
- Ideas before pillars: pillars are a sort of real ideas (how `videos/strategy/09-which-videos.md` was built).
- Video type is settled at vet time and carried into the build via `skills/build-video/type-profiles.md`. No tone presets.
- Gap protocol: every missing shot gets one of placeholder / text scene / leave out / provide before build.
- Renderer: Hyperframes via `npx`; ffmpeg-only fallback documented.
- CLI is Node only so Windows works without WSL; skills are copied, not symlinked, into agent directories.

Verified in this environment (Hyperframes 0.8.166, Node 22.14, ffmpeg 6.1, system Chrome):

- `businesses/example-business`: all twelve prerequisites `ready`; the test suite re-introduces an `[Owner]` item into `brand.md` and the build tier alone goes `draft`.
- V03 (how-to, 34 s): `npx hyperframes check` clean (lint 0, contrast pass), rendered, poster baked as frame 0 with 1020 → 1020 frames. Gap-5 variants (`composition/variants/gap-a.html` placeholder, `gap-b.html` text scene) render with `render -c`.
- V07 (launch, 18.8 s) from the same assets: different skeleton, holds, text-scene role; check clean.
- Things learned and written into `skills/build-video`: one root composition per project (variants in a subfolder; media paths relative to the file, `data-composition-src` relative to the root); `data-layout-allow-overflow` for deliberate slide-outs; a single `fromTo` per element keeps the static lint quiet; sparse-keyframe clips are re-encoded with `-g 30`; `drawtext` needs `expansion=none` for a literal `%` in the ffmpeg fallback.

Next: run the example business through the whole flow once more when Hyperframes helper skills change.
