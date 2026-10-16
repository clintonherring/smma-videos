import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { packageRoot, projectRoot, rel } from "./paths.mjs";

/** Project-level skill discovery directories per agent. */
export const AGENT_DIRS = {
  cursor: ".cursor/skills",
  claude: ".claude/skills",
  codex: ".agents/skills",
  opencode: ".opencode/skills",
};

export function skillNames() {
  const src = path.join(packageRoot, "skills");
  if (!existsSync(src)) return [];
  return readdirSync(src).filter((n) => existsSync(path.join(src, n, "SKILL.md")));
}

export function runInstall({ agent = "all", root = projectRoot(), clean = true } = {}) {
  const agents = agent === "all" ? Object.keys(AGENT_DIRS) : agent.split(",").map((a) => a.trim());
  for (const a of agents) if (!AGENT_DIRS[a]) throw new Error(`Unknown agent "${a}". Use one of: ${Object.keys(AGENT_DIRS).join(", ")}, all`);
  const names = skillNames();
  if (!names.length) throw new Error(`No skills found under ${path.join(packageRoot, "skills")}`);
  const out = [];
  for (const a of agents) {
    const dest = path.join(root, ...AGENT_DIRS[a].split("/"));
    mkdirSync(dest, { recursive: true });
    for (const n of names) {
      const target = path.join(dest, n);
      if (clean && existsSync(target)) rmSync(target, { recursive: true, force: true });
      cpSync(path.join(packageRoot, "skills", n), target, { recursive: true });
    }
    out.push(`${a.padEnd(9)} ${rel(root, dest)}/  (${names.length} skills)`);
  }
  return [
    `Installed skills into ${root}:`,
    ...out,
    "",
    `Skills: ${names.join(", ")}`,
    "",
    "Copies, not links (links break on Windows). Re-run after updating the package. .cursor/skills is committed in the smma-videos repo; the others are gitignored there, so add them to your own project's git as you like.",
  ].join("\n");
}
