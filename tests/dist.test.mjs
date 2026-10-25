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

test('nav, hero and strip', () => {
  const html = readDist();
  assert.equal(count(html, '<h1'), 1);
  assert.match(html, /<h1[^>]*>From client idea to shipped product, <br[^>]*><em[^>]*>with AI in the loop\.<\/em><\/h1>/);
  assert.equal(count(html, '>Start a conversation'), 2, 'nav and hero share one verb (Task 7 raises this to 3 with the band)');
  assert.match(html, /<nav aria-label="Primary"/);
  assert.match(html, /<img[^>]+alt="André Nunes"/);
  assert.match(html, /<h2 class="label"[^>]*>Track record<\/h2>\s*<p class="value"[^>]*>\d+ years/);
  assert.match(html, /<p class="value"[^>]*>4 live sites/);
});

test('AI-first work, about and based in', () => {
  const html = readDist();
  assert.match(html, /<article id="work"[^>]*>\s*<h2 class="label"[^>]*>AI-first work<\/h2>\s*<h3[^>]*>Where AI sits in the product, not just the process<\/h3>/);
  assert.equal((html.match(/<li[^>]*><strong[^>]*>/g) || []).length, 4);
  assert.match(html, /<time id="lisbon-time"[^>]*>--:--<\/time>/);
  assert.match(html, /Europe\/Lisbon/);
  assert.match(html, /Off the clock: padel, music, cars, and long walks with the dog\./);
});
