import { faker } from '@faker-js/faker';
import { USER_LOGIN, USER_PASSWORD } from 'config';
import { STATUS_CODES } from 'data';
import { COUNTRIES, generateCustomerData } from 'data/customers';
import { customerSchema, errorResponseSchema } from 'data/schemas';
import { test, expect } from 'fixtures';
import _ from 'lodash';
import { ICustomer } from 'types';
import { validateResponse, validateSchema } from 'utils/validations';

const getStringAlpha = strGenerator('alpha');
const getStringAlphanumeric = strGenerator('alphanumeric');
const getStringNumeric = strGenerator('numeric');
interface ICreateCustomerTestData {
  testName: string;
  customer: Partial<ICustomer>;
}

const customerValidTestData: ICreateCustomerTestData[] = [
  {
    testName: 'Should create customer with the shortest valid data',
    customer: {
      name: 'A',
      city: 'A',
      street: 'A',
      house: 1,
      flat: 1,
      phone: `+${getStringNumeric({ length: 10 })}`,
      notes: '',
    },
  },
  {
    testName: 'Should create customer with the longest valid data',
    customer: {
      name: getStringAlpha({ length: 40 }),
      city: getStringAlpha({ length: 20 }),
      street: getStringAlphanumeric({ length: 40 }),
      house: 999,
      flat: 9999,
      phone: `+${getStringNumeric({ length: 20 })}`,
      notes: getStringAlphanumeric({ length: 250 }),
    },
  },
  {
    testName: 'Should create customer with valid data included spaces',
    customer: {
      name: `${getStringAlpha({ min: 1, max: 19 })} ${getStringAlpha({ min: 1, max: 19 })}`,
      city: `${getStringAlpha({ min: 1, max: 9 })} ${getStringAlpha({ min: 1, max: 9 })}`,
      street: `${getStringAlpha({ min: 1, max: 30 })} ${getStringNumeric({ min: 1, max: 9 })}`,
    },
  },
];

test.describe('[API] [Sales Portal] [Customers] [Create] Positive scenarios', () => {
  let id = '';
  let token = '';

  test.beforeEach(async ({ signInController }) => {
    const loginResponse = await signInController.login({ username: USER_LOGIN, password: USER_PASSWORD });
    token = loginResponse.headers['authorization'];
  });

  customerValidTestData.forEach(({ testName, customer }) => {
    test(testName, async ({ customersController }) => {
      const customerData = generateCustomerData(customer);
      const customerResponse = await customersController.create(customerData, token);
      id = customerResponse.body.Customer._id;

      validateSchema(customerSchema, customerResponse.body);
      validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
      expect.soft(_.omit(customerResponse.body.Customer, '_id', 'createdOn')).toEqual(customerData);
    });
  });

  test.afterEach(async ({ customersController }) => {
    if (id) {
      const response = await customersController.delete(id, token);
      expect.soft(response.status).toBe(STATUS_CODES.DELETED);
    }
  });
});

interface ICustomerInvalidTestData extends ICreateCustomerTestData {
  token?: string;
  statusCode: number;
  errorMessage: string;
}

