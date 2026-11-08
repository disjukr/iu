import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';
import labConfig from '../vite.config.mjs';

test('iu source changes and syntax errors recover without restarting the lab', { timeout: 60000 }, async () => {
  const workspace = fileURLToPath(new URL('../../..', import.meta.url));
  const iu = join(workspace, 'packages/iu');
  const lab = fileURLToPath(new URL('..', import.meta.url));
  const scratch = mkdtempSync(join(tmpdir(), 'iu-lab-dev-'));
  let server;
  let browser;
  try {
    // Keep both app and library inside Vite's root: vanilla-extract evaluates
    // these modules through vite-node, which must resolve the same root paths.
    cpSync(join(lab, 'src'), join(scratch, 'src'), { recursive: true });
    cpSync(join(lab, 'index.html'), join(scratch, 'index.html'));
    cpSync(join(iu, 'src'), join(scratch, 'iu/src'), { recursive: true });
    symlinkSync(join(lab, 'node_modules'), join(scratch, 'node_modules'), 'junction');
    symlinkSync(join(iu, 'node_modules'), join(scratch, 'iu/node_modules'), 'junction');
    writeFileSync(join(scratch, 'package.json'), '{"name":"iu-lab-test","type":"module"}');
    const config = labConfig({ command: 'serve', mode: 'development' });
    config.resolve.alias = config.resolve.alias.map(alias => ({
      ...alias,
      replacement: join(scratch, 'iu/src', alias.find.test('iu') ? 'index.ts' : 'root.css.ts'),
    }));
    server = await createServer({
      ...config, configFile: false, root: scratch,
      logLevel: 'silent',
      server: { port: 0, host: '127.0.0.1', fs: { allow: [workspace, scratch] } },
    });
    await server.listen();
    browser = await chromium.launch();
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(server.resolvedUrls.local[0]);
    const button = page.getByRole('button', { name: 'Primary', exact: true });
    await expect(button).toBeVisible();
    await expect(button).toHaveCSS('border-radius', '8px');

    const componentPath = join(scratch, 'iu/src/Button.tsx');
    const component = readFileSync(componentPath, 'utf8');
    const changedComponent = component.replace('type={props.type', 'data-dev-revision="updated"\n    type={props.type');
    writeFileSync(componentPath, changedComponent);
    await expect(button).toHaveAttribute('data-dev-revision', 'updated');

    const stylePath = join(scratch, 'iu/src/button.css.ts');
    writeFileSync(stylePath, readFileSync(stylePath, 'utf8').replace("borderRadius: '0.5em'", "borderRadius: '1em'"));
    await expect(button).toHaveCSS('border-radius', '16px');

    const tokenPath = join(scratch, 'iu/src/tokens.ts');
    writeFileSync(tokenPath, readFileSync(tokenPath, 'utf8').replace("fontSize: '16px'", "fontSize: '20px'"));
    await expect(button).toHaveCSS('font-size', '20px');
    await expect(button).toHaveCSS('border-radius', '20px');
    assert.deepEqual(errors, []);

    // A broken edit should show an overlay, then recover on the next valid edit.
    writeFileSync(componentPath, `${changedComponent}\nexport const broken = ;`);
    await expect(page.locator('vite-error-overlay')).toBeAttached();
    await page.waitForLoadState('networkidle');
    writeFileSync(componentPath, changedComponent);
    await expect(page.locator('vite-error-overlay')).not.toBeAttached();
    await expect(button).toHaveAttribute('data-dev-revision', 'updated');
    await expect(button).toBeVisible();
    await page.getByRole('button', { name: /^Count/ }).click();
    await expect(page.locator('output')).toHaveText('1');
  } finally {
    await browser?.close();
    await server?.close();
    // Only remove this test's temporary directory; unlink the junction first.
    assert.equal(dirname(scratch), tmpdir());
    rmSync(join(scratch, 'iu/node_modules'), { force: true, recursive: true });
    rmSync(join(scratch, 'node_modules'), { force: true, recursive: true });
    rmSync(scratch, { recursive: true, force: true });
  }
});
