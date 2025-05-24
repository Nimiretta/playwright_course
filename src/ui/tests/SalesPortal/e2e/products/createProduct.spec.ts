import { STATUS_CODES } from 'data';
import { test, expect } from 'fixtures';

test.describe('[E2E] [UI] [Products] [Create]', () => {
  let id = '';
  let token = '';
  test('Create product with smoke data', async ({
    signInUIService,
    homeUIService,
    productsUIService,
    addNewProductUIService,
    productsController,
  }) => {
    token = await signInUIService.signInAsLocalUser();
    await homeUIService.openModule('Products');
    await productsUIService.openAddPage();
    const createdProduct = await addNewProductUIService.create();
    const response = await productsController.getById(createdProduct._id, token);
    id = createdProduct._id;
    expect(response.status).toBe(STATUS_CODES.OK);
  });

  test.afterEach(async ({ productsController }) => {
    await productsController.delete(id, token);
  });
});
