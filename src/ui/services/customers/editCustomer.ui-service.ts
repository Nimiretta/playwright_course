import { apiConfig } from 'config';
import { generateCustomerData } from 'data/customers';
import { expect } from 'fixtures';
import { STATUS_CODES } from 'data';
import _ from 'lodash';
import { ICustomer, ICustomerResponse } from 'types';
import { EditCustomerPage, CustomersPage } from 'ui/pages';
import { PageHolder } from '../base.ui-service';
import { logStep } from 'utils';

export class EditCustomerUiService extends PageHolder {
  private editCustomerPage = new EditCustomerPage(this.page);
  private customersPage = new CustomersPage(this.page);

  @logStep('Edit Customer via UI')
  async edit(customData?: ICustomer) {
    const data = generateCustomerData(customData);
    await this.editCustomerPage.fillInputs(data);
    const response = await this.editCustomerPage.interceptResponse<ICustomerResponse, unknown[]>(
      apiConfig.ENDPOINTS.CUSTOMERS,
      this.editCustomerPage.clickSaveChanges.bind(this.editCustomerPage),
    );
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(_.omit(response.body.Customer, '_id', 'createdOn')).toEqual({ ...data });
    await this.customersPage.waitForOpened();
    return response.body.Customer;
  }
}
