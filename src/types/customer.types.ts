import { COUNTRIES } from 'data/customers';
import { IResponseFields, sortDirection, customersSortField } from './api.types';

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export interface ICustomerFromResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
  sorting: {
    sortField: customersSortField;
    sortOrder: sortDirection;
  };
}

// export interface ICustomerTableRow {
//   Email: string;
//   Name: string;
//   Country: COUNTRIES;
//   'Created On': string;
// }

export type ICustomerInTable = Pick<ICustomer, 'email' | 'country' | 'name'>;
