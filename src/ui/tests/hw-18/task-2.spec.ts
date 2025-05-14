import test, { expect } from '@playwright/test';

const userData = {
  fullName: {
    firstName: 'John',
    lastName: 'Doe',
  },
  email: 'test@test.com',
  address: '123 Main St',
  phone: '+12025463745',
  country: 'USA',
  gender: 'male',
  hobbies: ['Travelling', 'Gaming'],
  language: 'English',
  skills: ['JavaScript', 'Python'],
  dateOfBirth: {
    year: '1990',
    month: 'June',
    day: '15',
  },
  password: 'Password!123',
};

test('[UI] [demo-registration-form] [Smoke] Register with valid data', async ({ page }) => {
  const expected = {
    fullName: `${userData.fullName.firstName} ${userData.fullName.lastName}`,
    address: userData.address,
    email: userData.email,
    phone: userData.phone,
    country: userData.country,
    gender: userData.gender,
    language: userData.language,
    skills: userData.skills.join(', '),
    hobbies: userData.hobbies.join(', '),
    dateOfBirth: `${userData.dateOfBirth.day} ${userData.dateOfBirth.month} ${userData.dateOfBirth.year}`,
    password: {
      length: userData.password.length,
      isMasked: true,
    },
  };
  const { fullName, dateOfBirth, ...rest } = userData;
  const expectedInStorage = { ...rest, ...fullName, ...dateOfBirth };

  await page.goto('https://anatoly-karpovich.github.io/demo-registration-form/');
  await page.locator('#firstName').fill(userData.fullName.firstName);
  await page.locator('#lastName').fill(userData.fullName.lastName);
  await page.locator('#address').fill(userData.address);
  await page.locator('#email').fill(userData.email);
  await page.locator('#phone').fill(userData.phone);
  await page.locator('#country').selectOption(userData.country);
  await page.locator(`//input[@name='gender' and @value='${userData.gender}']`).check();
  for (const hobby of userData.hobbies) {
    await page.locator(`//input[@class='hobby' and @value='${hobby}']`).check();
  }
  await page.locator('#language').fill(userData.language);
  await page.locator('#skills').selectOption(userData.skills);
  for (const [id, value] of Object.entries(userData.dateOfBirth)) {
    await page.locator(`#${id}`).selectOption(value);
  }
  await page.locator('#password').fill(userData.password);
  await page.locator('#password-confirm').fill(userData.password);
  await page.locator('//button[.="Submit"]').click();

  await page.waitForSelector('#fullName');
  const title = await page.locator('h2').innerText();
  const actual = {
    fullName: await page.locator('#fullName').innerText(),
    address: await page.locator('#address').innerText(),
    email: await page.locator('#email').innerText(),
    phone: await page.locator('#phone').innerText(),
    country: await page.locator('#country').innerText(),
    gender: await page.locator('#gender').innerText(),
    language: await page.locator('#language').innerText(),
    skills: await page.locator('#skills').innerText(),
    hobbies: await page.locator('#hobbies').innerText(),
    dateOfBirth: await page.locator('#dateOfBirth').innerText(),
    password: {
      length: (await page.locator('#password').innerText()).length,
      isMasked: /^\*+$/.test(await page.locator('#password').innerText()),
    },
  };
  const storedObject = await page.evaluate(() => {
    const formData = localStorage.getItem('formData');
    return formData ? JSON.parse(formData) : null;
  });

  await expect(title).toBe('Registration Details');
  await expect(actual).toEqual(expected);
  await expect(storedObject).toEqual(expectedInStorage);
});
