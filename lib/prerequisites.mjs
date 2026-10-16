/**
 * The ordered manifest of everything a business folder needs before a schedule, a brief or a build.
 *
 * Order matters: each row feeds the ones after it. `readiness` prints missing rows in this order and
 * says the `because` for the next one; every guide skill opens with the same Upstream / Downstream
 * block generated from these rows, so the reason for the order is said the same way everywhere.
 *
 * Fields
 *   id        short name used in READINESS.md and by the skills
 *   file      path inside businesses/<slug>/ (null for checks that are not a file)
 *   guide     the skill that fills it
 *   sections  "## " headings that must be present for the file to count as filled
 *   needs     ids that should be at least `draft` before this guide runs
 *   feeds     ids (or outputs) that depend on this one; shown to the person as "why this matters"
 *   because   the one sentence said before running the guide
 *   tier      the first output that cannot be produced without it: schedule | brief | build
 */
export const TIERS = ["schedule", "brief", "build"];

export const PREREQUISITES = [
  {
    id: "business",
    label: "business",
    file: "profile.md",
    guide: "define-business",
    sections: ["## What we do", "## Who it is for", "## The offer", "## What a video should cause", "## The one number"],
    needs: [],
    feeds: ["audience", "facts", "voice", "channels", "brand"],
    because: "the one viewer, the facts worth collecting, the channels that matter and the CTA all follow from what is offered and to whom",
    tier: "schedule",
  },
  {
    id: "audience",
    label: "audience",
    file: "audience.md",
    guide: "define-audience",
    sections: ["## The one viewer", "## Moments they have lived", "## What they already believe", "## The feeling at the end", "## What they would never forgive", "## A second viewer?"],
    needs: ["business"],
    feeds: ["channels", "ideas", "pillars", "every hook"],
    because: "a pillar is defined by its viewer, an idea is a moment that viewer has lived, and channels are where that viewer already is",
    tier: "schedule",
  },
  {
    id: "facts",
    label: "facts",
    file: "facts.md",
    guide: "collect-facts",
    sections: ["## Claims", "## Numbers", "## What it does not do", "## People and roles"],
    needs: ["business"],
    feeds: ["ideas", "pillars", "every script (grounding gate)"],
    because: "ideas are only worth listing if they can be backed, and nothing goes on screen that is not in the facts file; reading the site once for facts and voice together saves reading it twice",
    tier: "brief",
  },
  {
    id: "voice",
    label: "voice",
    file: "voice.md",
    guide: "business-voice",
    sections: ["## Built from", "## Patterns to copy", "## Their phrases", "## Words and shapes to avoid", "## Rewrite examples", "## Signature line", "## Who speaks"],
    needs: ["business"],
    feeds: ["ideas", "every spoken line, hook, caption and text scene"],
    because: "a hook or caption that does not sound like the business gets rewritten anyway; building the profile once from their own writing is cheaper than correcting every line",
    tier: "brief",
  },
  {
    id: "channels",
    label: "channels",
    file: "channels.md",
    guide: "define-channels",
    sections: ["## Channels", "## CTA per channel", "## Cadence"],
    needs: ["business", "audience"],
    feeds: ["ideas", "pillars", "calendar", "every CTA"],
    because: "an idea for a community group and an idea for LinkedIn are different ideas, and the calendar cannot set a cadence without knowing how many channels and how much time there is",
    tier: "schedule",
  },
  {
    id: "ideas",
    label: "ideas",
    file: "BACKLOG.md",
    guide: "seed-ideas",
    sections: ["## Ideas"],
    minRows: { pattern: /^\|\s*[A-Z]{1,3}\d{2,}\s*\|/m, count: 3 },
    needs: ["audience", "facts", "channels"],
    feeds: ["pillars", "seeds", "calendar", "assets"],
    because: "pillars are a sort of real ideas, not categories invented in the abstract; the story behind an idea is a seed, and which ideas need footage decides the calendar",
    tier: "schedule",
  },
  {
    id: "pillars",
    label: "pillars",
    file: "pillars.md",
    guide: "define-pillars",
    sections: ["## Pillars", "## Topics under each pillar", "## Rules"],
    needs: ["ideas", "audience"],
    feeds: ["calendar", "the picking rule", "the backlog's Pillar column"],
    because: "the schedule picks by pillar share, and a pillar with no ideas under it is a sign the pillar or the concept is not clear yet",
    tier: "schedule",
  },
  {
    id: "seeds",
    label: "seeds",
    file: "seeds.md",
    guide: "collect-seeds",
    sections: ["## Content gaps", "## Takes", "## Story bank", "## Series"],
    needs: ["pillars", "ideas"],
    feeds: ["hooks at brief time", "the saturation filter", "series"],
    because: "a hook is a moment or a gap, and both need a pillar and an ID to be worth keeping",
    tier: "schedule",
  },
  {
    id: "calendar",
    label: "calendar",
    file: "calendar.md",
    guide: "define-calendar",
    sections: ["## Slots", "## Phases", "## Rules"],
    needs: ["pillars", "channels", "ideas"],
    feeds: ["SCHEDULE.md"],
    because: "slots are filled by pillar share, cadence comes from channels, and which ideas need footage or a season decides where they can sit",
    tier: "schedule",
  },
  {
    id: "brand",
    label: "brand",
    file: "brand.md",
    guide: "define-brand",
    sections: ["## Colours", "## Fonts", "## Logo", "## Captions", "## Text scenes", "## Format and safe zones"],
    needs: ["business"],
    feeds: ["build", "text scenes", "poster"],
    because: "every text scene and caption is set in these; without them a build falls back to defaults that look like no one's",
    tier: "build",
  },
  {
    id: "assets",
    label: "assets",
    file: "assets/ASSETS.md",
    guide: "inventory-assets",
    sections: ["## Inventory"],
    minRows: { pattern: /^\|\s*A\d{2,}\s*\|/m, count: 1 },
    needs: ["ideas"],
    feeds: ["the asset map and gap report at brief time", "build"],
    because: "the gap report is the difference between what a video needs and what is here, and each asset is tagged to the idea it could serve",
    tier: "build",
  },
  {
    id: "renderenv",
    label: "render environment",
    file: null,
    guide: "setup-business",
    sections: [],
    needs: [],
    feeds: ["build"],
    because: "a brief can be written anywhere; a render cannot (Node 22+, ffmpeg, Hyperframes)",
    tier: "build",
  },
];

export const byId = Object.fromEntries(PREREQUISITES.map((p) => [p.id, p]));

export function tierMembers(tier) {
  const idx = TIERS.indexOf(tier);
  return PREREQUISITES.filter((p) => TIERS.indexOf(p.tier) <= idx);
}

/** The "Upstream / Downstream" block a guide skill opens with. */
export function upstreamDownstream(id) {
  const p = byId[id];
  if (!p) throw new Error(`Unknown prerequisite "${id}"`);
  const needs = p.needs.length ? p.needs.map((n) => `${byId[n].label} (\`${byId[n].file}\`)`).join(", ") : "nothing but what the person gives you";
  return [
    `Upstream: ${needs}.`,
    `Downstream: ${p.feeds.join(", ")}.`,
    `Why now: ${p.because}.`,
  ].join("\n");
}
