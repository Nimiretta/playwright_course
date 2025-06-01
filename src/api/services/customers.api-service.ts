import { APIRequestContext } from '@playwright/test';
import { CustomersController } from 'api/controllers';
import { STATUS_CODES } from 'data';
import { generateCustomerData } from 'data/customers';
import { ICustomer } from 'types';
import { validateResponse } from 'utils/validations';

export class CustomersApiService {
  controller: CustomersController;
  constructor(request: APIRequestContext) {
    this.controller = new CustomersController(request);
  }

  async create(token: string, customData?: ICustomer) {
    const body = generateCustomerData(customData);
    const response = await this.controller.create(body, token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Customer;
  }
}
