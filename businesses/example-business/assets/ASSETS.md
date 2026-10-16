# Assets

Everything the shop has that a video can be built from. Rows for media files are written by `npx smma-videos inventory example-business` (ffprobe); the `inventory-assets` guide then asked what each one shows, whether it may be published, and which idea it could serve.

The files here are **tiny ffmpeg-generated stand-ins** (flat colours with a label) so the example builds in any clone; in a real business these are the owner's clips, stills and screenshots. They are 540×960 so they stay under 30 KB each; the build scales them to the 1080×1920 canvas.

## Inventory

| ID | File / location | Kind | Duration / size | Orientation | Audio | What it shows | May publish? (licence, consent) | Could serve (IDs / pillar) |
|---|---|---|---|---|---|---|---|---|
| A01 | `clips/bench-signature.mp4` | clip | 3.0 s, 540x960, 27 KB | 9:16 | yes | Jonas at the bench saying the signature line, clean framing | yes (own footage, Jonas only) | every short: signature scene |
| A02 | `clips/chain-checker.mp4` | clip | 4.0 s, 540x960, 8 KB | 9:16 | no | the chain-wear gauge dropping into a chain and the reading | yes (own footage, hands only) | V03, V04, V07 / Workshop knowledge |
| A03 | `images/logo.png` | image | 400x400, 9 KB | 1:1 |  | the NCR logo, brass on transparent | yes (own) | end cards |
| A04 | `images/screenshot-booking-page.png` | image | 1080x1920, 52 KB | 9:16 |  | the booking page on a phone: "Book a service", "Chain and cassette check" | yes (own site) | CTA scenes; V06, V07 / Come in |
| A05 | `clips/worn-cassette.mp4` | clip | 5.0 s, 540x960, 10 KB | 9:16 | no | a worn cassette on the bench, close; the hooked teeth | yes (own footage, hands only) | V03 scene 5, V04 / Workshop knowledge |

## Sources that are not files

| ID | URL or text | What it gives (copy, facts, product in use, screenshots) |
|---|---|---|
| S01 | `northsidecycles.example/guides/chain-wear` | the chain-wear rule and numbers (`facts.md` #1–#4); the voice calibration |
| S02 | `northsidecycles.example/prices` | every price in `facts.md` |
| S03 | news post 2026-09 "Sunday checks" | `facts.md` #8; V07 |

## Missing shots requested

Written by `make-video` gap reports (decision D, "provide it"). Cleared when the file arrives and gets an A## row.

| Requested for | Shot (what, framing, length, orientation) | Requested | Arrived as |
|---|---|---|---|
| V03 gap 5 | the worn cassette close, 5 s, 9:16, Jonas's hands only, natural light at the bench | 2026-09-28 | A05 (2026-09-29) |

## Needs the owner

- none
