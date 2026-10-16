/**
 * Voice profile helpers, ported from the my-voice skill (clintonherring/skills, job-post-resume-writer).
 *
 *   extractText(source)   plain text of a sample: .txt / .md / .html / http(s) URL / .docx; .pdf via pdftotext if present
 *   profile(texts, top)   a statistical read of the samples to confirm what the agent read; advisory, nothing written
 *
 * Stdlib Node only. The profile is for the agent's eyes; voice.md is written from the samples themselves.
 */
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { inflateRawSync } from "node:zlib";
import path from "node:path";

const FIRST_PERSON = /\b(I|I'm|I've|I'd|my|me|we|we're|our|us)\b/;
const HEDGES = ["maybe", "perhaps", "i think", "i guess", "sort of", "kind of", "a bit", "somewhat", "probably", "possibly", "i believe", "i feel", "to be honest", "arguably", "about ", "roughly", "around ", "up to", "depending on"];
const INTENSIFIERS = ["very", "really", "extremely", "incredibly", "highly", "truly", "hugely", "massively", "super", "absolutely"];
/** Words that sound like a copywriter. If the person uses one themselves it comes off their avoid list. */
export const MARKETING_SPEAK = ["leverage", "seamless", "game-changer", "game changer", "cutting-edge", "best-in-class", "world-class", "passionate", "premium", "solutions", "empower", "unlock", "elevate", "hassle-free", "next-level", "revolutionary", "innovative", "state-of-the-art", "effortless", "simply", "powerful", "trusted", "exciting", "thrilled", "journey", "transform", "streamline", "optimise", "optimize", "synergy", "bespoke", "tailored", "unparalleled", "ultimate", "experience the"];
const COMMON_VERBS = new Set(`am is are was were be been being have has had do does did make made build built run ran lead led manage managed
own owned write wrote fix fixed set up took take taken moved move cut keep kept chase chased train trained
work worked help helped put ask asked tell told talk talked start started stop stopped use used try tried
plan planned decide decided learn learned learnt report reported design designed test tested deliver delivered
replace replaced change changed create created introduce introduced support supported review reviewed check checked
track tracked measure measured solve solved want wanted need needed think thought know knew see saw get got go went
come came find found show showed sell sold book booked order ordered bake baked cook cooked repair repaired serve served
teach taught open opened close closed call called send sent pay paid charge charged`.split(/\s+/));
const STOP = new Set(`the a an and or but if so to of in on at for with from by as is are was were be been it its this that these those
i my me we our you your they them their he she his her not no yes do does did have has had will would can could
should may might must also just very really then than there here when where what which who how all any some`.split(/\s+/));

// ---------- extraction ----------

function fromHtml(raw) {
  let t = raw.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, "");
  t = t.replace(/<\/(p|div|li|h[1-6]|br|tr|section|article|blockquote)>/gi, "\n").replace(/<br\s*\/?>/gi, "\n");
  t = t.replace(/<[^>]+>/g, "");
  const named = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", euro: "€", pound: "£", yen: "¥", copy: "©", reg: "®", trade: "™", hellip: "…", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", deg: "°", times: "×", eacute: "é", egrave: "è", uuml: "ü", ouml: "ö", auml: "ä", szlig: "ß", ccedil: "ç", ntilde: "ñ" };
  t = t.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&([a-z]+);/gi, (m, name) => named[name.toLowerCase()] ?? m);
  return t.split(/\r?\n/).map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}

/** Minimal zip reader: returns the inflated bytes of one entry, or null. Enough for word/document.xml. */
function zipEntry(buf, name) {
  const want = Buffer.from(name, "utf8");
  let i = 0;
  while ((i = buf.indexOf(Buffer.from([0x50, 0x4b, 0x03, 0x04]), i)) !== -1) {
    const method = buf.readUInt16LE(i + 8);
    const csize = buf.readUInt32LE(i + 18);
    const nlen = buf.readUInt16LE(i + 26);
    const xlen = buf.readUInt16LE(i + 28);
    const fname = buf.subarray(i + 30, i + 30 + nlen);
    const start = i + 30 + nlen + xlen;
    if (fname.equals(want)) {
      const data = buf.subarray(start, start + csize);
      return method === 8 ? inflateRawSync(data) : method === 0 ? Buffer.from(data) : null;
    }
    i = start + csize;
  }
  return null;
}

