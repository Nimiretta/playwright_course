import { expect, Locator } from '@playwright/test';
import { SALES_PORTAL_URL } from 'config/environment';
import { BasePage } from './base.page';
import { logStep } from 'utils';

export abstract class SalesPortalPage extends BasePage {
  abstract readonly uniqueElement: Locator;

  readonly spinner = this.page.locator('.spinner-border');
  readonly notification = this.page.locator('.toast-body');

  @logStep('Wait for Sales Portal Page to be ready')
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinner();
  }

  @logStep('Wait for all spinners to disappear')
  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0);
  }

  @logStep('Check Notification text')
  async waitForNotification(text: string) {
    await expect(this.notification.last()).toHaveText(text);
  }

  @logStep('Go to Sales Portal')
  async openPortal() {
    this.page.goto(SALES_PORTAL_URL);
  }
}
