import test from 'node:test';
import assert from 'node:assert/strict';
import { readDist, readDistStyles, count } from './helpers.mjs';

test('heading outline is h1 > h2 labels > h3 titles, one main, nav links are anchors', () => {
  const html = readDist();
  const order = [...html.matchAll(/<h([1-3])/g)].map(m => Number(m[1]));
  assert.equal(order[0], 1);
  for (let i = 1; i < order.length; i++) assert.ok(order[i] - order[i - 1] <= 1, `heading jump at index ${i}`);
  assert.equal(count(html, '<main'), 1);
  assert.ok(!/<li>Work<\/li>/.test(html));
  assert.match(readDistStyles(), /overflow-wrap:\s*anywhere/, 'long emails and handles must wrap on phones');
});

test('print stylesheet hides chrome and reveals plain addresses', () => {
  const css = readDistStyles();
  const print = css.slice(css.indexOf('@media print'));
  assert.ok(print.length > 0, 'print block present');
  assert.match(print, /\.print-only\s*\{\s*display:\s*inline/);
  assert.match(print, /nav[\s\S]*display:\s*none/);
});
