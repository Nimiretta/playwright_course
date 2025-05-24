import {
  AddNewCustomerUIService,
  AddNewProductUIService,
  CustomersUIService,
  EditCustomerUiService,
  HomeUIService,
  ProductsUIService,
  SignInUIService,
} from 'ui/services';
import { test as base } from './api-services.fixture';

interface IUIServices {
  homeUIService: HomeUIService;
  signInUIService: SignInUIService;
  customersUIService: CustomersUIService;
  addNewCustomerUIService: AddNewCustomerUIService;
  editCustomerUIService: EditCustomerUiService;
  productsUIService: ProductsUIService;
  addNewProductUIService: AddNewProductUIService;
}

export const test = base.extend<IUIServices>({
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },
  signInUIService: async ({ page }, use) => {
    await use(new SignInUIService(page));
  },
  customersUIService: async ({ page }, use) => {
    await use(new CustomersUIService(page));
  },
  addNewCustomerUIService: async ({ page }, use) => {
    await use(new AddNewCustomerUIService(page));
  },
  editCustomerUIService: async ({ page }, use) => {
    await use(new EditCustomerUiService(page));
  },
  productsUIService: async ({ page }, use) => {
    await use(new ProductsUIService(page));
  },
  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },
});

export { expect } from '@playwright/test';
