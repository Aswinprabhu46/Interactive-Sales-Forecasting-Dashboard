export interface SalesRecord {
  id: string;
  date: string;
  product: string;
  category: string;
  region: string;
  quantity: number;
  revenue: number;
  cost: number;
  profit: number;
  customer_type?: string;
}

export interface SalesMetrics {
  totalRevenue: number;
  totalProfit: number;
  totalOrders: number;
  avgOrderValue: number;
  profitMargin: number;
  topProduct: string;
  topRegion: string;
  growthRate: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  category?: string;
}
