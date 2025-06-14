/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IProduct } from 'types';
import { SalesPortalPage } from '../salesPortal.page';
import { logStep } from 'utils';

export class AddNewProductPage extends SalesPortalPage {
  readonly name = this.page.locator('#inputName');
  readonly price = this.page.locator('#inputPrice');
  readonly amount = this.page.locator('#inputAmount');
  readonly manufacturer = this.page.locator('#inputManufacturer');
  readonly notes = this.page.locator('#textareaNotes');
  readonly saveNewProductButton = this.page.locator('#save-new-product');

  readonly nameError = this.page.locator('#error-inputName');

  readonly uniqueElement = this.name;

  @logStep('Fill in the product form')
  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.name.fill(String(product.name)));
    product.price && (await this.price.fill(product.price?.toString()));
    product.amount && (await this.amount.fill(product.amount?.toString()));
    product.manufacturer && (await this.manufacturer.selectOption(product.manufacturer));
    product.notes && (await this.notes.fill(product.notes));
  }

  @logStep('Get product name error message')
  async getError() {
    return await this.nameError.textContent();
  }

  @logStep('Click on Save New Product button')
  async clickSaveNewProduct() {
    await this.saveNewProductButton.click();
  }
}
