import { AddNewProductPage, ProductsPage } from 'ui/pages';
import { PageHolder } from '../base.ui-service';
import { logStep } from 'utils';

export class ProductsUIService extends PageHolder {
  private productsPage = new ProductsPage(this.page);
  private addNewProductPage = new AddNewProductPage(this.page);

  @logStep('Open Add New Product Page from Products Page')
  async openAddPage() {
    await this.productsPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }
}
