import test, { BrowserContext, expect, Page } from '@playwright/test';

interface IRegistrationTestData {
  testName: string;
  username: string;
  password: string;
  message: string;
}

const registrationInvalidTestData: IRegistrationTestData[] = [
  {
    testName: 'Should not register without username and password',
    username: '',
    password: '',
    message: 'Please, provide valid data',
  },
  {
    testName: 'Should not register with empty username',
    username: '',
    password: 'ValidPassw0rd',
    message: 'Username is required',
  },
  {
    testName: 'Should not register with username < 3 chars',
    username: 'Va',
    password: 'ValidPassw0rd',
    message: 'Username should contain at least 3 characters',
  },
  {
    testName: 'Should not register with username > 40 chars',
    username: 'I_amIncrediblyLongUserName with-41-chars!',
    password: 'ValidPassw0rd',
    message: "Username can't exceed 40 characters",
  },
  {
    testName: 'Should not register with existing username',
    username: 'Existing Name',
    password: 'ValidPassw0rd',
    message: 'Username is in use',
  },
  {
    testName: 'Should not register with username with prefix spaces',
    username: ' Name',
    password: 'ValidPassw0rd',
    message: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    testName: 'Should not register with username with postfix spaces',
    username: 'Name ',
    password: 'ValidPassw0rd',
    message: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    testName: 'Should not register with username with only spaces',
    username: '    ',
    password: 'ValidPassw0rd',
    message: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    testName: 'Should not register with empty password',
    username: 'Valid Name',
    password: '',
    message: 'Password is required',
  },
  {
    testName: 'Should not register with password < 8 chars',
    username: 'Valid Name',
    password: 'Passwor',
    message: 'Password should contain at least 8 characters',
  },
  {
    testName: 'Should not register with password > 20 chars',
    username: 'Valid Name',
    password: 'I_am_Long_Password!11',
    message: "Password can't exceed 20 characters",
  },
  {
    testName: 'Should not register with password with only uppercase letters',
    username: 'Valid Name',
    password: 'PASSWORD',
    message: 'Password should contain at least one character in lower case',
  },
  {
    testName: 'Should not register with password with only lowercase letters',
    username: 'Valid Name',
    password: 'password',
    message: 'Password should contain at least one character in upper case',
  },
  {
    testName: 'Should not register with password with only spaces',
    username: 'Valid Name',
    password: '        ',
    message: 'Password is required',
  },
];

test.describe('[UI] [Demo Login Form] [Registration] Negative scenarios', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
    await page.locator('#registerOnLogin').click();
    await page.evaluate(() => window.localStorage.setItem('Existing Name', JSON.stringify({ name: 'Existing Name' })));
    await page.evaluate(() => {
      document.querySelector('#userNameOnRegister')?.removeAttribute('maxlength');
    });
    await page.evaluate(() => {
      document.querySelector('#passwordOnRegister')?.removeAttribute('maxlength');
    });
  });

  registrationInvalidTestData.forEach(({ testName, username, password, message }) => {
    test(testName, async () => {
      await page.locator('#userNameOnRegister').fill(username);
      await page.locator('#passwordOnRegister').fill(password);
      await page.locator('#register').click();
      await expect(page.locator('#errorMessageOnRegister')).toHaveText(message);
    });
  });

  test.afterAll(async () => {
    await context.close();
  });
});

const loginInvalidTestData: IRegistrationTestData[] = [
  {
    testName: 'Should not login without username and password',
    username: '',
    password: '',
    message: 'Credentials are required',
  },
  {
    testName: 'Should not login with empty username',
    username: '',
    password: 'Password',
    message: 'Username is required',
  },
  {
    testName: 'Should not login with empty password',
    username: 'ValidUser',
    password: '',
    message: 'Password is required',
  },
  {
    testName: 'Should not login with incorrect password',
    username: 'ValidUser',
    password: 'Password1',
    message: 'Invalid credentials',
  },
  {
    testName: 'Should not login with non-existing username',
    username: 'InvalidUser',
    password: 'Password',
    message: 'Invalid credentials',
  },
];

test.describe('[UI] [Demo Login Form] [Login] Negative scenarios', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://anatoly-karpovich.github.io/demo-login-form/');
    await page.evaluate(() =>
      window.localStorage.setItem('ValidUser', JSON.stringify({ name: 'ValidUser', password: 'Password' })),
    );
  });

  loginInvalidTestData.forEach(({ testName, username, password, message }) => {
    test(testName, async () => {
      await page.locator('#userName').fill(username);
      await page.locator('#password').fill(password);
      await page.locator('#submit').click();
      await expect(page.locator('#errorMessage')).toHaveText(message);
    });
  });

  test.afterAll(async () => {
    await context.close();
  });
});
