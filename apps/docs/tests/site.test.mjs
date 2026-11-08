import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, expect } from '@playwright/test';
import { preview } from 'vite';

test('docs support independent pages, search, history, and mobile navigation', async () => {
  const server = await preview({ preview: { host: '127.0.0.1', port: 0 } });
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const url = server.resolvedUrls.local[0];
    await page.goto(url);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Build with iu.');
    await page.getByRole('link', { name: 'Getting started', exact: true }).click();
    await expect(page.locator('#content')).toContainText('pnpm add');
    await expect(page.locator('#content')).not.toContainText('pnpm --filter');
    await expect(page.locator('#content')).toBeFocused();
    await page.getByRole('link', { name: /All components/ }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Components');
    await page.getByLabel('Find a component').fill('vertical');
    await expect(page.locator('.component-card')).toHaveCount(1);
    await page.locator('.component-card').click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ButtonGroup');
    await expect(page.locator('#button')).toHaveCount(0);
    await expect(page.getByRole('group', { name: 'File actions' })).toHaveCSS('flex-direction', 'column');
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ButtonGroup');
    await page.getByLabel('Search documentation').fill('SUBMIT');
    await expect(page.locator('nav a[href="#/components/button"]')).toBeVisible();
    await expect(page.locator('nav a[href="#/components/button-group"]')).toHaveCount(0);
    await page.getByLabel('Search documentation').fill('no-such-component');
    await expect(page.getByRole('status')).toHaveText('No matching documentation.');
    await page.getByLabel('Search documentation').fill('');
    await page.locator('nav a[href="#/components/button"]').click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Button');
    await expect(page.locator('nav a[aria-current="page"]')).toHaveText('Button');
    await expect(page).toHaveTitle('Button — iu');
    const counter = page.getByRole('button', { name: /Clicks/ });
    await counter.click();
    await expect(page.locator('output')).toHaveText('1');
    await page.getByRole('button', { name: /Dark theme/ }).click();
    await expect.poll(() => page.locator('#button .demo').first().evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgba(33, 37, 41, 0.78)');
    await counter.focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Secondary', exact: true })).toHaveCSS('outline-style', 'solid');
    await page.goBack();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ButtonGroup');
    await page.goForward();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Button');
    for (const route of ['/colors', '/typography', '/api', '/components', '/components/button', '/components/button-group']) {
      await page.goto(`${url}#${route}`);
      await page.locator('main h1').waitFor();
      for (const width of [1280, 375]) {
        await page.setViewportSize({ width, height: 800 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${route} overflows at ${width}`);
      }
    }
    const menu = page.getByRole('button', { name: 'Documentation', exact: true });
    await expect(page.getByRole('navigation')).toBeHidden();
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.locator('nav a[href="#/components/button"]').click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('navigation')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Button');
    await page.goto(`${url}#/missing`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
    await page.goto(`${url}#button-group`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ButtonGroup');
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.httpServer.close(resolve));
  }
});
