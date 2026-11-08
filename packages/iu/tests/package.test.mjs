import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { colors, typography, root } from '../dist/index.js';
import openColor from 'open-color' with { type: 'json' };
import { renderToString } from '@solidjs/web';
import { createComponent } from 'solid-js';
import { Button, ButtonGroup } from '../dist/index.js';
test('palette is exactly Open Color; fonts remain app-owned', () => {
  assert.deepEqual(colors, openColor);
  assert.equal(typography.fontFamily, '"Inter Variable", "Noto Sans KR", "Noto Sans", sans-serif');
  const css = readFileSync('dist/styles.css', 'utf8');
  assert.ok(root.length);
  assert.ok(!css.includes('@font-face'));
  assert.ok(!css.includes(':root'));
});
test('public package has only ESM and CSS exports', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.equal(pkg.type, 'module');
  assert.equal(pkg.exports['.'].require, undefined);
  assert.deepEqual(pkg.sideEffects, ['**/*.css']);
});

test('Button renders on the server with native attributes and escaped children', () => {
  const html = renderToString(() => createComponent(Button, {
    children: '<Save>', disabled: true, name: 'action', value: 'save',
    variant: 'primary', size: 'custom', class: { custom: true }, color: 'var(--brand)', style: 'padding-left:19px',
  }));
  assert.match(html, /<button/);
  assert.match(html, /type="button"/);
  assert.match(html, /disabled/);
  assert.match(html, /name="action"/);
  assert.match(html, /value="save"/);
  assert.match(html, /custom/);
  assert.match(html, /var\(--brand\)/);
  assert.match(html, /padding-left:19px/);
  assert.match(html, /&lt;Save(?:>|&gt;)/);
  assert.doesNotMatch(html, /\s(?:variant|size|color)=/);
});

test('ButtonGroup renders labeled native groups without leaking layout props', () => {
  const html = renderToString(() => createComponent(ButtonGroup, {
    'aria-label': 'History', orientation: 'vertical', dir: 'rtl', class: { custom: true },
    children: createComponent(Button, { children: 'Undo' }),
  }));
  assert.match(html, /role="group"/);
  assert.match(html, /aria-label="History"/);
  assert.match(html, /dir="rtl"/);
  assert.match(html, /custom/);
  assert.match(html, /<button/);
  assert.doesNotMatch(html, / orientation=/);
});
