import { useState, useMemo, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Percent,
  BarChart3,
  Download,
  Trash2,
} from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { MetricCard } from './components/MetricCard';
import { BarChart } from './components/BarChart';
import { PieChart } from './components/PieChart';
import { LineChart } from './components/LineChart';
import { FilterPanel, FilterState } from './components/FilterPanel';
import { DataTable } from './components/DataTable';
import { SalesRecord } from './types/sales';
import { parseCSV, validateCSV } from './utils/csvParser';
import {
  calculateMetrics,
  getTopProducts,
  getCategoryDistribution,
  getRegionalSales,
  getTimeSeriesData,
  formatCurrency,
  formatNumber,
} from './utils/analytics';
import { saveSalesRecords, fetchAllSalesRecords, deleteAllRecords } from './services/supabaseService';

function App() {
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    region: 'all',
    product: 'all',
    dateRange: 'all',
  });

  useEffect(() => {
    loadSalesData();
  }, []);

  const loadSalesData = async () => {
    try {
      const records = await fetchAllSalesRecords();
      setSalesData(records);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const csvText = await validateCSV(file);
      const records = parseCSV(csvText);

      if (records.length === 0) {
        throw new Error(
          'No valid records found. Please ensure your CSV has the required columns: date, product, category, region, revenue'
        );
      }

      await saveSalesRecords(records, file.name);

      const allRecords = await fetchAllSalesRecords();
      setSalesData(allRecords);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setSalesData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAllData = async () => {
    if (window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
      try {
        setIsLoading(true);
        await deleteAllRecords();
        setSalesData([]);
        setError(null);
      } catch (err) {
        setError('Failed to clear data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredData = useMemo(() => {
    return salesData.filter((record) => {
      if (filters.category !== 'all' && record.category !== filters.category)
        return false;
      if (filters.region !== 'all' && record.region !== filters.region)
        return false;
      if (filters.product !== 'all' && record.product !== filters.product)
        return false;

      if (filters.dateRange !== 'all') {
        const recordDate = new Date(record.date);
        if (isNaN(recordDate.getTime())) return false;
        const now = new Date();
        const daysAgo = parseInt(filters.dateRange);
        const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        if (recordDate < cutoffDate) return false;
      }

      return true;
    });
  }, [salesData, filters]);

  const metrics = useMemo(() => calculateMetrics(filteredData), [filteredData]);
  const topProducts = useMemo(() => getTopProducts(filteredData), [filteredData]);
  const categoryData = useMemo(
    () => getCategoryDistribution(filteredData),
    [filteredData]
  );
  const regionalData = useMemo(() => getRegionalSales(filteredData), [filteredData]);
  const timeSeriesData = useMemo(
    () => getTimeSeriesData(filteredData),
    [filteredData]
  );

  const uniqueCategories = useMemo(
    () => Array.from(new Set(salesData.map((r) => r.category))),
    [salesData]
  );
  const uniqueRegions = useMemo(
    () => Array.from(new Set(salesData.map((r) => r.region))),
    [salesData]
  );
  const uniqueProducts = useMemo(
    () => Array.from(new Set(salesData.map((r) => r.product))),
    [salesData]
  );

  const exportData = () => {
    const csv = [
      ['Date', 'Product', 'Category', 'Region', 'Quantity', 'Revenue', 'Profit'].join(','),
      ...filteredData.map((r) =>
        [
          r.date,
          r.product,
          r.category,
          r.region,
          r.quantity,
          r.revenue,
          r.profit,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sales Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Upload your sales data to analyze trends and forecast future performance
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>

        {salesData.length === 0 ? (
          <div className="max-w-2xl mx-auto mt-12">
            <FileUpload
              onFileUpload={handleFileUpload}
              isLoading={isLoading}
              error={error}
            />
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Expected CSV Format
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                Your CSV file should include the following columns:
              </p>
              <div className="bg-white rounded-lg p-4 font-mono text-xs overflow-x-auto">
                <div className="text-gray-600">
                  date, product, category, region, quantity, revenue, cost, profit
                </div>
                <div className="text-gray-400 mt-2">
                  2024-01-15, Widget A, Electronics, North, 50, 5000, 3000, 2000
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FilterPanel
                  categories={uniqueCategories}
                  regions={uniqueRegions}
                  products={uniqueProducts}
                  onFilterChange={setFilters}
                  activeFilters={filters}
                />
                <button
                  onClick={exportData}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span className="text-sm font-medium">Export Data</span>
                </button>
                <button
                  onClick={handleClearAllData}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Clear All</span>
                </button>
              </div>
              <div className="text-sm text-gray-600">
                Showing <span className="font-bold">{filteredData.length}</span> of{' '}
                <span className="font-bold">{salesData.length}</span> records
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Revenue"
                value={formatCurrency(metrics.totalRevenue)}
                icon={DollarSign}
                trend={metrics.growthRate}
                color="blue"
              />
              <MetricCard
                title="Total Profit"
                value={formatCurrency(metrics.totalProfit)}
                icon={TrendingUp}
                subtitle={`Margin: ${formatNumber(metrics.profitMargin)}%`}
                color="green"
              />
              <MetricCard
                title="Total Orders"
                value={metrics.totalOrders.toLocaleString()}
                icon={ShoppingCart}
                subtitle={`Avg: ${formatCurrency(metrics.avgOrderValue)}`}
                color="orange"
              />
              <MetricCard
                title="Profit Margin"
                value={`${formatNumber(metrics.profitMargin)}%`}
                icon={Percent}
                subtitle={`Top: ${metrics.topProduct}`}
                color="purple"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <LineChart data={timeSeriesData} title="Sales Trend Over Time" />
              <BarChart
                data={topProducts}
                title="Top 5 Products by Revenue"
                color="#3b82f6"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <PieChart data={categoryData} title="Revenue by Category" />
              <BarChart
                data={regionalData}
                title="Regional Sales Performance"
                color="#10b981"
              />
            </div>

            <DataTable data={filteredData} limit={20} />

            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Top Performing Product
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {metrics.topProduct}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-1">
                    Best Region
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {metrics.topRegion}
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-900 mb-1">
                    Average Order Value
                  </p>
                  <p className="text-lg font-bold text-orange-600">
                    {formatCurrency(metrics.avgOrderValue)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900 mb-1">
                    Growth Rate
                  </p>
                  <p className="text-lg font-bold text-purple-600">
                    {metrics.growthRate >= 0 ? '+' : ''}
                    {formatNumber(metrics.growthRate)}%
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
