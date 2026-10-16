// Plain Node test runner: no dependencies. `npm test`.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { packageRoot } from "../lib/paths.mjs";
import { PREREQUISITES, TIERS, byId } from "../lib/prerequisites.mjs";
import { assess, runReadiness } from "../lib/readiness.mjs";
import { runInit } from "../lib/init.mjs";
import { runInstall, AGENT_DIRS } from "../lib/install.mjs";
import { runInventory } from "../lib/inventory.mjs";
import { quickRenderChecks } from "../lib/doctor.mjs";

const tests = [];
const test = (name, optsOrFn, maybeFn) => {
  const fn = typeof optsOrFn === "function" ? optsOrFn : maybeFn;
  const opts = typeof optsOrFn === "function" ? {} : optsOrFn;
  tests.push({ name, fn, skip: Boolean(opts.skip) });
};
const tmp = () => mkdtempSync(path.join(os.tmpdir(), "smma-videos-"));
const has = (bin) => !spawnSync(bin, ["-version"], { shell: process.platform === "win32" }).error;

// A filled file for prerequisite `id`: every required section present, no [Owner], an empty needs list.
function filled(id) {
  const p = byId[id];
  const body = p.sections.map((s) => `${s}\n\nSomething real here.\n`).join("\n");
  const rows = id === "ideas" ? "\n| ID | Idea | Type |\n|---|---|---|\n| V01 | a | how-to |\n| V02 | b | story |\n| V03 | c | launch |\n" : id === "assets" ? "\n| ID | File |\n|---|---|\n| A01 | `clips/x.mp4` |\n" : "";
  return `# ${p.label}\n\n${body}${rows}\n## Needs the owner\n\n- none\n`;
}

test("manifest: order is topological (every need appears earlier)", () => {
  const seen = new Set();
  for (const p of PREREQUISITES) {
    for (const n of p.needs) assert.ok(seen.has(n), `${p.id} needs ${n} which comes later`);
    seen.add(p.id);
    assert.ok(TIERS.includes(p.tier), `${p.id} tier`);
    assert.ok(p.because && p.guide, `${p.id} because/guide`);
  }
});

test("init: creates skeleton and READINESS.md; everything missing", () => {
  const root = tmp();
  const out = runInit("acme", { root });
  assert.match(out, /Created businesses\/acme/);
  const dir = path.join(root, "businesses", "acme");
  for (const f of ["profile.md", "BACKLOG.md", "assets/ASSETS.md", "READINESS.md"]) assert.ok(existsSync(path.join(dir, f)), f);
  const a = assess("acme", root);
  for (const r of a.rows) if (r.id !== "renderenv") assert.equal(r.status, "missing", r.id);
  assert.equal(a.tiers.schedule.state, "blocked");
  assert.equal(a.next.id, "business");
  assert.match(out, /Next: business, because/);
  rmSync(root, { recursive: true, force: true });
});

test("order: profile filled -> audience next with its because; audience too -> facts", () => {
  const root = tmp();
  runInit("acme", { root });
  const dir = path.join(root, "businesses", "acme");
  writeFileSync(path.join(dir, "profile.md"), filled("business"));
  let msg = runReadiness("acme", { root });
  assert.match(msg, /Next: audience, because a pillar is defined by its viewer/);
  writeFileSync(path.join(dir, "audience.md"), filled("audience"));
  msg = runReadiness("acme", { root });
  assert.match(msg, /Next: facts, because/);
  rmSync(root, { recursive: true, force: true });
});

test("readiness: draft detection and tiers", () => {
  const root = tmp();
  runInit("acme", { root });
  const dir = path.join(root, "businesses", "acme");
  for (const p of PREREQUISITES) if (p.file) writeFileSync(path.join(dir, p.file), filled(p.id));
  let a = assess("acme", root);
  assert.equal(a.tiers.schedule.state, "ready");
  assert.equal(a.tiers.brief.state, "ready");
  // one [Owner] left in pillars -> schedule tier is draft, message names it
  writeFileSync(path.join(dir, "pillars.md"), filled("pillars").replace("Something real here.", "Share [Owner] 40%"));
  a = assess("acme", root);
  assert.equal(a.status.pillars, "draft");
  assert.equal(a.tiers.schedule.state, "draft");
  assert.match(runReadiness("acme", { root }), /Drafts with open owner items: pillars \(1 \[Owner\] item\)/);
  // open Needs-the-owner bullet -> draft
  writeFileSync(path.join(dir, "pillars.md"), filled("pillars").replace("- none", "- confirm the shares"));
  assert.equal(assess("acme", root).status.pillars, "draft");
  // missing section -> missing
  writeFileSync(path.join(dir, "pillars.md"), filled("pillars").replace("## Rules", "## Rulez"));
  const r = assess("acme", root);
  assert.equal(r.status.pillars, "missing");
  assert.match(r.rows.find((x) => x.id === "pillars").note, /Rules/);
  // JSON output
  const j = JSON.parse(runReadiness("acme", { root, json: true }));
  assert.equal(j.slug, "acme");
  assert.ok(Array.isArray(j.rows));
  rmSync(root, { recursive: true, force: true });
});

