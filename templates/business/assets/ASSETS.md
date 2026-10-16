<!-- smma-videos:template — the inventory-assets guide replaces this file and removes this line -->
# Assets

Everything the business has that a video can be built from. Rows for media files are written by `npx smma-videos inventory <slug>` (ffprobe); the `inventory-assets` guide then asks what each one shows, whether it may be published, and which idea it could serve. Sources that are not files (URLs, text) get rows too.

Put files in this folder (subfolders are fine: `clips/`, `images/`, `screens/`, `logo/`). Files over 100 MB do not belong in git: link them in the Location column instead.

## Inventory

| ID | File / location | Kind | Duration / size | Orientation | Audio | What it shows | May publish? (licence, consent) | Could serve (IDs / pillar) |
|---|---|---|---|---|---|---|---|---|
| A01 | [Owner] | clip / image / screen recording / URL / text / logo / audio | | 9:16 / 16:9 / 1:1 | yes / no / music | | | |

## Sources that are not files

| ID | URL or text | What it gives (copy, facts, product in use, screenshots) |
|---|---|---|
| | | |

## Missing shots requested

Written by `make-video` gap reports (decision D, "provide it"). Cleared when the file arrives and gets an A## row.

| Requested for | Shot (what, framing, length, orientation) | Requested | Arrived as |
|---|---|---|---|
| | | | |

## Needs the owner

- Files, and for each: what it shows and whether it may be published
