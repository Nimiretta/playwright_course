import test, { expect, Page } from '@playwright/test';

test.describe('[UI] [demo-login-form] [Smoke] Register', () => {
  const expectedSuccessfulMsg = 'Successfully registered! Please, click Back to return on login page';

  test.beforeEach(async ({ page }) => {
    await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
    await page.locator('#registerOnLogin').click();
  });

  test('Register with the shortest valid data', async ({ page }) => {
    await fillAndSubmitForm(page, 'A1d', 'Passw0rd');

    const notification = page.locator('#errorMessageOnRegister');
    await expect(notification).toHaveText(expectedSuccessfulMsg);
  });

  test('Register with the longest valid data', async ({ page }) => {
    await fillAndSubmitForm(page, 'I_amIncrediblyLongUserName with-40-chars', 'I_am_Long_Password!1');

    const notification = page.locator('#errorMessageOnRegister');
    await expect(notification).toHaveText(expectedSuccessfulMsg);
  });

  async function fillAndSubmitForm(page: Page, username: string, password: string) {
    await page.locator('#userNameOnRegister').fill(username);
    await page.locator('#passwordOnRegister').fill(password);
    await page.locator('#register').click();
  }
});
