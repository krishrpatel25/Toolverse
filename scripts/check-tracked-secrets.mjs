import { execSync } from "node:child_process";

const out = execSync("git ls-files", { encoding: "utf8" }).trim();
const files = out ? out.split("\n") : [];
const forbidden = files.filter((f) => /(^|\/)next-env\.mjs$/i.test(f));

if (forbidden.length) {
  console.error(
    "\nRefusing to continue: next-env.mjs must not be in git (it can contain API keys).\n\nTracked files:\n",
    forbidden.map((f) => `  - ${f}`).join("\n"),
    "\n\nRemove from the index (keep file on disk):\n  git rm --cached -- path/to/next-env.mjs\n"
  );
  process.exit(1);
}
