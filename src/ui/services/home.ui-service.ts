import { Page } from '@playwright/test';
import { ModuleName } from 'types';
import { HomePage, CustomersPage, ProductsPage } from 'ui/pages';

export class HomeUIService {
  homePage: HomePage;
  customersPage: CustomersPage;
  productsPage: ProductsPage;
  constructor(private page: Page) {
    this.customersPage = new CustomersPage(page);
    this.homePage = new HomePage(page);
    this.productsPage = new ProductsPage(page);
  }

  async openModule(moduleName: ModuleName) {
    await this.homePage.clickModuleButton(moduleName);
    switch (moduleName) {
      case 'Customers':
        await this.customersPage.waitForOpened();
        break;
      case 'Products':
        await this.productsPage.waitForOpened();
        break;
    }
  }
}
