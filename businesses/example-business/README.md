# Example business: Northside Cycle Repair

A fictional one-person bike workshop, filled end to end so a new business can see what "ready" looks like and so the skills can be smoke-tested in any clone. Every fact, price, URL and person here is invented; the media under `assets/` are tiny ffmpeg-generated stand-ins (flat colours with a label).

What it shows:

- all twelve prerequisites `ready` (`npx smma-videos readiness example-business`)
- a backlog of eight ideas sorted into three pillars, a dated schedule, and a seeds file with gaps, takes and stories
- `videos/V03-chain-wear-check/`: a **how-to** taken through `make-video` (the run is written out in `skills/make-video/examples.md`) and `build-video`, with gap 5 resolved as D (the owner shot the missing clip) and the A (placeholder) and B (text scene) variants kept for comparison under `composition/variants/`
- `videos/V07-sunday-chain-check/`: a **launch** from the same assets, so the two type skeletons can be compared

Rebuild the renders (ignored by git):

```bash
cd businesses/example-business/videos/V03-chain-wear-check/composition
npx hyperframes check
npx hyperframes render --quality high --output ../output/V03.mp4
npx hyperframes render -c variants/gap-a.html --output ../output/V03-gap-a.mp4   # placeholder; not for publishing
npx hyperframes render -c variants/gap-b.html --output ../output/V03-gap-b.mp4   # text scene
cd .. && npx smma-videos poster output/V03.mp4 1.2
```

The same for `V07-sunday-chain-check` (`poster … 2.6`).
