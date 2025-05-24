import { Page } from '@playwright/test';
import { ModuleName } from 'types';
import { HomePage, CustomersPage } from 'ui/pages';

export class HomeUIService {
  homePage: HomePage;
  customersPage: CustomersPage;
  constructor(private page: Page) {
    this.customersPage = new CustomersPage(page);
    this.homePage = new HomePage(page);
  }

  async openModule(moduleName: ModuleName) {
    await this.homePage.clickModuleButton(moduleName);
    switch (moduleName) {
      case 'Customers':
        await this.customersPage.waitForOpened();
        break;
    }
  }
}
