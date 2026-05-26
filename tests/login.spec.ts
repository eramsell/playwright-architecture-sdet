import { test, expect } from '@playwright/test';

const { describe, beforeEach } = test;
const it = test;

const LOGIN_URL = 'https://the-internet.herokuapp.com/login';
const USERNAME = 'tomsmith';
const PASSWORD = 'SuperSecretPassword!';

describe('The Internet — Login', () => {
  beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  it('logs in with valid credentials and shows success message', async ({ page }) => {
    await page.getByLabel('Username').fill(USERNAME);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('You logged into a secure area')).toBeVisible();
  });
});
