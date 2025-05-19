import { test as base } from '@playwright/test';
import { AddNewCustomerPage, CustomersPage, HomePage, SignInPage } from 'ui/pages';

interface ISalesPortalPages {
  homePage: HomePage;
  customersPage: CustomersPage;
  addNewCustomerPage: AddNewCustomerPage;
  signInPage: SignInPage;
}

export const test = base.extend<ISalesPortalPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  customersPage: async ({ page }, use) => {
    await use(new CustomersPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
});

export { expect } from '@playwright/test';
