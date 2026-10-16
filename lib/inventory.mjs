import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { businessDir, projectRoot } from "./paths.mjs";

const VIDEO = new Set([".mp4", ".mov", ".mkv", ".webm", ".m4v", ".avi"]);
const IMAGE = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".heic"]);
const AUDIO = new Set([".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"]);
const DOC = new Set([".pdf", ".txt", ".md", ".docx"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "ASSETS.md") continue;
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function human(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

export function probe(file) {
  const r = spawnSync("ffprobe", ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", file], {
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (r.error || r.status !== 0) return null;
  try {
    return JSON.parse(r.stdout);
  } catch {
    return null;
  }
}

function orientation(w, h) {
  if (!w || !h) return "";
  if (Math.abs(w - h) / Math.max(w, h) < 0.02) return "1:1";
  return h > w ? "9:16" : "16:9";
}

function kindOf(ext) {
  if (VIDEO.has(ext)) return "clip";
  if (IMAGE.has(ext)) return "image";
  if (AUDIO.has(ext)) return "audio";
  if (DOC.has(ext)) return "document";
  return "file";
}

export function describe(file) {
  const ext = path.extname(file).toLowerCase();
  const kind = kindOf(ext);
  const size = statSync(file).size;
  const row = { kind, duration: "", size: human(size), orientation: "", audio: "", dims: "" };
  if (kind === "clip" || kind === "image" || kind === "audio") {
    const info = probe(file);
    if (info) {
      const v = (info.streams || []).find((s) => s.codec_type === "video");
      const a = (info.streams || []).find((s) => s.codec_type === "audio");
      const dur = Number(info.format?.duration || v?.duration || a?.duration || 0);
      if (kind !== "image" && dur) row.duration = `${dur.toFixed(1)} s`;
      if (v) {
        row.dims = `${v.width}x${v.height}`;
        row.orientation = orientation(v.width, v.height);
      }
      if (kind === "clip") row.audio = a ? "yes" : "no";
      if (kind === "image" && v && /png|mjpeg|webp|gif/.test(v.codec_name || "")) row.kind = "image";
      if (kind === "clip" && v && dur && dur < 0.1) row.kind = "image";
    } else if (kind !== "image") {
      row.duration = "(ffprobe not available)";
    }
  }
  return row;
}

function parseTable(lines, start) {
  // returns { headerIdx, sepIdx, rows: [{idx, cells}] , end }
  let i = start;
  while (i < lines.length && !lines[i].trim().startsWith("|")) i++;
  if (i >= lines.length) return null;
  const headerIdx = i;
  const sepIdx = i + 1;
  const rows = [];
  let j = sepIdx + 1;
  for (; j < lines.length && lines[j].trim().startsWith("|"); j++) {
    rows.push({ idx: j, cells: lines[j].split("|").slice(1, -1).map((c) => c.trim()) });
  }
  return { headerIdx, sepIdx, rows, end: j };
}

export function runInventory(slug, { root = projectRoot() } = {}) {
  const dir = businessDir(slug, root);
  const assetsDir = path.join(dir, "assets");
  const manifest = path.join(assetsDir, "ASSETS.md");
  if (!existsSync(assetsDir)) throw new Error(`No assets folder at ${assetsDir}. Run: npx smma-videos init ${slug}`);
  const files = existsSync(assetsDir) ? walk(assetsDir) : [];
  const lines = (existsSync(manifest) ? readFileSync(manifest, "utf8") : "# Assets\n\n## Inventory\n\n| ID | File / location | Kind | Duration / size | Orientation | Audio | What it shows | May publish? (licence, consent) | Could serve (IDs / pillar) |\n|---|---|---|---|---|---|---|---|---|\n").split(/\r?\n/);
  const secIdx = lines.findIndex((l) => l.trim().toLowerCase() === "## inventory");
  if (secIdx < 0) throw new Error(`${manifest} has no "## Inventory" section.`);
  const table = parseTable(lines, secIdx + 1);
  if (!table) throw new Error(`${manifest}: no table under "## Inventory".`);

  const existing = new Map();
  let maxId = 0;
  const keep = [];
  for (const r of table.rows) {
    const [id, file] = r.cells;
    const m = /^A(\d+)$/.exec(id || "");
    if (file === "[Owner]" || (!file && !m)) continue; // template placeholder row
    if (m) maxId = Math.max(maxId, Number(m[1]));
    keep.push(lines[r.idx]);
    if (file) existing.set(file.replace(/^`|`$/g, ""), id);
  }

  const added = [];
  const gone = [];
  for (const [file, id] of existing) {
    if (!/^https?:\/\//.test(file) && !existsSync(path.join(assetsDir, file)) && !existsSync(path.join(dir, file))) gone.push(`${id} ${file}`);
  }
  for (const f of files) {
    const relp = path.relative(assetsDir, f).split(path.sep).join("/");
    if (existing.has(relp)) continue;
    const d = describe(f);
    const id = `A${String(++maxId).padStart(2, "0")}`;
    const durSize = [d.duration, d.dims, d.size].filter(Boolean).join(", ");
    keep.push(`| ${id} | \`${relp}\` | ${d.kind} | ${durSize} | ${d.orientation} | ${d.audio} | [Owner] | [Owner] | |`);
    added.push(`${id}  ${relp}  (${d.kind}${durSize ? `, ${durSize}` : ""}${d.orientation ? `, ${d.orientation}` : ""})`);
  }

  let out = [...lines.slice(0, table.sepIdx + 1), ...keep, ...lines.slice(table.end)];
  // Real rows mean the file is no longer the template; readiness then reads it as a draft until the [Owner] columns are filled.
  if (keep.length) out = out.filter((l) => !l.includes("smma-videos:template"));
  writeFileSync(manifest, out.join("\n"));

  const msg = [`Inventory for ${slug}: ${files.length} file${files.length === 1 ? "" : "s"} under assets/, ${existing.size} already listed, ${added.length} added.`];
  if (added.length) msg.push("", "Added:", ...added.map((a) => `  ${a}`));
  if (gone.length) msg.push("", "Listed but not on disk (fix the path or remove the row):", ...gone.map((g) => `  ${g}`));
  if (added.length) msg.push("", `Each new row has [Owner] in "What it shows" and "May publish?". The inventory-assets guide asks those, plus which idea each could serve.`);
  if (!files.length) msg.push("", `Nothing in ${path.relative(root, assetsDir)}/ yet. Drop clips, images, screen recordings and logos there (subfolders are fine) and run this again.`);
  return msg.join("\n");
}
