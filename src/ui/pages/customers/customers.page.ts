import { SalesPortalPage } from '../salesPortal.page';

export class CustomersPage extends SalesPortalPage {
  readonly addNewCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }
}
