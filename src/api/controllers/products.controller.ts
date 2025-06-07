import { APIRequestContext } from '@playwright/test';
import { RequestApi } from 'api/apiClients/request';
import { apiConfig } from 'config';
import { IProductResponse, IRequestOptions } from 'types';
import { logStep } from 'utils';

export class ProductsController {
  private request: RequestApi;

  constructor(context: APIRequestContext) {
    this.request = new RequestApi(context);
  }

  @logStep('Send Get Product by ID request')
  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(id),
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<IProductResponse>(options);
  }

  @logStep('Send Delete Product request')
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(id),
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<null>(options);
  }
}
