import { SalesRecord, SalesMetrics, ChartData, TimeSeriesData } from '../types/sales';

export const calculateMetrics = (records: SalesRecord[]): SalesMetrics => {
  if (records.length === 0) {
    return {
      totalRevenue: 0,
      totalProfit: 0,
      totalOrders: 0,
      avgOrderValue: 0,
      profitMargin: 0,
      topProduct: 'N/A',
      topRegion: 'N/A',
      growthRate: 0,
    };
  }

  const totalRevenue = records.reduce((sum, r) => sum + r.revenue, 0);
  const totalProfit = records.reduce((sum, r) => sum + r.profit, 0);
  const totalOrders = records.length;
  const avgOrderValue = totalRevenue / totalOrders;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const productRevenue = new Map<string, number>();
  records.forEach(r => {
    productRevenue.set(r.product, (productRevenue.get(r.product) || 0) + r.revenue);
  });
  const topProduct = Array.from(productRevenue.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const regionRevenue = new Map<string, number>();
  records.forEach(r => {
    regionRevenue.set(r.region, (regionRevenue.get(r.region) || 0) + r.revenue);
  });
  const topRegion = Array.from(regionRevenue.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const sortedByDate = [...records].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const midPoint = Math.floor(sortedByDate.length / 2);
  const firstHalfRevenue = sortedByDate.slice(0, midPoint).reduce((sum, r) => sum + r.revenue, 0);
  const secondHalfRevenue = sortedByDate.slice(midPoint).reduce((sum, r) => sum + r.revenue, 0);
  const growthRate = firstHalfRevenue > 0
    ? ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100
    : 0;

  return {
    totalRevenue,
    totalProfit,
    totalOrders,
    avgOrderValue,
    profitMargin,
    topProduct,
    topRegion,
    growthRate,
  };
};

export const getTopProducts = (records: SalesRecord[], limit = 5): ChartData[] => {
  const productData = new Map<string, number>();

  records.forEach(r => {
    productData.set(r.product, (productData.get(r.product) || 0) + r.revenue);
  });

  return Array.from(productData.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
};

export const getCategoryDistribution = (records: SalesRecord[]): ChartData[] => {
  const categoryData = new Map<string, number>();

  records.forEach(r => {
    categoryData.set(r.category, (categoryData.get(r.category) || 0) + r.revenue);
  });

  return Array.from(categoryData.entries())
    .map(([label, value]) => ({ label, value }));
};

export const getRegionalSales = (records: SalesRecord[]): ChartData[] => {
  const regionData = new Map<string, number>();

  records.forEach(r => {
    regionData.set(r.region, (regionData.get(r.region) || 0) + r.revenue);
  });

  return Array.from(regionData.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));
};

export const getTimeSeriesData = (records: SalesRecord[]): TimeSeriesData[] => {
  const dateData = new Map<string, number>();

  records.forEach(r => {
    try {
      const parsedDate = new Date(r.date);
      if (!isNaN(parsedDate.getTime())) {
        const date = parsedDate.toISOString().split('T')[0];
        dateData.set(date, (dateData.get(date) || 0) + r.revenue);
      }
    } catch (e) {
      // Skip invalid dates
    }
  });

  return Array.from(dateData.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, value]) => ({ date, value }));
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
