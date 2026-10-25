import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('npm run check type-checks before building', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(pkg.scripts.check, /^astro check && /);
  assert.ok(pkg.devDependencies['@astrojs/check']);
  assert.ok(pkg.devDependencies.typescript);
});
