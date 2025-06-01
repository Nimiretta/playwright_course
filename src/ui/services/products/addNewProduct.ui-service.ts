import { expect } from '@playwright/test';
import { apiConfig } from 'config';
import { STATUS_CODES } from 'data';
import { generateProductData } from 'data/products';
import _ from 'lodash';
import { IProduct, IProductResponse } from 'types';
import { AddNewProductPage, ProductsPage } from 'ui/pages';
import { PageHolder } from '../base.ui-service';

export class AddNewProductUIService extends PageHolder {
  private addNewProductPage = new AddNewProductPage(this.page);
  private productsPage = new ProductsPage(this.page);

  async create(customData?: IProduct) {
    const data = generateProductData(customData);
    await this.addNewProductPage.fillInputs(data);
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, unknown[]>(
      apiConfig.ENDPOINTS.PRODUCTS,
      this.addNewProductPage.clickSaveNewProduct.bind(this.addNewProductPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, '_id', 'createdOn')).toEqual(data);
    await this.productsPage.waitForOpened();
    return response.body.Product;
  }
}
