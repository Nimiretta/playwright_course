import { SalesPortalPage } from '../salesPortal.page';

export class ProductsPage extends SalesPortalPage {
  readonly addNewProductButton = this.page.getByRole('button', { name: 'Add Product' });

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }
}
