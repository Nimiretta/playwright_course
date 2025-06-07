import { APIRequestContext } from '@playwright/test';
import { CustomersController } from 'api/controllers';
import { STATUS_CODES } from 'data';
import { generateCustomerData } from 'data/customers';
import { ICustomer } from 'types';
import { validateResponse } from 'utils/validations';
import { logStep } from 'utils';

export class CustomersApiService {
  controller: CustomersController;
  constructor(request: APIRequestContext) {
    this.controller = new CustomersController(request);
  }

  @logStep('Create Customer via API')
  async create(token: string, customData?: ICustomer) {
    const body = generateCustomerData(customData);
    const response = await this.controller.create(body, token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Customer;
  }
}
