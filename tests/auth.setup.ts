import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('Autenticación global en The Internet', async ({ page }) => {
  // 1. Navegamos a la URL de login que tienes en tus constantes
  await page.goto('https://the-internet.herokuapp.com/login');

  // 2. Ejecutamos el flujo de éxito (copiado tal cual de tu línea 17-19)
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Validamos que el login ha sido exitoso antes de guardar (línea 21)
  await expect(page.getByText('You logged into a secure area')).toBeVisible();

  // 4. Guardamos las cookies y el almacenamiento de la sesión en el archivo JSON
  await page.context().storageState({ path: authFile });
});