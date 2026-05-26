import { test, expect } from '@playwright/test';

const { describe, beforeEach } = test;
const it = test;

const PLAYWRIGHT_HOME = 'https://playwright.dev/';

describe('Playwright.dev', () => {
  beforeEach(async ({ page }) => {
    await page.goto(PLAYWRIGHT_HOME);
  });

  it('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  it('get started link', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
