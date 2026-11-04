import { execFileSync } from 'node:child_process';
import { mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { preview } from 'vite';
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
  run(process.execPath, ['node_modules/vite/bin/vite.js', 'build']);
  const server = await preview({ configFile: false, root: dir, preview: { host: '127.0.0.1', port: 0 } });
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(server.resolvedUrls.local[0]);
    await page.locator('#text').waitFor();
    const style = await page.locator('#text').evaluate(el => {
      const s = getComputedStyle(el);
      return [s.boxSizing, s.marginTop, s.paddingTop, s.fontSize, s.fontStyle, s.textTransform, s.color, s.fontFamily];
    });
    const { default: assert } = await import('node:assert/strict');
    assert.deepEqual(style.slice(0, 7), ['border-box', '0px', '0px', '14px', 'normal', 'none', 'rgb(33, 37, 41)']);
    assert.match(style[7], /Inter Variable.*Noto Sans Variable/);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#focus').evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
    assert.deepEqual(errors, []);
    console.log('Packed consumer: Solid rc.20 + Vite 8 build, browser, reset resistance and focus passed.');
  } finally { await browser?.close(); await new Promise(resolve => server.httpServer.close(resolve)); }
} finally { rmSync(dir, { recursive: true, force: true }); }
