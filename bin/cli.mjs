#!/usr/bin/env node
import { readFileSync } from "node:fs";
import path from "node:path";
import { packageRoot } from "../lib/paths.mjs";

const HELP = `smma-videos: video schedule and production skills for any business

Usage
  npx smma-videos doctor [--full]                 check Node >= 22, ffmpeg, ffprobe, git, Hyperframes; print fix hints per OS
  npx smma-videos init <slug> [--force]           copy the business template to businesses/<slug> and write READINESS.md
  npx smma-videos readiness <slug> [--json]       rebuild READINESS.md and say what is missing before a schedule / brief / build, and why
  npx smma-videos inventory <slug>                ffprobe every file under businesses/<slug>/assets into assets/ASSETS.md rows
  npx smma-videos poster <video.mp4> <seconds> [--out file] [--no-bake]
                                                  extract the frame at <seconds> as the poster and bake it as frame 0
  npx smma-videos install --agent cursor|claude|codex|opencode|all
                                                  copy skills/ into that agent's project skill directory
  npx smma-videos order [<id>]                    print the prerequisite order with the reason for each (or one row's Upstream / Downstream block)
  npx smma-videos voice-profile <sample> [...] [--top N]
                                                  statistical read of the business's own writing (sentence length, verbs, phrases,
                                                  hedges, marketing-speak) to confirm what you read before writing voice.md
  npx smma-videos extract-text <file-or-url>      plain text of a sample: .txt .md .html .docx, a URL, or .pdf via pdftotext

Outside a clone, use: npx github:clintonherring/smma-videos <command>
`;

function parse(argv) {
  const args = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      if (v !== undefined) flags[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith("--") && ["agent", "out", "poster-out", "root", "top"].includes(k)) flags[k] = argv[++i];
      else flags[k] = true;
    } else args.push(a);
  }
  return { args, flags };
}

async function main() {
  const { args, flags } = parse(process.argv.slice(2));
  const [cmd, ...rest] = args;
  const root = flags.root ? path.resolve(flags.root) : undefined;
  const opt = root ? { root } : {};

  if (!cmd || cmd === "help" || flags.help) return HELP;
  if (cmd === "version" || flags.version) return JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8")).version;

  switch (cmd) {
    case "doctor": {
      const { runDoctor } = await import("../lib/doctor.mjs");
      const r = runDoctor({ full: Boolean(flags.full) });
      process.exitCode = r.ok ? 0 : 1;
      return r.text;
    }
    case "init": {
      const { runInit } = await import("../lib/init.mjs");
      return runInit(rest[0], { ...opt, force: Boolean(flags.force) });
    }
    case "readiness": {
      const { runReadiness } = await import("../lib/readiness.mjs");
      return runReadiness(rest[0], { ...opt, json: Boolean(flags.json), write: !flags["no-write"] });
    }
    case "inventory": {
      const { runInventory } = await import("../lib/inventory.mjs");
      return runInventory(rest[0], opt);
    }
    case "poster": {
      const { runPoster } = await import("../lib/poster.mjs");
      return runPoster(rest[0], rest[1], { out: flags.out, posterOut: flags["poster-out"], noBake: Boolean(flags["no-bake"]) });
    }
    case "install": {
      const { runInstall } = await import("../lib/install.mjs");
      return runInstall({ ...opt, agent: flags.agent || "all" });
    }
    case "order": {
      const { PREREQUISITES, upstreamDownstream } = await import("../lib/prerequisites.mjs");
      if (rest[0]) return upstreamDownstream(rest[0]);
      return PREREQUISITES.map((p, i) => `${String(i + 1).padStart(2)}. ${p.label.padEnd(19)} ${(p.file || "(doctor)").padEnd(17)} ${p.guide.padEnd(17)} [${p.tier}]\n    because ${p.because}`).join("\n");
    }
    case "voice-profile": {
      const { runVoiceProfile } = await import("../lib/voice.mjs");
      return runVoiceProfile(rest, { top: flags.top ? Number(flags.top) : 15 });
    }
    case "extract-text": {
      const { runExtractText } = await import("../lib/voice.mjs");
      return runExtractText(rest[0]);
    }
    default:
      process.exitCode = 2;
      return `Unknown command "${cmd}".\n\n${HELP}`;
  }
}

main()
  .then((text) => {
    if (text) process.stdout.write(`${text}\n`);
  })
  .catch((err) => {
    process.stderr.write(`smma-videos: ${err.message}\n`);
    process.exitCode = 1;
  });
