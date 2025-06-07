import { ICredentials } from 'types';
import { SalesPortalPage } from './salesPortal.page';
import { logStep } from 'utils';

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator('#emailinput');
  readonly passwordInput = this.page.locator('#passwordinput');
  readonly loginBtn = this.page.getByRole('button', { name: 'Login' });
  readonly uniqueElement = this.loginBtn;

  @logStep('Fill in the email input')
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  @logStep('Fill in the password input')
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  @logStep('Fill in the credentials')
  async fillCredentials({ username, password }: ICredentials) {
    await this.fillEmail(username);
    await this.fillPassword(password);
  }

  @logStep('Click on Login button')
  async clickLogin() {
    await this.loginBtn.click();
  }
}
