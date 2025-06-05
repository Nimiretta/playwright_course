import { TAGS } from 'data';
import { test, expect } from 'fixtures';

test.describe('[UI] [Sales Portal] [Customers]', () => {
  test(
    'Should delete customer',
    { tag: [TAGS.UI, TAGS.SMOKE] },
    async ({ homeUIService, createNewCustomer, customersPage }) => {
      await homeUIService.openAsLoggedInUser();
      const createdCustomer = await createNewCustomer();
      await customersPage.clickTableAction(createdCustomer.email, 'delete');
      await customersPage.deleteModal.waitForOpened();
      await customersPage.deleteModal.clickYesDelete();
      await customersPage.deleteModal.waitForClosed();
      await customersPage.waitForOpened();
      expect(await customersPage.isCustomerInTable(createdCustomer.email), 'Customer is present in table').toBeFalsy();
    },
  );
});
