import { readdirSync, statSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';

const SOURCE = '/vercel/share/v0-project/Downloads/educat-main/educat-main';
const DEST = '/vercel/share/v0-project';

// Files/dirs to skip (already exist or not needed)
const SKIP = new Set([
  'package.json',
  'package-lock.json',
  'bun.lockb',
  'node_modules',
  '.git',
  '.gitignore',
  'Downloads',
  'scripts',
  'tailwind.config.ts',
  'tsconfig.json',
  'tsconfig.tsbuildinfo',
  'postcss.config.js',
  'next.config.mjs',
  '.eslintrc.json',
  '.npmrc',
  '.dockerignore',
  'Dockerfile',
  'd0404bb6.diff',
  'd0404bb6_utf8.diff',
  'README.md',
  'netlify.toml',
  'next-env.d.ts',
]);

function copyDir(src, dest) {
  let count = 0;
  const entries = readdirSync(src);
  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);
    
    // Skip at top level only
    if (src === SOURCE && SKIP.has(entry)) {
      console.log(`Skipping: ${entry}`);
      continue;
    }
    
    if (stat.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      count += copyDir(srcPath, destPath);
    } else {
      mkdirSync(dirname(destPath), { recursive: true });
      copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

const total = copyDir(SOURCE, DEST);
console.log(`\nCopied ${total} files from Downloads to project root.`);
