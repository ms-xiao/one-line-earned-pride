// one-line-earned-pride: writes a single line of earned pride to /output/entry.txt.
// Node standard library only; no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "The apprentice welder ran the bead steady all the way down the seam, lifted her visor, and for the first time didn't look away from her own work.";

const OUTPUT = "/output/entry.txt";

// The gate counts characters, not bytes or UTF-16 units: spreading the string
// counts one code point per character, so an astral-plane character counts once.
// A trailing newline is stripped before the count so the file on disk and the
// written output measure exactly the same line.
const text = LINE.replace(/\n$/, "");

function main(): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`entry must be 1-240 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, text, "utf8");
}

main();
