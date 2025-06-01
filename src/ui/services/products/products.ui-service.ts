import { AddNewProductPage, ProductsPage } from 'ui/pages';
import { PageHolder } from '../base.ui-service';

export class ProductsUIService extends PageHolder {
  private productsPage = new ProductsPage(this.page);
  private addNewProductPage = new AddNewProductPage(this.page);

  async openAddPage() {
    await this.productsPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }
}
