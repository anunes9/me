import test from 'node:test';
import assert from 'node:assert/strict';
import { joinBase } from '../src/lib/url.ts';

test('joinBase normalises slashes', () => {
  assert.equal(joinBase('/me/', 'og.jpg'), '/me/og.jpg');
  assert.equal(joinBase('/me', '/og.jpg'), '/me/og.jpg');
  assert.equal(joinBase('/', 'x'), '/x');
  assert.equal(joinBase('/me', ''), '/me/');
});
