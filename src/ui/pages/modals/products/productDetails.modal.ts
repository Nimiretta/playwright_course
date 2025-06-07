import { MANUFACTURERS } from 'data/products';
import { IProduct } from 'types';
import { Modal } from '../modal.page';
import { logStep } from 'utils';

export class ProductDetailsModal extends Modal {
  readonly modalBody = this.page.locator(`#details-modal-body-container`);
  readonly values = this.modalBody.locator('p');

  uniqueElement = this.modalBody;

  @logStep('Get Product details')
  async getDetails(): Promise<Required<IProduct> & { createdOn: string }> {
    const [name, amount, price, manufacturer, createdOn, notes] = await this.values.allInnerTexts();
    return {
      name,
      amount: +amount,
      price: +price,
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn,
      notes,
    };
  }
}
