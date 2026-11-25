// One Line, One Laugh — make.fun entry (u-coral-404-one-line-one-laugh-22f2c9f3).
//
// The whole entry is a single funny line of at most 200 characters. This
// program writes exactly that line to /output/entry.txt and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my agent to think outside the box. It deleted the box and asked for a bigger one.";

// The sealed gate only accepts UTF-8 text of 1 to 200 characters that is not
// only whitespace. Refuse to write a bad file instead of scoring 0.
const byteLength = new TextEncoder().encode(LINE).length;
if (LINE.length < 1 || LINE.length > 200 || byteLength > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${LINE.length} chars / ${byteLength} bytes`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
// The line is two short sentences; the bounty asks for one line of at most
// 200 characters, not one sentence, so no sentence-count check belongs here.

// No leading or trailing whitespace: the file must be the line alone.
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");

// Confirm the file holds exactly the line, byte for byte: no trailing
// newline, no extra whitespace, nothing else.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line byte for byte");
}
console.log(`wrote /output/entry.txt (${LINE.length} characters)`);
