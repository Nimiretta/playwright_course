import { Page } from '@playwright/test';
import { CustomersPage, AddNewCustomerPage, EditCustomerPage, CustomerDetailsPage } from 'ui/pages';

export class CustomersUIService {
  private customersPage: CustomersPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private editCustomerPage: EditCustomerPage;
  private customerDetailsPage: CustomerDetailsPage;
  constructor(private page: Page) {
    this.customersPage = new CustomersPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.customerDetailsPage = new CustomerDetailsPage(page);
  }

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
