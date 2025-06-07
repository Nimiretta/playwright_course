import { RequestApi } from 'api/apiClients/request';
import { APIRequestContext } from '@playwright/test';
import { apiConfig } from 'config';
import { ICustomer, ICustomerResponse, ICustomersResponse, IRequestOptions } from 'types';
import { convertRequestParams } from 'utils';
import { logStep } from 'utils';

export class CustomersController {
  private request: RequestApi;

  constructor(context: APIRequestContext) {
    this.request = new RequestApi(context);
  }

  @logStep('Send Create Customer request')
  async create(body: ICustomer, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.CUSTOMERS,
      method: 'post',
      data: body,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomerResponse>(options);
  }

  @logStep('Send Get Customer by ID request')
  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomerResponse>(options);
  }

  @logStep('Send Get All Customers request')
  async getAll(token: string, params?: Record<string, string>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.CUSTOMERS + (params ? convertRequestParams(params) : ''),
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomersResponse>(options);
  }

  @logStep('Send Update Customer request')
  async update(id: string, body: ICustomer, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
      method: 'put',
      data: body,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomerResponse>(options);
  }

  @logStep('Send Delete Customer request')
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<null>(options);
  }
}
