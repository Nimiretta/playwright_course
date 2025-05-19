import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from 'config/environment';
import { test as base, expect } from './pages.fixture';
import { ICustomer } from 'types';
import { generateCustomerData } from 'data/customers';

interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
  createNewCustomer(params?: Partial<ICustomer>): Promise<ICustomer>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ page, homePage, signInPage }, use) => {
    await use(async () => {
      await page.goto(SALES_PORTAL_URL);
      await signInPage.fillCredentials(USER_LOGIN, USER_PASSWORD);
      await signInPage.clickLogin();
      await homePage.waitForOpened();
    });
  },

  createNewCustomer: async ({ homePage, addNewCustomerPage, customersPage }, use) => {
    await use(async (params?: Partial<ICustomer>) => {
      await homePage.clickModuleButton('Customers');
      await customersPage.waitForOpened();
      await customersPage.clickAddNewCustomer();
      await addNewCustomerPage.waitForOpened();
      const data = generateCustomerData(params);
      await addNewCustomerPage.fillInputs(data);
      await addNewCustomerPage.clickSaveNewCustomer();
      await customersPage.waitForOpened();
      expect(await customersPage.isCustomerInTable(data.email), 'Created customer should be in table').toBeTruthy();
      return data;
    });
  },
});

export { expect } from '@playwright/test';