function fromDocx(file) {
  const xml = zipEntry(readFileSync(file), "word/document.xml");
  if (!xml) throw new Error("no word/document.xml in this .docx");
  const paras = xml.toString("utf8").split(/<\/w:p>/).map((p) => (p.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || []).map((t) => t.replace(/<[^>]+>/g, "")).join(""));
  return fromHtml(paras.filter((p) => p.trim()).join("\n")).replace(/\n{3,}/g, "\n\n");
}

function fromPdf(file) {
  const r = spawnSync("pdftotext", ["-layout", file, "-"], { encoding: "utf8", shell: process.platform === "win32" });
  if (r.error || r.status !== 0) {
    const e = new Error("pdf: pdftotext is not installed or the PDF has no text layer; ask for the text to be pasted");
    e.code = 3;
    throw e;
  }
  return r.stdout;
}

export async function extractText(source) {
  if (/^https?:\/\//i.test(source)) {
    const res = await fetch(source, { headers: { "user-agent": "Mozilla/5.0 (smma-videos extract-text)" }, redirect: "follow" });
    if (!res.ok) throw new Error(`${source}: HTTP ${res.status}`);
    const body = await res.text();
    const ct = res.headers.get("content-type") || "";
    return /html/i.test(ct) || /^\s*</.test(body) ? fromHtml(body) : body;
  }
  if (!existsSync(source)) throw new Error(`not found: ${source}`);
  const ext = path.extname(source).toLowerCase();
  if (ext === ".docx") return fromDocx(source);
  if (ext === ".pdf") return fromPdf(source);
  if (ext === ".html" || ext === ".htm") return fromHtml(readFileSync(source, "utf8"));
  return readFileSync(source, "utf8");
}

// ---------- profile ----------

