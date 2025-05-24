import { test as base } from './businessSteps.fixture';
import { CustomersController, SignInController } from 'api/controllers';

interface ISalesPortalControllers {
  customersController: CustomersController;
  signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({}, use) => {
    await use(new CustomersController());
  },
  signInController: async ({}, use) => {
    await use(new SignInController());
  },
});

export { expect } from '@playwright/test';
