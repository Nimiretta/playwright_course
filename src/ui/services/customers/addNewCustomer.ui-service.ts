import { expect, Page } from '@playwright/test';
import { apiConfig } from 'config';
import { STATUS_CODES } from 'data';
import { generateCustomerData } from 'data/customers';
import _ from 'lodash';
import { ICustomer, ICustomerResponse } from 'types';
import { AddNewCustomerPage, CustomersPage } from 'ui/pages';

export class AddNewCustomerUIService {
  private addNewCustomerPage: AddNewCustomerPage;
  private customersPage: CustomersPage;
  constructor(private page: Page) {
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.customersPage = new CustomersPage(page);
  }

  async create(customData?: ICustomer) {
    const data = generateCustomerData(customData);
    await this.addNewCustomerPage.fillInputs(data);
    const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, unknown[]>(
      apiConfig.ENDPOINTS.CUSTOMERS,
      this.addNewCustomerPage.clickSaveNewCustomer.bind(this.addNewCustomerPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer, '_id', 'createdOn')).toEqual({ ...data });
    await this.customersPage.waitForOpened();
    return response.body.Customer;
  }
}
