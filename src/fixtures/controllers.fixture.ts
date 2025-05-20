import { test as base } from './businessSteps.fixture';
import { CustomersController } from 'api/controllers';

interface ISalesPortalControllers {
  customersController: CustomersController;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({}, use) => {
    await use(new CustomersController());
  },
});

export { expect } from '@playwright/test';
