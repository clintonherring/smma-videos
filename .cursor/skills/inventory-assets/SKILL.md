---
name: inventory-assets
description: Guide that fills businesses/<slug>/assets/ASSETS.md. Runs `npx smma-videos inventory <slug>` (ffprobe on every file under assets/) to create A## rows, then asks per asset what it shows, whether it may be published (licence, consent of people in frame, nothing sensitive in shot) and which backlog idea or pillar it could serve; adds rows for URLs and text sources; keeps the backlog's Assets column true. Use when the person says "assets", "here are my clips", "inventory", drops files into assets/, asks "what do I have", or when readiness, make-video or build-video names assets as missing.
---

# Inventory the assets

Upstream: ideas (`BACKLOG.md`).
Downstream: the asset map and gap report at brief time, build.
Why now: the gap report is the difference between what a video needs and what is here, and each asset is tagged to the idea it could serve.

Shared shape: `strategy/12-guides.md`. Method: `strategy/10-assets-and-gaps.md`.

## Before asking anything

1. `npx smma-videos readiness <slug>`. If `BACKLOG.md` is `missing`, inventory anyway (files are files) but say the "could serve" column will be filled when ideas exist.
2. Ask the person to put files under `businesses/<slug>/assets/` (subfolders fine: `clips/`, `images/`, `screens/`, `logo/`, `audio/`). Files over 100 MB stay out of git: a link in the Location column instead. Nothing is used that is not inventoried.
3. Run `npx smma-videos inventory <slug>`. It writes a row per new file with kind, duration or dimensions, size, orientation and audio, and `[Owner]` in "What it shows" and "May publish?". Show its summary. Listed-but-missing files are reported; fix or remove those rows.
4. For each new row, look at the file where you can (a still, the first frame of a clip, the text of a document) and propose "what it shows" in one line; the owner corrects.

## Questions (two or three assets a turn)

- **What it shows.** "A04: a person at a gate at dawn with a phone; is that the volunteer arriving? Where, when?"
- **May publish?** "Anyone in frame who hasn't agreed to be in a video? Any screen with customer data, a licence plate, a price that will change?" The answer is yes / no / with a crop or blur. No consent means it is not an asset yet.
- **Could serve.** "Which ideas could this carry?" Propose IDs from `BACKLOG.md` by matching the moment to the idea; the owner confirms. Then update the backlog's `Assets` column: `have` when the type's must-be-real scene is covered, `partial` when something exists but not the right thing, `none` otherwise.
- **Sources that are not files.** "Your product page, the FAQ, this paragraph you sent: shall I add them as sources (copy, facts, screenshots)?"

## Write the file

`assets/ASSETS.md`: the `## Inventory` table (rows from the CLI, columns filled), `## Sources that are not files`, `## Missing shots requested` (left for `make-video`'s gap reports), `## Needs the owner`. The CLI removes the template marker once real rows exist; the file is `draft` until every `[Owner]` cell is filled.

## Refine by correction

When a shot requested by a gap report (decision D) arrives: re-run the inventory, fill the new row, clear the request line, update the backlog row to `gaps-resolved` if nothing else is outstanding, and tell the person which video can now be built.

## Finish

- `npx smma-videos readiness <slug>`; show it.
- If the build tier is ready: "Everything is in place to build. Pick an idea (`make-video V##`) or let the schedule pick (`video-schedule`)."
- If not: name what is still missing and why.

## Do not

- Use or reference a file that has no `A##` row.
- Mark "May publish?" yes on the agent's own judgement. The owner answers it.
- Delete files. Rows can be removed; files are the owner's.
