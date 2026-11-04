import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { colors, typography, foundation } from '../dist/index.js';
import openColor from 'open-color' with { type: 'json' };
test('palette is exactly Open Color; fonts remain app-owned', () => {
  assert.deepEqual(colors, openColor);
  assert.equal(typography.fontFamily, '"Inter Variable", "Noto Sans Variable", sans-serif');
  const css = readFileSync('dist/styles.css', 'utf8');
  assert.ok(foundation.length);
  assert.ok(!css.includes('@font-face'));
  assert.ok(!css.includes(':root'));
});
test('public package has only ESM and CSS exports', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.equal(pkg.type, 'module');
  assert.equal(pkg.exports['.'].require, undefined);
  assert.deepEqual(pkg.sideEffects, ['**/*.css']);
});
