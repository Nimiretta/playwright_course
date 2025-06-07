import test, { expect } from '@playwright/test';
import { TAGS } from 'data';

test.describe('[UI] [Sales Portal] Login', () => {
  const validCredentials = {
    username: 'test@gmail.com',
    password: '12345678',
  };

  // Reset storage state for this file to avoid being authenticated
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Should login with valid credentials', { tag: [TAGS.UI, TAGS.VISUAL_REGRESSION] }, async ({ page }) => {
    await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
    await page.locator('#emailinput').fill(validCredentials.username);
    await page.locator('#passwordinput').fill(validCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.spinner-border')).toHaveCount(0);
    await expect(page.locator('#dropdownUser1 > strong')).toHaveText('Anatoly');
    await expect(page.locator('#sidebar > ul')).toHaveScreenshot();
  });
});
