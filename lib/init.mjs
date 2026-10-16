import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { businessDir, packageRoot, projectRoot, rel } from "./paths.mjs";
import { runReadiness } from "./readiness.mjs";

export function runInit(slug, { root = projectRoot(), force = false } = {}) {
  const dir = businessDir(slug, root);
  const template = path.join(packageRoot, "templates", "business");
  if (!existsSync(template)) throw new Error(`Template folder not found at ${template}`);
  if (existsSync(dir) && !force) {
    return [`businesses/${slug} already exists (${dir}). Nothing copied.`, "", runReadiness(slug, { root })].join("\n");
  }
  mkdirSync(path.dirname(dir), { recursive: true });
  cpSync(template, dir, { recursive: true, force });
  for (const sub of ["assets", "videos"]) mkdirSync(path.join(dir, sub), { recursive: true });
  const message = runReadiness(slug, { root });
  return [
    `Created ${rel(root, dir)}/ from the business template.`,
    "",
    "Files: profile.md, audience.md, facts.md, voice.md, channels.md, BACKLOG.md, pillars.md, seeds.md, calendar.md, brand.md, hooks.md, SCHEDULE.md, PERFORMANCE.md, assets/ASSETS.md, videos/, READINESS.md",
    "",
    message,
    "",
    `Start with the setup-business skill (say "set up ${slug}") or run the first guide directly.`,
  ].join("\n");
}
