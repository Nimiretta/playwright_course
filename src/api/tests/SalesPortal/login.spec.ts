import { test, expect } from 'fixtures';
import { USER_LOGIN, USER_PASSWORD } from 'config';
import { STATUS_CODES } from 'data';
import { loginSchema } from 'data/schemas';
import { validateResponse, validateSchema } from 'utils/validations';

test.describe('[API] [Sales Portal] [Login]', () => {
  test('Should login with valid credentials', async ({ signInController }) => {
    const loginResponse = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });

    const responseBody = loginResponse.body;
    const headers = loginResponse.headers;
    const token = headers['authorization'];

    validateSchema(loginSchema, responseBody);
    validateResponse(loginResponse, STATUS_CODES.OK, true, null);
    expect.soft(token).toBeTruthy();
  });
});
