import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// One commit message for a bug fix that made everything worse:
// a typo fix in an error message that now leaks the password instead.
const LINE = "fix: typo in error message now prints the password instead";

// The gate: entry.txt must be UTF-8 text of 1 to 100 characters,
// not only white space, and a single line.
function validate(line: string): void {
  if (line.length === 0) throw new Error("entry is empty");
  if (line.length > 100) throw new Error("entry exceeds 100 characters");
  if (line.trim().length === 0) throw new Error("entry is only whitespace");
  if (line.includes("\n")) throw new Error("entry must be a single line");
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Create the output dir when missing; never remove it or its contents.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
