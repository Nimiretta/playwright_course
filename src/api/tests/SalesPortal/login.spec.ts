import test, { expect } from '@playwright/test';
import { apiConfig, USER_LOGIN, USER_PASSWORD } from 'config';
import { STATUS_CODES } from 'data';
import { loginSchema } from 'data/schemas';
import { validateSchema } from 'utils/validations';

test.describe('[API] [Sales Portal] [Login]', () => {
  test('Should login with valid credentials', async ({ request }) => {
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        'content-type': 'application/json',
      },
    });

    const responseBody = await loginResponse.json();
    const headers = loginResponse.headers();
    const token = headers['authorization'];
    const status = loginResponse.status();

    validateSchema(loginSchema, responseBody);
    expect.soft(status).toBe(STATUS_CODES.OK);
    expect.soft(token).toBeTruthy();
  });
});
