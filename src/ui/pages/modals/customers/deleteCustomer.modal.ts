import { Modal } from '../modal.page';

export class DeleteCustomerModal extends Modal {
  readonly yesDeleteBtn = this.uniqueElement.getByRole('button', { name: 'Yes, Delete' });
  readonly cancelBtn = this.uniqueElement.getByRole('button', { name: 'Cancel' });

  async clickYesDelete() {
    await this.yesDeleteBtn.click();
  }

  async clickCancel() {
    await this.cancelBtn.click();
  }
}
