import { readdir } from "node:fs/promises";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");

const blockedExtensions =
  /\.(?:bak|backup|conf|config|crt|csr|db|der|dump|env|gz|ini|key|lock|log|map|old|orig|p12|pem|pfx|rar|sql|sqlite|sqlite3|swp|tar|tgz|tmp|yaml|yml|zip)$/i;

const blockedNames = new Set([
  ".DS_Store",
  ".env",
  ".env.local",
  ".env.production",
  ".gitignore",
  ".npmrc",
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "package-lock.json",
  "package.json",
  "pnpm-lock.yaml",
  "yarn.lock",
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const findings = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(publicDir, absolutePath);

    if (entry.name.startsWith(".") || blockedNames.has(entry.name) || blockedExtensions.test(entry.name)) {
      findings.push(relativePath);
    }

    if (entry.isDirectory()) {
      findings.push(...(await walk(absolutePath)));
    }
  }

  return findings;
}

const findings = await walk(publicDir);

if (findings.length > 0) {
  console.error("Public folder security audit failed. Remove these files before building:");
  for (const finding of findings) {
    console.error(`- public/${finding}`);
  }
  process.exit(1);
}

console.log("Public folder security audit passed.");
