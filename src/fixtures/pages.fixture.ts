import { test as base } from '@playwright/test';
import {
  AddNewCustomerPage,
  AddNewProductPage,
  CustomerDetailsPage,
  CustomersPage,
  EditCustomerPage,
  HomePage,
  ProductsPage,
  SideMenuComponent,
  SignInPage,
} from 'ui/pages';

interface ISalesPortalPages {
  homePage: HomePage;
  customersPage: CustomersPage;
  addNewCustomerPage: AddNewCustomerPage;
  signInPage: SignInPage;
  editCustomerPage: EditCustomerPage;
  sideMenu: SideMenuComponent;
  customerDetailsPage: CustomerDetailsPage;
  productsPage: ProductsPage;
  addNewProductPage: AddNewProductPage;
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
  editCustomerPage: async ({ page }, use) => {
    await use(new EditCustomerPage(page));
  },
  sideMenu: async ({ page }, use) => {
    await use(new SideMenuComponent(page));
  },
  customerDetailsPage: async ({ page }, use) => {
    await use(new CustomerDetailsPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
});

export { expect } from '@playwright/test';
