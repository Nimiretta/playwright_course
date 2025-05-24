import { CustomersApiService } from 'api/services';
import { test as base } from './mock.fixture';

interface IApiServices {
  customersApiService: CustomersApiService;
}

export const test = base.extend<IApiServices>({
  customersApiService: async ({ request }, use) => {
    await use(new CustomersApiService(request));
  },
});

export { expect } from '@playwright/test';
