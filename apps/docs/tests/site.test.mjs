import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, expect } from '@playwright/test';
import { preview } from 'vite';

test('docs support independent pages, search, history, and mobile navigation', async () => {
  const server = await preview({ preview: { host: '127.0.0.1', port: 0 } });
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ permissions: ['clipboard-read', 'clipboard-write'], viewport: { width: 1280, height: 800 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const url = server.resolvedUrls.local[0];
    await page.goto(url);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Build with iu.');
    await page.getByRole('link', { name: 'Getting started', exact: true }).click();
    await expect(page.locator('#content')).toContainText('pnpm add');
    await expect(page.locator('#content')).not.toContainText('pnpm --filter');
    await expect(page.locator('#content')).toBeFocused();
    const shell = page.getByRole('code').first();
    await expect(shell).toHaveText('pnpm add /path/to/iu-0.0.0.tgz');
    await expect(page.locator('pre.shiki')).toHaveCount(2);
    assert.ok(await shell.locator('span[style*="color"]').count() > 0);
    await expect(page.locator('pre.shiki').nth(1)).toContainText('<Button variant="primary">Continue</Button>');
    const tokenColors = await page.locator('pre.shiki').nth(1).locator('span[style*="color"]').evaluateAll(tokens => [...new Set(tokens.map(token => getComputedStyle(token).color))]);
    assert.ok(tokenColors.length > 1, 'TSX tokens should use syntax colors');
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
    await expect(page.locator('pre.shiki')).toHaveCount(2);
    await expect(page.locator('pre.shiki').first()).toContainText('<Button padding="fit" onClick={save}>Save draft</Button>');
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
    for (const route of ['/colors', '/typography', '/api', '/components', '/components/button', '/components/button-group', '/components/code-block', '/components/tooltip', '/components/copy-button', '/components/card']) {
      await page.goto(`${url}#${route}`);
      await page.locator('main h1').waitFor();
      for (const width of [1280, 375]) {
        await page.setViewportSize({ width, height: 800 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${route} overflows at ${width}`);
      }
    }
    await page.goto(`${url}#/components/card`);
    await expect(page.locator('main')).toBeFocused();
    await page.getByRole('button', { name: 'Archive an item' }).press('Enter');
    await expect(page.getByRole('status')).toHaveText('1 archived');
    const standard = page.getByRole('radio', { name: 'Standard delivery' });
    const express = page.getByRole('radio', { name: 'Express delivery' });
    await expect(standard).toBeChecked();
    await standard.press('ArrowRight');
    await expect(express).toBeChecked();
    await expect(standard).not.toBeChecked();
    await page.getByRole('link', { name: 'Read the typography guide' }).click();
    const profile = page.getByRole('article', { name: 'Profile settings' });
    await expect(profile.getByRole('heading', { name: 'Profile settings' })).toHaveCSS('font-size', '24px');
    const sectionHeading = page.getByRole('heading', { name: 'Section heading', level: 2, exact: true });
    const subsectionHeading = page.getByRole('heading', { name: 'Subsection heading', level: 3, exact: true });
    for (const property of ['font-size', 'font-weight', 'line-height', 'letter-spacing']) {
      await expect(subsectionHeading).toHaveCSS(property, await sectionHeading.evaluate((el, name) => getComputedStyle(el).getPropertyValue(name), property));
    }
    await expect(page.getByRole('heading', { name: 'Compact heading', level: 3 })).toHaveCSS('font-size', '20px');
    await expect(page.getByText('Compact paragraph', { exact: true })).toHaveCSS('font-size', '14px');
    await expect(sectionHeading).toHaveCSS('margin-block-end', '12px');
    await expect(page.getByRole('heading', { name: 'Profile settings' })).toHaveCSS('margin-block-end', '12px');
    await expect(page.getByText('Compact paragraph', { exact: true })).toHaveCSS('margin-block-end', '14px');
    await expect(page.getByText('Update your profile or read the setup guide.', { exact: true })).toHaveCSS('margin-block-end', '16px');
    const native = page.getByRole('button', { name: 'Native button', exact: true });
    const component = page.getByRole('button', { name: 'iu Button', exact: true });
    for (const property of ['padding-left', 'background-color', 'min-height']) {
      await expect(native).toHaveCSS(property, await component.evaluate((el, name) => getComputedStyle(el).getPropertyValue(name), property));
    }
    await expect(page.getByRole('button', { name: 'Unstyled button' })).not.toHaveCSS('display', 'inline-flex');
    await expect(page.getByRole('heading', { name: 'Outside the Prose scope' })).not.toHaveCSS('font-size', '24px');
    await page.goto(`${url}#/components/copy-button`);
    await page.getByLabel('Text to copy').fill('A new value');
    const iconCopy = page.getByRole('button', { name: 'Copy current text', exact: true });
    await iconCopy.click();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'A new value');
    await expect(iconCopy).toHaveAttribute('aria-label', 'Copy current text');
    await page.goto(`${url}#/components/tooltip`);
    const tooltipSave = page.getByRole('button', { name: 'Save', exact: true });
    await tooltipSave.focus();
    await expect(page.getByRole('tooltip', { name: 'Save your changes' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip', { name: 'Save your changes' })).toBeHidden();
    await expect(tooltipSave).toBeFocused();
    await page.goto(`${url}#/components/code-block`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('CodeBlock');
    const copy = page.getByRole('button', { name: 'Copy command', exact: true });
    await expect(copy.locator('svg')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('main')).toBeFocused();
    await copy.press('Enter');
    await expect(copy).toHaveText('Copy');
    await expect(copy.locator('xpath=following-sibling::*[@role="status"][1]')).toHaveText('Copied');
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'pnpm install');
    const source = page.getByLabel('Button source code');
    const copyCode = source.locator('..').getByRole('button', { name: 'Copy code', exact: true });
    assert.ok(await copyCode.evaluate(button => {
      const block = button.parentElement;
      const bounds = block.getBoundingClientRect();
      const control = button.getBoundingClientRect();
      return parseFloat(getComputedStyle(block).borderRightWidth) > 0 &&
        control.right < bounds.right && control.top >= bounds.top && control.bottom <= bounds.bottom;
    }));
    await copyCode.click();
    await expect(copyCode.locator('xpath=following-sibling::*[@role="status"][1]')).toHaveText('Copied');
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), await source.textContent());
    const lightColor = await source.evaluate(el => getComputedStyle(el.parentElement).backgroundColor);
    await page.getByRole('button', { name: /Dark theme/ }).click();
    await expect.poll(() => source.evaluate(el => getComputedStyle(el.parentElement).backgroundColor)).not.toBe(lightColor);
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
