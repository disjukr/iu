import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { colors, typography, root } from '../dist/index.js';
import openColor from 'open-color' with { type: 'json' };
import { renderToString } from '@solidjs/web';
import { createComponent } from 'solid-js';
import { Button, ButtonGroup, CodeBlock, Tooltip, CopyButton } from '../dist/index.js';
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
    variant: 'primary', padding: 'custom', class: { custom: true }, color: 'var(--brand)', style: 'padding-left:19px',
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
  assert.doesNotMatch(html, /\s(?:variant|padding|color)=/);
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

test('CodeBlock renders escaped highlighted code and native pre attributes on the server', () => {
  const html = renderToString(() => createComponent(CodeBlock, {
    code: '<script>alert("<&")</script>\n  const value = 1;\n', language: 'tsx', theme: 'dark',
    id: 'source', 'aria-label': 'Source code', tabindex: -1, class: { custom: true }, style: 'max-width:240px',
  }));
  assert.match(html, /<pre/);
  assert.match(html, /<code/);
  assert.match(html, /custom/);
  assert.match(html, /tabindex="-1"/);
  assert.match(html, /aria-label="Source code"/);
  assert.match(html, /max-width:240px/);
  assert.match(html, /light-dark/);
  assert.doesNotMatch(html, /<script[ >]/);
  assert.doesNotMatch(html, /\s(?:language|theme|code)=/);
  for (const language of ['text', 'tsx', 'javascript', 'typescript', 'json', 'css', 'html', 'shellscript']) {
    assert.doesNotThrow(() => renderToString(() => createComponent(CodeBlock, { code: '', language })));
  }
});

test('Tooltip has an SSR-stable description relationship and escaped content', () => {
  const html = renderToString(() => createComponent(Tooltip, {
    content: '<Save changes>', describedBy: 'existing', color: 'var(--brand)', style: 'letter-spacing:0px',
    children: trigger => createComponent(Button, { ...trigger, children: 'Save' }),
  }));
  assert.match(html, /role="tooltip"/);
  assert.match(html, /popover="manual"/);
  assert.match(html, /&lt;Save changes(?:>|&gt;)/);
  const id = html.match(/id="(iu-tooltip-[^"]+)"/)[1];
  assert.ok(html.includes(`aria-describedby="existing ${id}"`));
  assert.match(html, /var\(--brand\)/);
  assert.match(html, /letter-spacing:0px/);
  assert.doesNotMatch(html, /\s(?:delay|placement|content|color)=/);
});

test('CopyButton renders safely on the server and forwards Button props', () => {
  const html = renderToString(() => createComponent(CopyButton, {
    text: () => { throw new Error('Do not resolve during SSR'); }, padding: 'fit', variant: 'primary',
    'aria-label': 'Copy snippet', disabled: true, class: 'copy-test',
  }));
  assert.match(html, /type="button"/);
  assert.match(html, /aria-label="Copy snippet"/);
  assert.match(html, /disabled/);
  assert.match(html, /copy-test/);
  assert.match(html, /<svg/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /role="status"/);
  assert.doesNotMatch(html, /secret/);
  assert.doesNotMatch(html, /\s(?:text|padding|variant|resetAfter|messages)=/);
});
