import { ProductDetailsModal } from '../modals';
import { SalesPortalPage } from '../salesPortal.page';

export class ProductsPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailsModal(this.page);

  readonly addNewProductButton = this.page.getByRole('button', { name: 'Add Product' });

  readonly tableRow = this.page.locator('#table-products tbody tr');
  readonly tableRowByName = (name: string) => this.tableRow.filter({ has: this.page.getByText(name, { exact: true }) });
  readonly detailsButton = (name: string) => this.tableRowByName(name).getByTitle('Details');

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickDetails(name: string) {
    await this.detailsButton(name).click();
    await this.detailsModal.waitForOpened();
  }
}
