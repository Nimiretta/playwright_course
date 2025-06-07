import { CustomersApiService, SignInApiService } from 'api/services';
import { test as base } from './mock.fixture';

interface IApiServices {
  customersApiService: CustomersApiService;
  signInApiService: SignInApiService;
}

export const test = base.extend<IApiServices>({
  customersApiService: async ({ request }, use) => {
    await use(new CustomersApiService(request));
  },
  signInApiService: async ({ request }, use) => {
    await use(new SignInApiService(request));
  },
});

export { expect } from '@playwright/test';
