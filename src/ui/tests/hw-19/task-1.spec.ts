import test, { expect } from '@playwright/test';

test.describe('[UI] [Heroku] Dynamic Controls', () => {
  test('Should add/remove checkbox', async ({ page }) => {
    const expectedHeader = 'Dynamic Controls';
    const expectedTitleText =
      'This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.';

    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Dynamic Controls', exact: true }).click();
    const btnRemove = page.getByRole('button', { name: 'Remove' });
    await btnRemove.waitFor({ state: 'visible', timeout: 5000 });

    const header = page.getByRole('heading', { name: expectedHeader });
    const titleText = page.locator('div.example > p');
    await expect.soft(header).toHaveText(expectedHeader);
    await expect.soft(titleText).toHaveText(expectedTitleText);

    const checkbox = page.locator('input[label="blah"]');
    await checkbox.check();
    await btnRemove.click();
    await checkbox.waitFor({ state: 'hidden', timeout: 10000 });
    const btnAdd = page.getByRole('button', { name: 'Add' });
    await expect(btnAdd).toBeVisible();
    await expect.soft(page.locator('#message')).toHaveText("It's gone!");

    await btnAdd.click();
    const newCheckbox = page.locator('#checkbox');
    await newCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('#message')).toHaveText("It's back!");
  });
});
