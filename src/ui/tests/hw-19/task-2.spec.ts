import test, { expect } from '@playwright/test';

test.describe('[UI] [Sales Portal] Login', () => {
  const validCredentials = {
    username: 'test@gmail.com',
    password: '12345678',
  };

  test('Should login with valid credentials', async ({ page }) => {
    await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
    await page.locator('#emailinput').fill(validCredentials.username);
    await page.locator('#passwordinput').fill(validCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.spinner-border')).toHaveCount(0);
    await expect(page.locator('#dropdownUser1 > strong')).toHaveText('Anatoly');
    await expect(page.locator('#sidebar > ul')).toHaveScreenshot();
  });
});
