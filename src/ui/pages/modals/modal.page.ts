import { expect } from '@playwright/test';
import { SalesPortalPage } from '../salesPortal.page';
import { logStep } from 'utils';

export abstract class Modal extends SalesPortalPage {
  readonly modalContainer = this.page.locator(`div[role="dialog"]`);
  readonly title = this.modalContainer.locator('.modal-title');
  readonly closeButton = this.modalContainer.locator('button[aria-label="Close"]');

  @logStep('Click on modal close button')
  async close() {
    await this.closeButton.click();
    await this.waitForClosed();
  }

  @logStep('Wait for closing modal')
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
