---
name: collect-facts
description: Guide that writes businesses/<slug>/facts.md, the grounding file: every claim a video may make with its source and limit, exact numbers and prices with dates, what the business does not do, who does what, and what is roadmap only. Nothing goes on screen that is not here. Use when the person says "facts", "what can we claim", "add this fact", gives a spec, price or number, or when setup-business, readiness, make-video (facts gate) or build-video (grounding pass) names facts as missing.
---

# Collect the facts

Upstream: business (`profile.md`).
Downstream: ideas, pillars, every script (grounding gate).
Why now: ideas are only worth listing if they can be backed, and nothing goes on screen that is not in the facts file; reading the site once for facts and voice together saves reading it twice.

Shared shape and rules: `strategy/12-guides.md`. Grounding law: `strategy/07-edit-fundamentals.md` (creative law 5).

## Before asking anything

1. `npx smma-videos readiness <slug>`. If `profile.md` is `missing`: "I need the business first, because the facts worth collecting follow from what is offered; two minutes?" Otherwise go on.
2. Offer the one pass: "I'm about to read your site for claims and numbers. I can pull how you write at the same time (business-voice). Both?" If yes, run both guides from the same reading.
3. Read: the site (home, product or service pages, pricing, FAQ, guides, about), documents, specs, the sources listed in `profile.md`. Extract every claim and number with its page.
4. Present what you found as draft rows, grouped: claims, numbers, limits stated on the site, roles. "Here are N claims and M numbers from your site, with the page each came from. Which are wrong or out of date?"

## Questions (two or three a turn)

- **Limits.** "What does it not do, that people sometimes expect? Which of those are you willing to say on camera?" A stated limit is a trust move; get at least three.
- **Conditions on numbers.** For each headline number: "Always, or under what conditions?" Write the condition into the row ("about 90 minutes, before the sun hits the grass").
- **Roles.** "When it's in use, who does what? Is there anyone who must never be shown doing X?" (The original method had a hard rule: the pilot never controls the robot.)
- **Roadmap.** "What is promised or in progress but not live yet?" Those rows go under "Not yet"; videos about them are briefed and held, never built.
- **Claims about others.** If any idea compares to how others do it: "Can you stand behind that number about other people's way?" If not, it is not a fact.

## Write the file

`facts.md` with `## Claims` (table: claim, source, limit / condition, used in), `## Numbers` (value, as of, source), `## What it does not do`, `## People and roles`, `## Not yet / roadmap`, `## Needs the owner`. Remove the template marker. Exact figures dated. Rows the owner has not confirmed stay `[Owner]`.

## Refine by correction

Every time the owner gives a new number or story during any later skill, it comes here first, then into the brief. Say "added to facts.md as claim N" each time. A fact that changes (a price) gets a new "as of" and the old row struck, not deleted.

## Finish

- `npx smma-videos readiness <slug>`; show it.
- "Next: voice, if we didn't do it in the same pass; then channels, because the calendar needs to know where the videos go and the CTA depends on the channel."

## Do not

- Round a number the site hedges, or hedge one it states exactly.
- Record a claim with no source. "The owner said so, on <date>" is a source; "probably" is not.
- Write marketing claims as facts ("best in class"). A fact is checkable.
