import { Locator, Page } from '@playwright/test';
import { SideMenuItem } from 'types';
import { logStep } from 'utils';

export class SideMenuComponent {
  readonly salesPortalButton: Locator;
  readonly userDropdown: Locator;
  readonly signOutButton: Locator;

  constructor(protected page: Page) {
    this.salesPortalButton = this.page.locator('span.fs-4');
    this.userDropdown = this.page.locator('#dropdownUser1');
    this.signOutButton = this.page.locator('#signOut');
  }

  readonly menuItem = (itemName: SideMenuItem) => this.page.locator(`a[name="${itemName}"]`);

  @logStep('Click on Side Menu item')
  async clickMenuItem(itemName: SideMenuItem) {
    await this.menuItem(itemName).click();
  }

  @logStep('Click on logged in user button')
  async openUserDropdown() {
    await this.userDropdown.click();
  }

  @logStep('Click on Sign Out button')
  async clickSignOut() {
    await this.signOutButton.click();
  }
}
