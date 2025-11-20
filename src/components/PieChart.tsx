import { ChartData } from '../types/sales';
import { useMemo } from 'react';

interface PieChartProps {
  data: ChartData[];
  title: string;
}

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
];

export const PieChart = ({ data, title }: PieChartProps) => {
  const chartData = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;

    return data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;

      return {
        ...item,
        percentage,
        startAngle,
        angle,
        color: COLORS[index % COLORS.length],
      };
    });
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 200 200" className="transform -rotate-90">
            {chartData.map((item, index) => {
              const startAngle = item.startAngle * (Math.PI / 180);
              const endAngle = (item.startAngle + item.angle) * (Math.PI / 180);
              const largeArcFlag = item.angle > 180 ? 1 : 0;

              const x1 = 100 + 80 * Math.cos(startAngle);
              const y1 = 100 + 80 * Math.sin(startAngle);
              const x2 = 100 + 80 * Math.cos(endAngle);
              const y2 = 100 + 80 * Math.sin(endAngle);

              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`,
              ].join(' ');

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={item.color}
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    style={{
                      filter: `drop-shadow(0 0 8px ${item.color}40)`,
                    }}
                  />
                </g>
              );
            })}
            <circle
              cx="100"
              cy="100"
              r="50"
              fill="white"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 truncate">{item.label}</p>
              <p className="text-sm font-bold text-gray-900">
                {item.percentage.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
