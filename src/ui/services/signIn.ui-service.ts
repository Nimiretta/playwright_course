import { USER_LOGIN, USER_PASSWORD } from 'config';
import { SignInPage, HomePage } from 'ui/pages';
import { PageHolder } from './base.ui-service';

export class SignInUIService extends PageHolder {
  private signInPage = new SignInPage(this.page);
  private homePage = new HomePage(this.page);

  async signInAsLocalUser() {
    await this.signInPage.openPortal();
    await this.signInPage.fillCredentials({ username: USER_LOGIN, password: USER_PASSWORD });
    await this.signInPage.clickLogin();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === 'Authorization')!.value;
    return token;
  }
}
