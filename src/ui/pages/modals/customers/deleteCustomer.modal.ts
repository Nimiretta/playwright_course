import { logStep } from 'utils';
import { Modal } from '../modal.page';

export class DeleteCustomerModal extends Modal {
  readonly yesDeleteBtn = this.modalContainer.getByRole('button', { name: 'Yes, Delete' });
  readonly cancelBtn = this.modalContainer.getByRole('button', { name: 'Cancel' });

  readonly uniqueElement = this.yesDeleteBtn;

  @logStep('Click on Yes, Delete button')
  async clickYesDelete() {
    await this.yesDeleteBtn.click();
  }

  @logStep('Click on Cancel button')
  async clickCancel() {
    await this.cancelBtn.click();
  }
}
