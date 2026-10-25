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
