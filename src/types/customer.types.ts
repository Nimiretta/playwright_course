import { COUNTRIES } from 'data/customers';

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

// export interface ICustomerTableRow {
//   Email: string;
//   Name: string;
//   Country: COUNTRIES;
//   'Created On': string;
// }

export type ICustomerInTable = Pick<ICustomer, 'email' | 'country' | 'name'>;
