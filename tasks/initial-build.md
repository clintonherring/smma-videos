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

Next: run the example business through the whole flow once more when Hyperframes helper skills change.