export function sentences(text) {
  let t = text.replace(/<!--[\s\S]*?-->/g, "");
  t = t.replace(/^#+\s.*$/gm, "");
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  t = t.replace(/[*_`]+/g, "");
  t = t.replace(/^\s*[-•]\s+/gm, "");
  return t.split(/(?<=[.!?])\s+|\n{2,}|\n(?=[A-Z])/).map((p) => p.trim()).filter((p) => p.split(/\s+/).length >= 3);
}

const words = (s) => (s.toLowerCase().match(/[a-z][a-z'’-]*/g) || []);

function verbs(sents) {
  const c = new Map();
  const add = (w) => c.set(w, (c.get(w) || 0) + 1);
  for (const s of sents) {
    const w = words(s);
    w.forEach((tok, i) => {
      if ((tok === "i" || tok === "we") && i + 1 < w.length) {
        let nxt = w[i + 1];
        if (["have", "had", "am", "was", "were", "also", "then"].includes(nxt) && i + 2 < w.length) nxt = w[i + 2];
        if (!STOP.has(nxt)) add(nxt);
      } else if (COMMON_VERBS.has(tok) && !["am", "is", "are", "was", "were", "be", "been", "being"].includes(tok)) add(tok);
    });
  }
  return c;
}

function ngrams(sents, n) {
  const c = new Map();
  for (const s of sents) {
    const w = words(s);
    for (let i = 0; i + n <= w.length; i++) {
      const g = w.slice(i, i + n);
      if (STOP.has(g[0]) && STOP.has(g[g.length - 1])) continue;
      if (g.every((t) => STOP.has(t))) continue;
      const k = g.join(" ");
      c.set(k, (c.get(k) || 0) + 1);
    }
  }
  return c;
}

const top = (map, n, min = 1) => [...map.entries()].filter(([, v]) => v >= min).sort((a, b) => b[1] - a[1]).slice(0, n);
const pct = (x) => `${Math.round(x * 100)}%`;
const count = (hay, needle) => hay.split(needle).length - 1;

export function profile(texts, topN = 15) {
  const sents = texts.flatMap(sentences);
  if (!sents.length) throw new Error("No sentences found. Are these plain-text samples? Run extract-text on documents first.");
  const lens = sents.map((s) => words(s).length).sort((a, b) => a - b);
  const total = lens.reduce((a, b) => a + b, 0);
  const avg = total / lens.length;
  const median = lens[Math.floor(lens.length / 2)];
  const short = lens.filter((n) => n <= 12).length / lens.length;
  const long = lens.filter((n) => n > 25).length / lens.length;
  const fp = sents.filter((s) => FIRST_PERSON.test(s)).length / sents.length;
  const numbered = sents.filter((s) => /\d/.test(s)).length / sents.length;
  const lower = sents.join(" ").toLowerCase();
  const out = [];
  out.push(`Samples: ${texts.length} file(s), ${sents.length} sentences, ${total} words`);
  out.push("");
  out.push(`Sentence length: average ${avg.toFixed(1)} words, median ${median}; ${pct(short)} short (≤12), ${pct(long)} long (>25)`);
  out.push(`First person: ${pct(fp)} of sentences use I / my / we / our` + (fp >= 0.4 ? "  → they speak as a person; write lines in first person" : "  → they write more impersonally; check whether that is them or the sample type"));
  out.push(`Numbers: ${pct(numbered)} of sentences carry a number`);
  out.push("");
  out.push(`Verbs they reach for (${topN}): ` + top(verbs(sents), topN).map(([w, n]) => `${w} (${n})`).join(", "));
  for (const [n, label] of [[3, "three-word"], [2, "two-word"]]) {
    const rec = top(ngrams(sents, n), topN, 2);
    out.push("");
    out.push(`Recurring ${label} phrases: ` + (rec.length ? rec.map(([g, c]) => `"${g}" (${c})`).join(", ") : "none repeated"));
  }
  const hedges = HEDGES.map((h) => [h.trim(), count(lower, h)]).filter(([, n]) => n);
  const intens = INTENSIFIERS.map((h) => [h, (lower.match(new RegExp(`\\b${h}\\b`, "g")) || []).length]).filter(([, n]) => n);
  out.push("");
  out.push("Hedging and conditions: " + (hedges.length ? hedges.map(([h, n]) => `${h} (${n})`).join(", ") : "none"));
  out.push("Intensifiers: " + (intens.length ? intens.map(([h, n]) => `${h} (${n})`).join(", ") : "none"));
  const ms = MARKETING_SPEAK.map((w) => [w, (lower.match(new RegExp(`(?<![a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![a-z])`, "g")) || []).length]).filter(([, n]) => n);
  out.push("Marketing-speak they actually use: " + (ms.length ? ms.map(([w, n]) => `${w} (${n})`).join(", ") : "none — keep the full avoid list"));
  const excl = count(lower, "!");
  out.push(`Exclamation marks: ${excl}` + (excl === 0 ? "  → avoid them" : ""));
  const byLen = [...sents].sort((a, b) => words(a).length - words(b).length);
  const longest = byLen[byLen.length - 1];
  out.push("");
  out.push(`Shortest sentence: "${byLen[0]}"`);
  out.push(`Longest sentence:  "${longest.slice(0, 160)}${longest.length > 160 ? "…" : ""}"`);
  out.push("");
  out.push("Use this to confirm what you read in the samples; write voice.md from the samples themselves.");
  return out.join("\n");
}

export async function runVoiceProfile(sources, { top: topN = 15 } = {}) {
  if (!sources.length) throw new Error("Usage: smma-videos voice-profile <sample> [<sample> …] [--top N]");
  const texts = [];
  for (const s of sources) texts.push(await extractText(s));
  return profile(texts, topN);
}

export async function runExtractText(source) {
  if (!source) throw new Error("Usage: smma-videos extract-text <file-or-url>");
  return extractText(source);
}
