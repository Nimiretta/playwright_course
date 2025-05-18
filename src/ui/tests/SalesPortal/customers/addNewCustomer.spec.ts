import test, { expect } from '@playwright/test';
import { NOTIFICATIONS } from 'data';
import { generateCustomerData } from 'data/customers';
import { AddNewCustomerPage, CustomersPage, SignInPage, HomePage } from 'ui/pages';

test.describe('[UI] [Sales Portal] [Customers]', () => {
  test('Should create customer with valid data', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
    await signInPage.fillCredentials('nimiretta', 'Test!123');
    await signInPage.clickLogin();

    await homePage.waitForOpened();
    await homePage.clickModuleButton('Customers');
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    const actualCustomer = (await customersPage.parseCustomersTable())[0];
    const expectedCustomer = {
      Email: data.email,
      Name: data.name,
      Country: data.country,
    };
    expect(actualCustomer).toMatchObject(expectedCustomer);
  });
});
