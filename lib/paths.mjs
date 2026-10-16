import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Directory of this package (where templates/, skills/, strategy/ live), wherever npx put it. */
export const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * The project the user is working in. Walks up from cwd looking for a `businesses/` directory
 * or this package's own package.json; falls back to cwd so `init` can create `businesses/` anywhere.
 */
export function projectRoot(start = process.cwd()) {
  let dir = path.resolve(start);
  for (;;) {
    if (existsSync(path.join(dir, "businesses"))) return dir;
    const pkg = path.join(dir, "package.json");
    if (existsSync(pkg)) {
      try {
        if (JSON.parse(readFileSync(pkg, "utf8")).name === "smma-videos") return dir;
      } catch {
        /* not ours */
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) return path.resolve(start);
    dir = parent;
  }
}

export function businessDir(slug, root = projectRoot()) {
  if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw new Error(`Business slug must be lowercase letters, digits and hyphens (got "${slug ?? ""}").`);
  }
  return path.join(root, "businesses", slug);
}

export function rel(root, p) {
  return path.relative(root, p).split(path.sep).join("/");
}
