/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ICustomer } from 'types';
import { SalesPortalPage } from '../salesPortal.page';
import { logStep } from 'utils';

export class AddNewCustomerPage extends SalesPortalPage {
  readonly emailInput = this.page.locator('#inputEmail');
  readonly nameInput = this.page.locator('#inputName');
  readonly countryInput = this.page.locator('#inputCountry');
  readonly cityInput = this.page.locator('#inputCity');
  readonly streetInput = this.page.locator('#inputStreet');
  readonly houseInput = this.page.locator('#inputHouse');
  readonly flatInput = this.page.locator('#inputFlat');
  readonly phoneInput = this.page.locator('#inputPhone');
  readonly notesInput = this.page.locator('#textareaNotes');
  readonly saveNewCustomerButton = this.page.locator('#save-new-customer');

  uniqueElement = this.saveNewCustomerButton;

  @logStep('Fill new customer inputs')
  async fillInputs(customer: Partial<ICustomer>) {
    customer.email && (await this.emailInput.fill(customer.email));
    customer.name && (await this.nameInput.fill(customer.name));
    customer.country && (await this.countryInput.selectOption(customer.country));
    customer.city && (await this.cityInput.fill(customer.city));
    customer.street && (await this.streetInput.fill(customer.street));
    customer.house && (await this.houseInput.fill(customer.house.toString()));
    customer.flat && (await this.flatInput.fill(customer.flat.toString()));
    customer.phone && (await this.phoneInput.fill(customer.phone));
    customer.notes && (await this.notesInput.fill(customer.notes));
  }

  @logStep('Click on Save New Customer button')
  async clickSaveNewCustomer() {
    await this.saveNewCustomerButton.click();
  }
}
