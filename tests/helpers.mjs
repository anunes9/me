import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

export function readDist() {
  try {
    return readFileSync(join(dist, 'index.html'), 'utf8');
  } catch (err) {
    if (err && err.code === 'ENOENT') throw new Error('dist/index.html not found: run `npm run build` first');
    throw err;
  }
}

export function readDistStyles() {
  const html = readDist();
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  const astroDir = join(dist, '_astro');
  const external = existsSync(astroDir)
    ? readdirSync(astroDir).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(astroDir, f), 'utf8'))
    : [];
  return [...inline, ...external].join('\n');
}

export function count(html, needle) {
  return html.split(needle).length - 1;
}
