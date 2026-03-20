import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const skippedDirs = new Set(['node_modules', '.git', '.next', 'dist', 'out', 'coverage']);
const patterns = [
  /sk-proj-[A-Za-z0-9_-]{20,}/g,
  /sk-[A-Za-z0-9_-]{20,}/g,
  /OPENAI_API_KEY\s*[:=]/g,
  /openai_api_key\s*[:=]/gi,
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (skippedDirs.has(entry.name)) continue;
      await walk(join(dir, entry.name));
      continue;
    }

    const filePath = join(dir, entry.name);
    if (!/\.(js|jsx|ts|tsx|mjs|json|md|css|txt|yml|yaml|env|gitignore)$/i.test(entry.name)) continue;

    let content;
    try {
      content = await readFile(filePath, 'utf8');
    } catch {
      continue;
    }

    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      if (pattern.test(content)) {
        console.error(`Potential secret pattern found in ${relative(root, filePath)}`);
        process.exitCode = 1;
        return;
      }
    }
  }
}

await walk(root);
if (!process.exitCode) {
  console.log('No obvious secret patterns found.');
}
