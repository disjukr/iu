import { execFileSync } from 'node:child_process';
import { mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { chromium, expect } from '@playwright/test';
import { preview } from 'vite';
import { vars } from '../dist/index.js';
const root = process.cwd();
const dir = mkdtempSync(join(tmpdir(), 'iu-consumer-'));
// Windows cannot exec npm.cmd directly. Invoke the npm CLI through Node.
const npm = process.platform === 'win32'
  ? [process.execPath, [join(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js')]]
  : ['npm', []];
const runNpm = (args, cwd = dir, options = {}) => execFileSync(npm[0], [...npm[1], ...args], { cwd, stdio: 'inherit', ...options });
const run = (cmd, args, cwd = dir) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });
try {
  const [pack] = JSON.parse(runNpm(['pack', '--json', '--pack-destination', dir], root, { stdio: 'pipe', encoding: 'utf8' }));
  cpSync(resolve('tests/consumer'), dir, { recursive: true });
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ private: true, type: 'module', dependencies: {
    iu: `file:./${pack.filename}`, 'solid-js': '2.0.0-rc.20', '@solidjs/web': '2.0.0-rc.20',
    '@solidjs/vite-plugin': '3.0.0-next.54', vite: '8.3.5', typescript: '5.9.3'
  }}));
  runNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund']);
  run(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit']);
  run(process.execPath, ['render-hydration.mjs']);
  run(process.execPath, ['node_modules/vite/bin/vite.js', 'build']);
  const server = await preview({ configFile: false, root: dir, preview: { host: '127.0.0.1', port: 0 } });
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => { errors.push(error.message); console.error(error.message); });
    await page.goto(server.resolvedUrls.local[0]);
    await page.locator('#text').waitFor();
    const style = await page.locator('#text').evaluate(el => {
      const s = getComputedStyle(el);
      return [s.boxSizing, s.marginTop, s.paddingTop, s.fontSize, s.fontStyle, s.textTransform, s.color, s.fontFamily];
    });
    const { default: assert } = await import('node:assert/strict');
    assert.deepEqual(style.slice(0, 7), ['border-box', '0px', '0px', '16px', 'normal', 'none', 'rgb(33, 37, 41)']);
    assert.match(style[7], /Inter Variable.*Noto Sans Variable/);
    assert.equal(await page.locator('#app-style').evaluate(el => getComputedStyle(el).marginTop), '31px');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#focus').evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
    const computed = async (id, pseudo = null) => page.locator(`#${id}`).evaluate((el, pseudo) => {
      const s = getComputedStyle(el, pseudo);
      return { box: s.boxSizing, margin: s.marginTop, font: s.fontSize, color: s.color, background: s.backgroundColor, scheme: s.colorScheme };
    }, pseudo);
    assert.equal((await computed('scoped')).margin, '0px');
    assert.equal((await computed('scoped')).font, '24px');
    assert.equal((await computed('scoped-input')).font, '24px');
    assert.equal((await computed('scoped-input')).color, 'rgb(0, 128, 0)');
    assert.equal((await computed('scope')).background, 'rgba(0, 0, 0, 0)');
    assert.equal((await computed('scope')).scheme, 'dark');
    assert.equal((await computed('excluded')).scheme, 'normal');
    assert.equal((await computed('reentered')).scheme, 'light');
    assert.equal((await computed('excluded')).font, '16px');
    assert.equal((await computed('native')).font, (await computed('outside')).font);
    assert.notEqual((await computed('native')).margin, '0px');
    assert.equal((await computed('native')).color, (await computed('outside')).color);
    assert.equal((await computed('nested')).font, '16px');
    assert.equal((await computed('nested')).color, 'rgb(33, 37, 41)');
    assert.equal((await computed('nested')).margin, '0px');
    assert.equal((await computed('native-again')).font, (await computed('outside')).font);
    assert.notEqual((await computed('native-again')).margin, '0px');
    assert.equal((await computed('scoped', '::before')).box, 'border-box');
    assert.equal((await computed('native', '::before')).box, 'content-box');
    assert.equal((await computed('nested', '::before')).box, 'border-box');
    const customProperties = await page.locator('#excluded').evaluate((el, variable) => {
      const s = getComputedStyle(el);
      return [s.getPropertyValue(variable).trim(), s.getPropertyValue('--app-token').trim()];
    }, vars.color.text.slice(4, -1));
    assert.deepEqual(customProperties, ['', 'preserved']);
    const button = page.locator('#reactive-button');
    await expect(button).toHaveAttribute('data-ref', 'ready');
    await expect(button).toHaveCSS('padding-left', '23px');
    const fitHeight = await button.evaluate(el => el.getBoundingClientRect().height);
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveText('Active');
    await expect(button).toHaveClass(/custom/);
    assert.ok(await button.evaluate(el => el.getBoundingClientRect().height) > fitHeight);
    await page.keyboard.press('Space');
    await expect(button).toHaveText('Inactive');
    await expect(button).not.toHaveClass(/custom/);
    await expect(page.locator('#disabled-button')).toBeDisabled();
    await page.locator('#disabled-button').evaluate(el => el.click());
    await expect(button).toHaveText('Inactive');
    await page.locator('#toggle-disabled').click();
    await expect(page.locator('#disabled-button')).toBeEnabled();
    await page.locator('#disabled-button').click();
    await expect(button).toHaveText('Active');
    await page.locator('#default-action').click();
    await expect(page.locator('#submits')).toHaveText('0');
    await page.locator('#submit-action').click();
    await expect(page.locator('#submits')).toHaveText('1');
    assert.equal(await page.locator('#submit-action').getAttribute('name'), 'action');
    assert.equal(await button.getAttribute('variant'), null);
    assert.equal(await button.getAttribute('size'), null);
    const measureButtons = () => page.locator('#button-sizing button').evaluateAll(buttons => buttons.map(button => {
      const s = getComputedStyle(button);
      return [s.fontSize, s.minHeight, s.paddingLeft, s.borderRadius].map(parseFloat);
    }));
    const original = await measureButtons();
    assert.deepEqual(original.map(values => values[0]), [16, 16, 16]);
    assert.deepEqual(original.map(values => values[1]), [24, 40, 64]);
    await page.locator('#button-sizing').evaluate(el => { el.style.fontSize = '32px'; });
    const scaled = await measureButtons();
    assert.deepEqual(scaled, original.map(values => values.map(value => value * 2)));
    for (const fontSize of [12, 16, 24, 32]) {
      await page.locator('#inline-buttons').evaluate((el, size) => { el.style.fontSize = `${size}px`; }, fontSize);
      const reference = await page.locator('#inline-reference').evaluate(el => el.getBoundingClientRect().height);
      assert.equal(reference, fontSize * 1.5);
      const lines = await page.locator('.inline-sample').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().height));
      for (const height of lines) assert.ok(Math.abs(height - reference) <= 0.1, `Inline button increased line height at ${fontSize}px: ${height} vs ${reference}`);
      for (const height of await page.locator('.inline-sample button').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().height))) {
        assert.ok(height <= reference, `Fit button exceeded line height at ${fontSize}px`);
      }
    }
    const customButton = page.locator('#custom-color');
    const originalBackground = await customButton.evaluate(el => getComputedStyle(el).backgroundImage);
    const originalSecondary = await page.locator('#custom-object').evaluate(el => getComputedStyle(el).backgroundColor);
    await page.locator('#set-color').click();
    await expect.poll(() => customButton.evaluate(el => getComputedStyle(el).backgroundImage)).not.toBe(originalBackground);
    await expect(customButton).toHaveCSS('padding-left', '19px');
    await expect(page.locator('#custom-object')).toHaveCSS('padding-right', '21px');
    await expect.poll(() => page.locator('#custom-object').evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(originalSecondary);
    assert.equal(await customButton.getAttribute('color'), null);
    const variableButton = page.locator('#custom-variable');
    const variableBackground = await variableButton.evaluate(el => getComputedStyle(el).backgroundImage);
    await page.locator('#custom-buttons').evaluate(el => el.style.setProperty('--brand', 'rebeccapurple'));
    await expect.poll(() => variableButton.evaluate(el => getComputedStyle(el).backgroundImage)).not.toBe(variableBackground);
    await page.locator('#clear-color').click();
    await expect.poll(() => customButton.evaluate(el => getComputedStyle(el).backgroundImage)).toBe(originalBackground);
    await expect.poll(() => page.locator('#custom-object').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(originalSecondary);
    await expect(customButton).toHaveCSS('padding-left', '19px');
    await page.goto(new URL('hydration.html', server.resolvedUrls.local[0]).href);
    assert.deepEqual(errors, []);
    await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true');
    await page.locator('#hydrated').click();
    await expect(page.locator('#hydrated')).toHaveText('Hydrate 1');
    assert.equal(await page.locator('#hydrated').evaluate(el => el === window.serverButton), true);
    assert.deepEqual(errors, []);
    console.log('Packed consumer: root boundaries, Button props, keyboard, forms, SSR and hydration passed.');
  } finally { await browser?.close(); await new Promise(resolve => server.httpServer.close(resolve)); }
} finally { rmSync(dir, { recursive: true, force: true }); }
