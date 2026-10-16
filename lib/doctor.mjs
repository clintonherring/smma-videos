import { spawnSync } from "node:child_process";
import os from "node:os";

const MIN_NODE = 22;

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32", ...opts });
  if (r.error) return { ok: false, out: "", err: r.error.message };
  const out = `${r.stdout || ""}${r.stderr || ""}`;
  return { ok: r.status === 0, out, err: r.status === 0 ? "" : out.trim() };
}

function firstLine(s) {
  return (s || "").split(/\r?\n/).find((l) => l.trim()) || "";
}

export function hints(tool) {
  const p = process.platform;
  const byTool = {
    ffmpeg: {
      linux: "sudo apt install ffmpeg   (Debian/Ubuntu)  or  sudo dnf install ffmpeg",
      darwin: "brew install ffmpeg",
      win32: "winget install Gyan.FFmpeg   (then open a new terminal so PATH updates)",
    },
    node: {
      linux: "install Node 22+ from https://nodejs.org or with nvm: nvm install 22",
      darwin: "brew install node@22  or  nvm install 22",
      win32: "winget install OpenJS.NodeJS.LTS  or download from https://nodejs.org",
    },
    git: {
      linux: "sudo apt install git",
      darwin: "xcode-select --install  or  brew install git",
      win32: "winget install Git.Git",
    },
    hyperframes: {
      linux: "npx hyperframes@latest doctor   (downloads on first run; needs network)",
      darwin: "npx hyperframes@latest doctor   (downloads on first run; needs network)",
      win32: "npx hyperframes@latest doctor   (downloads on first run; needs network)",
    },
  };
  return byTool[tool]?.[p] || byTool[tool]?.linux || "";
}

export function checkNode() {
  const major = Number(process.versions.node.split(".")[0]);
  return { name: "node", ok: major >= MIN_NODE, detail: `v${process.versions.node}`, need: `>= ${MIN_NODE}`, hint: hints("node") };
}

export function checkBinary(name, versionArgs = ["-version"]) {
  const r = run(name, versionArgs);
  return { name, ok: r.ok, detail: r.ok ? firstLine(r.out).slice(0, 80) : "not found on PATH", hint: hints(name === "ffprobe" ? "ffmpeg" : name) };
}

export function checkHyperframes({ full = false } = {}) {
  const r = run("npx", ["--no-install", "hyperframes", "--version"], { timeout: 60_000 });
  const installed = r.ok;
  if (!full) {
    return {
      name: "hyperframes",
      ok: installed,
      detail: installed ? `hyperframes ${firstLine(r.out)}` : "not installed locally (npx will fetch it on first build; run doctor --full to try)",
      hint: hints("hyperframes"),
      soft: true,
    };
  }
  const d = run("npx", ["--yes", "hyperframes@latest", "doctor"], { timeout: 180_000 });
  // Its exit code also counts optional tools (Docker, whisper, TTS); only Chrome, FFmpeg and Node gate a render.
  const plain = d.out.replace(/\x1b\[[0-9;]*m/g, "");
  const ran = /hyperframes doctor/i.test(plain);
  const required = ["Chrome", "FFmpeg", "FFprobe", "Node.js"];
  const failing = required.filter((k) => new RegExp(`[✗x]\\s+${k}\\b`).test(plain) || !new RegExp(`${k}\\b`).test(plain));
  const ok = ran && failing.length === 0;
  const optionalMissing = (plain.match(/✗\s+([^\n]+?)\s{2,}/g) || []).map((l) => l.replace(/✗\s+/, "").trim()).filter((n) => !required.includes(n));
  return {
    name: "hyperframes",
    ok,
    detail: ok
      ? `npx hyperframes doctor: Chrome, FFmpeg, Node ok${optionalMissing.length ? ` (optional missing: ${optionalMissing.join(", ")})` : ""}`
      : ran
        ? `npx hyperframes doctor reports problems with: ${failing.join(", ")}`
        : `could not run npx hyperframes doctor: ${firstLine(d.err) || "no output"}`,
    hint: ok ? "" : failing.includes("Chrome") ? "install Chrome, or: npx @puppeteer/browsers install chrome-headless-shell" : hints("hyperframes"),
    soft: !installed && !ran,
  };
}

/** The checks the readiness row "render environment" is built from. Fast, no network. */
export function quickRenderChecks() {
  const checks = [checkNode(), checkBinary("ffmpeg"), checkBinary("ffprobe")];
  const bad = checks.filter((c) => !c.ok);
  return {
    ok: bad.length === 0,
    checks,
    summary: bad.length ? `missing: ${bad.map((c) => c.name).join(", ")} (run \`npx smma-videos doctor\`)` : `node ${process.versions.node}, ffmpeg, ffprobe`,
  };
}

export function runDoctor({ full = false } = {}) {
  const checks = [checkNode(), checkBinary("ffmpeg"), checkBinary("ffprobe"), checkBinary("git", ["--version"]), checkHyperframes({ full })];
  const lines = [`smma-videos doctor  (${os.type()} ${os.release()}, ${process.arch})`, ""];
  for (const c of checks) {
    const mark = c.ok ? "ok  " : c.soft ? "warn" : "FAIL";
    lines.push(`${mark}  ${c.name.padEnd(11)} ${c.detail}`);
    if (!c.ok && c.hint) lines.push(`      fix: ${c.hint}`);
  }
  const hard = checks.filter((c) => !c.ok && !c.soft);
  lines.push("");
  if (hard.length) {
    lines.push(`Not ready to render: ${hard.map((c) => c.name).join(", ")}. Briefs and schedules still work; builds need the fixes above.`);
  } else {
    lines.push(full ? "Ready to render." : "Ready to render (Hyperframes is fetched by npx on first build; `doctor --full` runs its own doctor now).");
  }
  return { ok: hard.length === 0, checks, text: lines.join("\n") };
}
