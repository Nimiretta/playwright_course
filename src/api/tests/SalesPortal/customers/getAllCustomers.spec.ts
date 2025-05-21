import { test, expect } from 'fixtures';
import { USER_LOGIN, USER_PASSWORD } from 'config';
import { STATUS_CODES } from 'data';
import { generateCustomerData } from 'data/customers';
import { allCustomersSchema } from 'data/schemas';
import { ICustomerFromResponse } from 'types';
import { validateResponse, validateSchema } from 'utils/validations';

test.describe('[API] [Sales Portal] [Customers]', () => {
  test('Should get all customers w/o filters', async ({ signInController, customersController }) => {
    const loginResponse = await signInController.login({ username: USER_LOGIN, password: USER_PASSWORD });

    const token = loginResponse.headers['authorization'];

    const customerData = generateCustomerData();
    const customerResponse = await customersController.create(customerData, token);
    const customerBody = customerResponse.body;
    const customerId = customerBody.Customer._id;
    expect(customerResponse.status).toBe(STATUS_CODES.CREATED);

    const allCustomersResponse = await customersController.getAll(token);
    const allCustomersBody = allCustomersResponse.body;
    const customerFromResponse = allCustomersBody.Customers.find(
      (customer: ICustomerFromResponse) => customer._id === customerId,
    );

    validateSchema(allCustomersSchema, allCustomersBody);
    validateResponse(allCustomersResponse, STATUS_CODES.OK, true, null);
    expect.soft(customerFromResponse).toBeDefined();

    const response = await customersController.delete(customerId, token);
    expect.soft(response.status).toBe(STATUS_CODES.DELETED);
  });
});
