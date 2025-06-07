import { logStep } from 'utils';
import { Modal } from './modal.page';

export class FilterModal extends Modal {
  readonly applyButton = this.modalContainer.getByRole('button', { name: 'Apply' });
  readonly clearFiltersButton = this.modalContainer.getByRole('button', { name: 'Clear Filters' });

  readonly checkbox = (name: string) => this.modalContainer.locator(`input[value="${name}"]`);

  readonly uniqueElement = this.clearFiltersButton;

  @logStep('Choose filters values')
  async checkFilters(...value: string[]) {
    for (const v of value) {
      await this.checkbox(v).check();
    }
  }

  @logStep('Click on Apply button')
  async clickApply() {
    await this.applyButton.click();
  }

  @logStep('Click on Clear Filters button')
  async clickClearFilters() {
    await this.clearFiltersButton.click();
  }
}
