import test, { expect, Page } from '@playwright/test';

test.describe('[UI] [Demo Shopping Cart] [E2E]', () => {
  test('Succesfull checkout with promo codes', async ({ page }) => {
    const productsToAdd = ['Product 2', 'Product 4', 'Product 6', 'Product 8', 'Product 10'];
    const promoCodes = [
      'HelloThere',
      'HOT-COURSE',
      '10-PERCENT-FOR-REDEEM',
      '5-PERCENT-FOR-UTILS',
      '15-PERCENT-FOR-CSS',
      'JAVA-FOR-BOOMERS',
      'NO-PYTHON',
    ];
    const discountPercent = 75;

    await page.goto('https://anatoly-karpovich.github.io/demo-shopping-cart/');

    for (const product of productsToAdd) {
      await addToCard(`${product}`, page);
    }

    let expectedTotalPrice = 0;
    for (const product of productsToAdd) {
      const productPrice = await getProductPrice(product, page);
      expectedTotalPrice += productPrice;
    }
    const expectedDiscountedPrice = (expectedTotalPrice - (expectedTotalPrice * discountPercent) / 100).toFixed(2);

    await expect(page.locator('#badge-number')).toHaveText('5');

    await page.locator('#shopping-cart-btn').click();
    await expect(page.locator('#total-price')).toHaveText(`$${expectedTotalPrice}.00`);
    const productsInCart = await getAllProductsInCartWithAmount(page);
    const productsInCartNames = getAllProductsInCartNames(productsInCart);
    expect(productsInCartNames).toEqual(productsToAdd);
    expect(validateProductAmounts(productsInCart), 'All products should have amount 1').toBeTruthy();

    for (const promoCode of promoCodes) {
      await page.locator('#rebate-input').fill(promoCode);
      await page.locator('#apply-promocode-button').click();
      await page.locator('#rebates-container').getByText(promoCode).waitFor({ state: 'visible', timeout: 5000 });
    }
    const actualDiscountedPrice = (await page.locator('#total-price').innerText()).split('(')[0].trim();
    expect(actualDiscountedPrice).toBe(`$${expectedDiscountedPrice}`);

    await page.locator('#continue-to-checkout-button').click();
    await expect(page.locator('.text-muted')).toHaveText(`$${expectedDiscountedPrice}`);
  });
});

interface ProductInCart {
  name: string;
  amount: string;
}

async function addToCard(productName: string, page: Page) {
  await page
    .locator('div.card-body')
    .filter({
      has: page.getByText(productName, { exact: true }),
    })
    .getByRole('button', { name: 'Add to card' })
    .click();
}

function getProductPriceSpan(productName: string, page: Page) {
  return page
    .locator('div.card-body')
    .filter({
      has: page.getByText(productName, { exact: true }),
    })
    .locator('span');
}

async function getProductPrice(productName: string, page: Page): Promise<number> {
  const productPriceSpan = getProductPriceSpan(productName, page);
  const priceText = await productPriceSpan.innerText();
  const price = priceText.replace('$', '');
  return +price;
}

async function getAllProductsInCartWithAmount(page: Page): Promise<ProductInCart[]> {
  const productLocators = await page.locator('//li[@data-product-li]').all();
  const products = [];
  for (const productLocator of productLocators) {
    const product = {
      name: await productLocator.locator('h5').innerText(),
      amount: await productLocator.locator('//span[@data-id="product-amount-in-shopping-cart"]').innerText(),
    };
    products.push(product);
  }
  return products;
}

function getAllProductsInCartNames(products: ProductInCart[]): string[] {
  return products.map((product) => product.name);
}

function validateProductAmounts(products: ProductInCart[]): boolean {
  return products.every((product) => product.amount === '1');
}
