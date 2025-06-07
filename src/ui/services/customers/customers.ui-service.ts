import { CustomersPage, AddNewCustomerPage, EditCustomerPage, CustomerDetailsPage } from 'ui/pages';
import { PageHolder } from '../base.ui-service';
import { logStep } from 'utils';

export class CustomersUIService extends PageHolder {
  private customersPage = new CustomersPage(this.page);
  private addNewCustomerPage = new AddNewCustomerPage(this.page);
  private editCustomerPage = new EditCustomerPage(this.page);
  private customerDetailsPage = new CustomerDetailsPage(this.page);

  @logStep('Open Add New Customer Page from Customers Page')
  async openAddPage() {
    await this.customersPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep('Open Edit Customer Page from Customers Page')
  async openEditPage(email: string) {
    await this.customersPage.clickTableAction(email, 'edit');
    await this.editCustomerPage.waitForOpened();
  }

  @logStep('Open Customers Details Page from Customers Page')
  async openDetailsPage(email: string) {
    await this.customersPage.clickTableAction(email, 'details');
    await this.customerDetailsPage.waitForOpened();
  }
}
