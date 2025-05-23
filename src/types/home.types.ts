export type ModuleName = 'Customers' | 'Products' | 'Orders';

export interface IMainMetricsValues {
  ordersThisYear: number;
  newCustomers: number;
  canceledOrders: number;
  totalRevenue: string;
  avgOrderValue: string;
}
