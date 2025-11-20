import { ChartData } from '../types/sales';

interface BarChartProps {
  data: ChartData[];
  title: string;
  color?: string;
}

export const BarChart = ({ data, title, color = '#3b82f6' }: BarChartProps) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 truncate mr-4">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                  ${item.value.toLocaleString()}
                </span>
              </div>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}40`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
