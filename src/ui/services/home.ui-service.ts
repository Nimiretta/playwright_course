import { ModuleName } from 'types';
import { HomePage, CustomersPage, ProductsPage } from 'ui/pages';
import { PageHolder } from './base.ui-service';
import { logStep } from 'utils';

export class HomeUIService extends PageHolder {
  private customersPage = new CustomersPage(this.page);
  private homePage = new HomePage(this.page);
  private productsPage = new ProductsPage(this.page);

  @logStep('Open Module')
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

  @logStep('Open Sales Portal on Home Page')
  async openAsLoggedInUser() {
    await this.homePage.openPortal();
    await this.homePage.waitForOpened();
  }
}
