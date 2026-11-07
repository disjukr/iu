import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, expect } from '@playwright/test';
import { preview } from 'vite';

test('built docs use iu styles and interactive Solid examples on desktop and mobile', async () => {
  const server = await preview({ preview: { host: '127.0.0.1', port: 0 } });
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(server.resolvedUrls.local[0]);
    await page.getByRole('heading', { name: 'Try it yourself' }).waitFor();
    const counter = page.getByRole('button', { name: /Clicks/ });
    await counter.click();
    await page.locator('output').filter({ hasText: '1' }).waitFor();
    const theme = page.getByRole('button', { name: /Dark theme/ });
    await theme.click();
    await page.locator('button[aria-pressed="true"]').waitFor();
    await expect.poll(() => page.locator('.demo').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgba(33, 37, 41, 0.78)');
    await counter.focus();
    await page.keyboard.press('Tab');
    assert.equal(await theme.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
    for (const width of [1280, 375]) {
      await page.setViewportSize({ width, height: 800 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.httpServer.close(resolve));
  }
});
