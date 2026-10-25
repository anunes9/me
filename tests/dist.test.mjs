import test from 'node:test';
import assert from 'node:assert/strict';
import { readDist, readDistStyles, count } from './helpers.mjs';

test('dist is a single English page under /me/', () => {
  const html = readDist();
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<main[\s>]/);
  assert.ok(!/(href|src)="\/(?!me\/)[a-z_]/.test(html), 'root-relative URL outside /me/ found');
  assert.ok(!html.includes('fonts.googleapis.com'));
  assert.match(html, /<link rel="manifest" href="\/me\/manifest\.json"/);
});

test('layout: fonts self-hosted, theme defaults light without consulting the OS', () => {
  const html = readDist();
  assert.match(html, /data-theme="light"/);
  assert.ok(!html.includes('prefers-color-scheme'), 'theme must not consult the OS');
  assert.match(html, /try\s*\{[^}]*localStorage/s, 'storage access must be guarded');
  assert.match(html, /<a class="skip" href="#main">/);
  assert.match(html, /property="og:image" content="https:\/\/anunes9\.github\.io\/me\/og\.jpg"/);
  const css = readDistStyles();
  assert.match(css, /\.woff2/, 'self-hosted font files must be referenced');
  assert.ok(!css.includes('googleapis'));
  assert.match(css, /font-family:\s*["']?Instrument Serif/);
});