test("install: identical copies under every agent dir", () => {
  const root = tmp();
  const out = runInstall({ agent: "all", root });
  assert.match(out, /cursor/);
  const names = readdirSync(path.join(packageRoot, "skills")).filter((n) => existsSync(path.join(packageRoot, "skills", n, "SKILL.md")));
  const ref = Object.fromEntries(names.map((n) => [n, readFileSync(path.join(packageRoot, "skills", n, "SKILL.md"), "utf8")]));
  for (const d of Object.values(AGENT_DIRS)) {
    for (const n of names) assert.equal(readFileSync(path.join(root, ...d.split("/"), n, "SKILL.md"), "utf8"), ref[n], `${d}/${n}`);
  }
  rmSync(root, { recursive: true, force: true });
});

test("inventory: ffprobe rows get A## ids and [Owner] columns", { skip: !has("ffmpeg") }, () => {
  const root = tmp();
  runInit("acme", { root });
  const assets = path.join(root, "businesses", "acme", "assets");
  spawnSync("ffmpeg", ["-y", "-f", "lavfi", "-i", "color=c=red:s=180x320:d=1", "-c:v", "libx264", "-pix_fmt", "yuv420p", path.join(assets, "clip.mp4")], { shell: process.platform === "win32" });
  spawnSync("ffmpeg", ["-y", "-f", "lavfi", "-i", "color=c=blue:s=64x64:d=1", "-frames:v", "1", path.join(assets, "logo.png")], { shell: process.platform === "win32" });
  const out = runInventory("acme", { root });
  assert.match(out, /2 added/);
  const md = readFileSync(path.join(assets, "ASSETS.md"), "utf8");
  assert.match(md, /\| A01 \| `clip\.mp4` \| clip \| 1\.0 s, 180x320.*\| 9:16 \| no \| \[Owner\] \| \[Owner\] \|/);
  assert.match(md, /\| A02 \| `logo\.png` \| image \|/);
  assert.doesNotMatch(md, /\| A01 \| \[Owner\]/);
  // second run adds nothing
  assert.match(runInventory("acme", { root }), /0 added/);
  rmSync(root, { recursive: true, force: true });
});

test("doctor: quick checks report node/ffmpeg", () => {
  const q = quickRenderChecks();
  assert.ok(q.checks.length === 3);
  assert.ok(typeof q.summary === "string");
});

test("skills: every SKILL.md under 500 lines with name + description frontmatter", () => {
  const dir = path.join(packageRoot, "skills");
  if (!existsSync(dir)) return;
  for (const n of readdirSync(dir)) {
    const f = path.join(dir, n, "SKILL.md");
    if (!existsSync(f)) continue;
    const text = readFileSync(f, "utf8");
    assert.ok(text.split("\n").length < 500, `${n}: over 500 lines`);
    assert.match(text, /^---\nname: /, `${n}: frontmatter name`);
    assert.match(text, /\ndescription: /, `${n}: frontmatter description`);
    const fm = text.split("---")[1];
    assert.match(fm, new RegExp(`name: ${n}\\n`), `${n}: name matches folder`);
  }
  const mirror = path.join(packageRoot, ".cursor", "skills");
  if (existsSync(mirror)) {
    for (const n of readdirSync(dir)) {
      const a = path.join(dir, n, "SKILL.md");
      const b = path.join(mirror, n, "SKILL.md");
      if (existsSync(a)) assert.ok(existsSync(b) && readFileSync(a, "utf8") === readFileSync(b, "utf8"), `.cursor/skills/${n} out of date: run npx smma-videos install --agent cursor`);
    }
  }
});

test("example business: every tier ready; one [Owner] left in brand.md makes only the build tier draft", () => {
  const src = path.join(packageRoot, "businesses", "example-business");
  if (!existsSync(src)) return;
  const a = assess("example-business", packageRoot);
  for (const t of TIERS) assert.equal(a.tiers[t].state, "ready", `${t}: ${JSON.stringify(a.tiers[t])}`);
  assert.equal(a.next, null);
  // Copy the markdown to a temp root, re-introduce an unconfirmed proposal, and the tracker must say so without touching the other tiers.
  const root = tmp();
  const dir = path.join(root, "businesses", "example-business");
  const copyMd = (fromDir, toDir) => {
    mkdirSync(toDir, { recursive: true });
    for (const f of readdirSync(fromDir, { withFileTypes: true })) {
      if (f.isDirectory()) { if (f.name !== "videos") copyMd(path.join(fromDir, f.name), path.join(toDir, f.name)); continue; }
      if (f.name.endsWith(".md")) writeFileSync(path.join(toDir, f.name), readFileSync(path.join(fromDir, f.name), "utf8"));
    }
  };
  copyMd(src, dir);
  writeFileSync(path.join(dir, "brand.md"), readFileSync(path.join(dir, "brand.md"), "utf8").replace("| Accent | `#e8a33d` (brass) |", "| Accent | [Owner] confirm `#e8a33d` |"));
  const b = assess("example-business", root);
  assert.equal(b.status.brand, "draft");
  assert.equal(b.tiers.schedule.state, "ready");
  assert.equal(b.tiers.brief.state, "ready");
  assert.equal(b.tiers.build.state, "draft");
  assert.equal(b.next.id, "brand");
  rmSync(root, { recursive: true, force: true });
});

let failed = 0;
for (const t of tests) {
  try {
    if (t.skip) {
      console.log(`skip  ${t.name}`);
      continue;
    }
    await t.fn();
    console.log(`ok    ${t.name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL  ${t.name}\n      ${e.message}`);
  }
}
console.log(failed ? `\n${failed} failed` : `\n${tests.length} passed`);
process.exitCode = failed ? 1 : 0;
