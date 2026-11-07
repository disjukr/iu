import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, expect } from '@playwright/test';
import { preview } from 'vite';

test('lab runs iu experiments with state, theme, and keyboard focus', async () => {
  const server = await preview({ preview: { host: '127.0.0.1', port: 0 } });
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(server.resolvedUrls.local[0]);
    const sizeHeights = await Promise.all(['Fit', 'Normal', 'Custom'].map(name =>
      page.getByRole('button', { name, exact: true }).evaluate(el => el.getBoundingClientRect().height),
    ));
    assert.ok(sizeHeights[0] < sizeHeights[1] && sizeHeights[1] < sizeHeights[2]);
    await expect(page.locator('.experiment')).toHaveCSS('background-color', 'rgba(248, 249, 250, 0.64)');
    await expect(page.locator('.experiment')).toHaveCSS('backdrop-filter', 'blur(20px) saturate(1.2)');
    const primary = page.getByRole('button', { name: 'Primary', exact: true });
    const secondary = page.getByRole('button', { name: 'Secondary', exact: true });
    await expect(primary).toHaveCSS('color', 'rgb(248, 249, 250)');
    const counter = page.getByRole('button', { name: /^Count/ });
    await counter.click();
    await expect(page.locator('output')).toHaveText('1');
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(page.locator('output')).toHaveText('0');
    await page.getByRole('button', { name: 'Dark theme off' }).click();
    await expect(page.getByRole('button', { name: 'Dark theme on' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.experiment')).toHaveCSS('background-color', 'rgba(33, 37, 41, 0.78)');
    await expect(page.locator('.experiment')).toHaveCSS('color', 'rgb(248, 249, 250)');
    await expect(primary).toHaveCSS('color', 'rgb(33, 37, 41)');
    await expect(secondary).toHaveCSS('color', 'rgb(248, 249, 250)');
    await expect(primary).toHaveCSS('background-image', 'linear-gradient(145deg, rgb(248, 249, 250), rgb(231, 245, 255))');
    await expect(page.getByRole('button', { name: 'Custom primary', exact: true })).toHaveCSS('color', 'rgb(33, 37, 41)');
    await page.getByRole('button', { name: 'Dark theme on' }).click();
    await expect(page.locator('.experiment')).toHaveCSS('background-color', 'rgba(248, 249, 250, 0.64)');
    await expect(primary).toHaveCSS('color', 'rgb(248, 249, 250)');
    await counter.focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Reset', exact: true })).toHaveCSS('outline-style', 'solid');
    await page.setViewportSize({ width: 375, height: 800 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.httpServer.close(resolve));
  }
});
