import { CustomersUIService, EditCustomerUiService, HomeUIService, SignInUIService } from 'ui/services';
import { test as base } from './api-services.fixture';

interface IUIServices {
  homeUIService: HomeUIService;
  signInUIService: SignInUIService;
  customersUIService: CustomersUIService;
  addNewCustomerUIService: CustomersUIService;
  editCustomerUIService: EditCustomerUiService;
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
    await use(new CustomersUIService(page));
  },
  editCustomerUIService: async ({ page }, use) => {
    await use(new EditCustomerUiService(page));
  },
});

export { expect } from '@playwright/test';
