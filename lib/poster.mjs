import { spawnSync } from "node:child_process";
import { existsSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { probe } from "./inventory.mjs";

function ff(args) {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { encoding: "utf8", shell: process.platform === "win32" });
  if (r.error) throw new Error(`ffmpeg not found on PATH (${r.error.message}). Run: npx smma-videos doctor`);
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${(r.stderr || "").trim()}`);
}

function videoStats(file) {
  const info = probe(file);
  const v = info?.streams?.find((s) => s.codec_type === "video");
  const frames = Number(v?.nb_frames || 0) || null;
  return { duration: Number(info?.format?.duration || 0), frames, fps: v?.r_frame_rate || "", hasAudio: Boolean(info?.streams?.find((s) => s.codec_type === "audio")) };
}

/** Extract the frame at `seconds` to a JPEG next to the video (or `out`). */
export function extractPoster(video, seconds, out) {
  const poster = out || path.join(path.dirname(video), `${path.basename(video, path.extname(video))}.jpg`);
  ff(["-ss", String(seconds), "-i", video, "-frames:v", "1", "-q:v", "2", poster]);
  return poster;
}

/** Replace frame 0 of `video` with `poster` (same size), keeping duration, frame count and audio. */
export function bakePoster(video, poster, { out } = {}) {
  const before = videoStats(video);
  const tmp = path.join(path.dirname(video), `.${path.basename(video)}.poster-tmp.mp4`);
  const args = ["-i", video, "-i", poster, "-filter_complex", "[1:v][0:v]scale2ref[p][v];[v][p]overlay=0:0:enable='eq(n,0)':format=auto,format=yuv420p[o]", "-map", "[o]"];
  if (before.hasAudio) args.push("-map", "0:a", "-c:a", "copy");
  args.push("-c:v", "libx264", "-preset", "medium", "-crf", "18", "-movflags", "+faststart", tmp);
  ff(args);
  const target = out || video;
  if (existsSync(target) && target !== tmp) unlinkSync(target);
  renameSync(tmp, target);
  const after = videoStats(target);
  return { target, before, after };
}

export function runPoster(video, seconds, { out, posterOut, noBake = false, sidecar = true } = {}) {
  if (!video || !existsSync(video)) throw new Error(`Video not found: ${video}`);
  const t = Number(seconds);
  if (!Number.isFinite(t) || t < 0) throw new Error(`Give the poster moment in seconds, e.g. 7.5 (got "${seconds}")`);
  const stats = videoStats(video);
  if (stats.duration && t >= stats.duration) throw new Error(`${t}s is past the end of the video (${stats.duration.toFixed(2)}s)`);
  const poster = extractPoster(video, t, posterOut);
  const lines = [`Poster: ${poster} (frame at ${t}s)`];
  if (!noBake) {
    const { target, before, after } = bakePoster(video, poster, { out });
    const same = Math.abs(before.duration - after.duration) < 0.05 && (!before.frames || !after.frames || before.frames === after.frames);
    lines.push(`Baked as frame 0 of ${target} (duration ${before.duration.toFixed(2)}s -> ${after.duration.toFixed(2)}s${before.frames ? `, frames ${before.frames} -> ${after.frames}` : ""})${same ? "" : "  WARNING: duration or frame count changed"}`);
    if (sidecar) {
      const note = path.join(path.dirname(target), "poster.txt");
      writeFileSync(note, `poster_time_s=${t}\nposter=${path.basename(poster)}\nvideo=${path.basename(target)}\n`);
    }
  }
  return lines.join("\n");
}
