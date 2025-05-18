import { ICustomerTableRow } from 'types';
import { SalesPortalPage } from '../salesPortal.page';

export class CustomersPage extends SalesPortalPage {
  readonly addNewCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async parseCustomersTable(): Promise<ICustomerTableRow[]> {
    const table = this.page.locator('#table-customers');
    const headers = await table.locator('thead th').allInnerTexts();
    headers.pop();

    const rows = await table.locator('tbody tr').all();

    const actualTableData = await Promise.all(
      rows.map(async (row) => {
        const cellTexts = await row.locator('td').allInnerTexts();
        cellTexts.pop();

        return cellTexts.reduce(
          (rowObject, cell, index) => {
            rowObject[headers[index]] = cell;
            return rowObject;
          },
          {} as Record<string, string>,
        );
      }),
    );

    return actualTableData as unknown as ICustomerTableRow[];
  }
}