const customerInvalidTestData: ICustomerInvalidTestData[] = [
  {
    testName: 'Should not create customer with empty token',
    customer: {},
    token: '',
    statusCode: STATUS_CODES.UNAUTHORIZED,
    errorMessage: 'Not authorized',
  },
  {
    testName: 'Should not create customer with invalid token',
    customer: {},
    token: 'invalid_token',
    statusCode: STATUS_CODES.UNAUTHORIZED,
    errorMessage: 'Invalid access token',
  },
  {
    testName: 'Should not create customer with empty email',
    customer: {
      email: '',
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with non-unique email',
    customer: {
      email: 'existingUser_non_unique5645135885@test.com',
    },
    statusCode: STATUS_CODES.CONFLICT,
    errorMessage: "Customer with email 'existingUser_non_unique5645135885@test.com' already exists",
  },
  {
    testName: 'Should not create customer with empty name',
    customer: {
      name: '',
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with name > 40 symbols',
    customer: {
      name: getStringAlpha({ length: 41 }),
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with name included 2 spaces between words',
    customer: {
      name: `${getStringAlpha({ min: 1, max: 19 })}  ${getStringAlpha({ min: 1, max: 19 })}`,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with empty country',
    customer: {
      country: '' as unknown as COUNTRIES,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with country outside of the list',
    customer: {
      country: 'Spain' as unknown as COUNTRIES,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with empty city',
    customer: {
      city: '',
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with city > 20 symbols',
    customer: {
      city: getStringAlpha({ length: 21 }),
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with city included 2 spaces between words',
    customer: {
      city: `${getStringAlpha({ min: 1, max: 9 })}  ${getStringAlpha({ min: 1, max: 9 })}`,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with empty street',
    customer: {
      street: '',
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with street > 40 symbols',
    customer: {
      street: getStringAlphanumeric({ length: 41 }),
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with street included 2 spaces between words',
    customer: {
      street: `${getStringAlpha({ min: 1, max: 29 })}  ${getStringNumeric({ min: 1, max: 9 })}`,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with empty house',
    customer: {
      house: '' as unknown as number,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with house < 1',
    customer: {
      house: 0,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with house > 999',
    customer: {
      house: 1000,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with house as string',
    customer: {
      house: '23' as unknown as number,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with empty flat',
    customer: {
      flat: '' as unknown as number,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with flat < 1',
    customer: {
      flat: 0,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with flat > 9999',
    customer: {
      flat: 10000,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with flat as string',
    customer: {
      house: '23' as unknown as number,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with empty phone',
    customer: {
      phone: '',
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with phone < 10 numbers',
    customer: {
      phone: `+${getStringNumeric({ length: 9 })}`,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with phone > 20 numbers',
    customer: {
      phone: `+${getStringNumeric({ length: 21 })}`,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with phone includes letters',
    customer: {
      phone: `+${getStringNumeric({ length: 14 })}ab`,
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with notes > 250 symbols',
    customer: {
      notes: getStringAlphanumeric({ length: 251 }),
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with notes includes symbol ">"',
    customer: {
      notes: getStringAlphanumeric({ length: 150 }) + '>',
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
  {
    testName: 'Should not create customer with notes includes symbol "<"',
    customer: {
      notes: getStringAlphanumeric({ length: 150 }) + '<',
    },
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: 'Incorrect request body',
  },
];

test.describe('[API] [Sales Portal] [Customers] [Create] Negative scenarios', () => {
  test.describe.configure({ mode: 'serial' });
  let token = '';
  let createdCustomerId = '';

  test.beforeAll(async ({ signInController, customersController }) => {
    const loginResponse = await signInController.login({ username: USER_LOGIN, password: USER_PASSWORD });
    token = loginResponse.headers['authorization'];

    const nonUniqueCustomerData = generateCustomerData({ email: 'existingUser_non_unique5645135885@test.com' });
    const response = await customersController.create(nonUniqueCustomerData, token);
    createdCustomerId = response.body.Customer._id;
  });

  customerInvalidTestData.forEach(({ testName, customer, token: testToken, statusCode, errorMessage }) => {
    test(testName, async ({ customersController }) => {
      const customerData = generateCustomerData(customer);
      const customerResponse = await customersController.create(customerData, testToken ?? token);

      validateSchema(errorResponseSchema, customerResponse.body);
      validateResponse(customerResponse, statusCode, false, errorMessage);
    });
  });

  test.afterAll(async ({ customersController }) => {
    if (createdCustomerId) {
      const response = await customersController.delete(createdCustomerId, token);
      expect.soft(response.status).toBe(STATUS_CODES.DELETED);
    }
  });
});

type LengthParams = { length: number; min?: never; max?: never } | { min: number; max: number; length?: never };
type StringGeneratorParams = LengthParams & { excludeSpace?: boolean };

function strGenerator(method: 'alpha' | 'alphanumeric' | 'numeric') {
  return ({ min, max, length, excludeSpace = true }: StringGeneratorParams) => {
    return faker.string[method]({
      length: length ? length : { min: min!, max: max! },
      exclude: excludeSpace ? [' '] : [],
    });
  };
}
