import { SalesPortalPage } from './salesPortal.page';

export class HomePage extends SalesPortalPage {
  readonly title = this.page.locator('.welcome-text');

  readonly uniqueElement = this.title;
}
