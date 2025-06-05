import { test, expect } from 'fixtures';
import { NOTIFICATIONS, TAGS } from 'data';
import { generateCustomerData } from 'data/customers';
import { AddNewCustomerPage, CustomersPage, SideMenuComponent } from 'ui/pages';

test.describe('[UI] [Sales Portal] [Customers]', () => {
  test(
    'Should create customer with valid data',
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ page, homeUIService }) => {
      const customersPage = new CustomersPage(page);
      const addNewCustomerPage = new AddNewCustomerPage(page);
      const sideMenu = new SideMenuComponent(page);

      await homeUIService.openAsLoggedInUser();
      await sideMenu.clickMenuItem('Customers');
      await customersPage.waitForOpened();
      await customersPage.clickAddNewCustomer();
      await addNewCustomerPage.waitForOpened();
      const data = generateCustomerData();
      await addNewCustomerPage.fillInputs(data);
      await addNewCustomerPage.clickSaveNewCustomer();
      await customersPage.waitForOpened();
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

      const actualCustomer = (await customersPage.getTableData())[0];
      const expectedCustomer = {
        email: data.email,
        name: data.name,
        country: data.country,
      };
      expect(actualCustomer).toMatchObject(expectedCustomer);
    },
  );
});
