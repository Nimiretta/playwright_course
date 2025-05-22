import { Modal } from '../modal.page';

export class DeleteCustomerModal extends Modal {
  readonly yesDeleteBtn = this.modalContainer.getByRole('button', { name: 'Yes, Delete' });
  readonly cancelBtn = this.modalContainer.getByRole('button', { name: 'Cancel' });

  readonly uniqueElement = this.yesDeleteBtn;

  async clickYesDelete() {
    await this.yesDeleteBtn.click();
  }

  async clickCancel() {
    await this.cancelBtn.click();
  }
}
