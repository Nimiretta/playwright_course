import { CustomersPage, AddNewCustomerPage, EditCustomerPage, CustomerDetailsPage } from 'ui/pages';
import { PageHolder } from '../base.ui-service';

export class CustomersUIService extends PageHolder {
  private customersPage = new CustomersPage(this.page);
  private addNewCustomerPage = new AddNewCustomerPage(this.page);
  private editCustomerPage = new EditCustomerPage(this.page);
  private customerDetailsPage = new CustomerDetailsPage(this.page);

  async openAddPage() {
    await this.customersPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

  async openEditPage(email: string) {
    await this.customersPage.clickTableAction(email, 'edit');
    await this.editCustomerPage.waitForOpened();
  }

  async openDetailsPage(email: string) {
    await this.customersPage.clickTableAction(email, 'details');
    await this.customerDetailsPage.waitForOpened();
  }
}
