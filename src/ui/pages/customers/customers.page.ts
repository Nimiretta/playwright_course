import { customersSortField, ICustomerInTable } from 'types';
import { SalesPortalPage } from '../salesPortal.page';
import { DeleteCustomerModal, FilterModal } from '../modals';
import { COUNTRIES } from 'data/customers';

export class CustomersPage extends SalesPortalPage {
  // Modals
  readonly filterModal = new FilterModal(this.page);
  readonly deleteModal = new DeleteCustomerModal(this.page);

  // Header menu
  readonly addNewCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });
  readonly filterButton = this.page.getByRole('button', { name: 'Filter' });
  readonly searchInput = this.page.locator('input[type="search"]');
  readonly searchButton = this.page.locator('#search-customer');
  readonly chipButton = this.page.locator('.chip');
  readonly searchChipButton = this.page.locator('div[data-chip-customers="search"]');

  // Table
  readonly table = this.page.locator('#table-customers');

  // Table headers
  readonly tableHeader = this.page.locator('#table-customers th div');
  readonly emailHeader = this.tableHeader.filter({ hasText: 'Email' });
  readonly nameHeader = this.tableHeader.filter({ hasText: 'Name' });
  readonly countryHeader = this.tableHeader.filter({ hasText: 'Country' });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: 'Created On' });

  // Table Body
  readonly tableRow = this.page.locator('#table-customers tbody tr');
  readonly tableRowByEmail = (email: string) => this.tableRow.filter({ has: this.page.getByText(email) });

  readonly emailCell = (email: string) => this.tableRowByEmail(email).locator('td').nth(1);
  readonly nameCell = (email: string) => this.tableRowByEmail(email).locator('td').nth(2);
  readonly countryCell = (email: string) => this.tableRowByEmail(email).locator('td').nth(3);
  readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator('td').nth(4);
  readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle('Edit');
  readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle('Details');
  readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle('Delete');
  readonly emptyTableRow = this.page.locator('td.fs-italic');

  readonly uniqueElement = this.addNewCustomerButton;

  async open() {
    await this.page.evaluate(async () => {
      await (window as typeof window & { renderCustomersPage: () => Promise<void> }).renderCustomersPage();
    });
  }

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async clickFilter() {
    await this.filterButton.click();
  }

  async clickTableAction(customerEmail: string, action: 'edit' | 'details' | 'delete') {
    const buttons = {
      edit: this.editButton(customerEmail),
      details: this.detailsButton(customerEmail),
      delete: this.deleteButton(customerEmail),
    };

    await buttons[action].click();
  }

  async getCustomerData(customerEmail: string): Promise<ICustomerInTable> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [email, name, country, createdOn] = await this.tableRowByEmail(customerEmail).locator('td').allInnerTexts();
    return {
      email,
      name,
      country: country as COUNTRIES,
      //createdOn
    };
  }

  async getTableData() {
    const tableData: Array<ICustomerInTable> = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [email, name, country, createdOn] = await row.locator('td').allInnerTexts();
      tableData.push({
        email,
        name,
        country: country as COUNTRIES,
        // createdOn
      });
    }
    return tableData;
  }

  async isCustomerInTable(customerEmail: string): Promise<boolean> {
    return (await this.tableRowByEmail(customerEmail).count()) > 0;
  }

  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value));
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async search(value: string | number) {
    await this.fillSearch(value);
    await this.clickSearch();
    await this.waitForOpened();
  }

  async clickTableHeader(header: customersSortField) {
    switch (header) {
      case 'email':
        await this.emailHeader.click();
        break;
      case 'name':
        await this.nameHeader.click();
        break;
      case 'country':
        await this.countryHeader.click();
        break;
      case 'createdOn':
        await this.createdOnHeader.click();
        break;
    }
  }

  // async parseCustomersTable(): Promise<ICustomerTableRow[]> {
  //   const table = this.page.locator('#table-customers');
  //   const headers = await table.locator('thead th').allInnerTexts();
  //   headers.pop();

  //   const rows = await table.locator('tbody tr').all();

  //   const actualTableData = await Promise.all(
  //     rows.map(async (row) => {
  //       const cellTexts = await row.locator('td').allInnerTexts();
  //       cellTexts.pop();

  //       return cellTexts.reduce(
  //         (rowObject, cell, index) => {
  //           rowObject[headers[index]] = cell;
  //           return rowObject;
  //         },
  //         {} as Record<string, string>,
  //       );
  //     }),
  //   );

  //   return actualTableData as unknown as ICustomerTableRow[];
  // }
}
