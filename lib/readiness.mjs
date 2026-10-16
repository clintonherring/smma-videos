import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PREREQUISITES, TIERS, byId, tierMembers } from "./prerequisites.mjs";
import { businessDir, projectRoot } from "./paths.mjs";
import { quickRenderChecks } from "./doctor.mjs";

const TEMPLATE_MARK = "smma-videos:template";
const OWNER_MARK = /\[Owner\]|\bTODO\b/g;

function sectionBody(text, heading) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim().toLowerCase() === heading.toLowerCase());
  if (start < 0) return null;
  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,2}\s/.test(lines[i])) break;
    out.push(lines[i]);
  }
  return out;
}

function openNeeds(text) {
  const body = sectionBody(text, "## Needs the owner");
  if (!body) return 0;
  return body.filter((l) => /^\s*[-*]\s+\S/.test(l) && !/^\s*[-*]\s+(none|nothing)\b/i.test(l)).length;
}

export function assessFile(dir, p) {
  const file = path.join(dir, p.file);
  if (!existsSync(file)) return { status: "missing", note: "file not there yet" };
  const text = readFileSync(file, "utf8");
  if (text.includes(TEMPLATE_MARK)) return { status: "missing", note: "still the template" };
  const missingSections = p.sections.filter((h) => !new RegExp(`^${h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "mi").test(text));
  if (missingSections.length) return { status: "missing", note: `missing section ${missingSections.map((s) => `"${s.replace(/^##\s*/, "")}"`).join(", ")}` };
  if (p.minRows) {
    const rows = (text.match(new RegExp(p.minRows.pattern.source, "gm")) || []).length;
    if (rows < p.minRows.count) return { status: "missing", note: `${rows} row${rows === 1 ? "" : "s"}; needs at least ${p.minRows.count}` };
  }
  const owner = (text.match(OWNER_MARK) || []).length;
  const needs = openNeeds(text);
  if (owner || needs) {
    const parts = [];
    if (owner) parts.push(`${owner} [Owner] item${owner === 1 ? "" : "s"}`);
    if (needs) parts.push(`${needs} open under "Needs the owner"`);
    return { status: "draft", note: parts.join(", ") };
  }
  return { status: "ready", note: "" };
}

export function assess(slug, root = projectRoot()) {
  const dir = businessDir(slug, root);
  if (!existsSync(dir)) throw new Error(`No business at ${dir}. Run: npx smma-videos init ${slug}`);
  const rows = PREREQUISITES.map((p) => {
    if (p.id === "renderenv") {
      const r = quickRenderChecks();
      return { ...p, status: r.ok ? "ready" : "missing", note: r.summary };
    }
    return { ...p, ...assessFile(dir, p) };
  });
  const status = Object.fromEntries(rows.map((r) => [r.id, r.status]));
  const tiers = Object.fromEntries(
    TIERS.map((t) => {
      const members = tierMembers(t);
      const missing = members.filter((m) => status[m.id] === "missing").map((m) => m.id);
      const drafts = members.filter((m) => status[m.id] === "draft").map((m) => m.id);
      return [t, { state: missing.length ? "blocked" : drafts.length ? "draft" : "ready", missing, drafts }];
    }),
  );
  const next = rows.find((r) => r.status === "missing") || rows.find((r) => r.status === "draft") || null;
  return { slug, dir, rows, status, tiers, next };
}

export function renderMarkdown(a) {
  const tierLine = (t) => {
    const x = a.tiers[t];
    if (x.state === "ready") return `**${t}**: ready`;
    if (x.state === "draft") return `**${t}**: ready with drafts (${x.drafts.join(", ")} still carry [Owner] items)`;
    return `**${t}**: blocked by ${x.missing.join(", ")}`;
  };
  const lines = [
    `# Readiness: ${a.slug}`,
    "",
    `Rebuilt by \`npx smma-videos readiness ${a.slug}\`; do not edit by hand. Status: \`missing\` (file absent, still the template, or a required section is missing) · \`draft\` (filled, but carries [Owner] proposals or open items under "Needs the owner") · \`ready\`.`,
    "",
    "## Tiers",
    "",
    ...TIERS.map((t) => `- ${tierLine(t)}`),
    "",
    "## Prerequisites (in the order to do them)",
    "",
    "| # | Prerequisite | File | Guide | Status | Note | Needed for |",
    "|---|---|---|---|---|---|---|",
    ...a.rows.map((r, i) => `| ${i + 1} | ${r.label} | ${r.file ? `\`${r.file}\`` : "(doctor)"} | \`${r.guide}\` | ${r.status} | ${r.note || ""} | ${r.tier} |`),
    "",
    "## Next",
    "",
    a.next
      ? `**${a.next.label}** (\`${a.next.guide}\`), because ${a.next.because}.`
      : "Nothing. Every prerequisite is ready.",
    "",
  ];
  return lines.join("\n");
}

export function renderMessage(a) {
  const out = [];
  const readyTiers = TIERS.filter((t) => a.tiers[t].state !== "blocked");
  out.push(`READINESS: ${a.slug}`);
  out.push(`Ready for: ${readyTiers.length ? readyTiers.map((t) => (a.tiers[t].state === "draft" ? `${t} (with drafts)` : t)).join(", ") : "nothing yet"}.`);
  let prev = [];
  for (const t of TIERS) {
    const missing = a.tiers[t].missing.filter((m) => !prev.includes(m));
    if (missing.length) out.push(`Before a ${t} I ${prev.length ? "also " : "still "}need: ${missing.map((m) => byId[m].label).join(", ")}.`);
    prev = prev.concat(a.tiers[t].missing);
  }
  const drafts = a.rows.filter((r) => r.status === "draft");
  if (drafts.length) out.push(`Drafts with open owner items: ${drafts.map((d) => `${d.label} (${d.note})`).join("; ")}.`);
  if (a.next) {
    out.push("");
    out.push(`Next: ${a.next.label}, because ${a.next.because}.`);
    out.push(`Run the \`${a.next.guide}\` guide (say "${a.next.label}"), or say "all" to go through everything in order.`);
  } else {
    out.push("");
    out.push("Everything is ready. Next: video-schedule to fill SCHEDULE.md, or make-video with an idea or backlog ID.");
  }
  return out.join("\n");
}

export function runReadiness(slug, { json = false, write = true, root = projectRoot() } = {}) {
  const a = assess(slug, root);
  if (write) writeFileSync(path.join(a.dir, "READINESS.md"), renderMarkdown(a));
  if (json) {
    const { rows, ...rest } = a;
    return JSON.stringify({ ...rest, rows: rows.map(({ id, label, file, guide, status, note, tier, because }) => ({ id, label, file, guide, status, note, tier, because })) }, null, 2);
  }
  return renderMessage(a);
}
