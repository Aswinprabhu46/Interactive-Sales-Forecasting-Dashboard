import { TimeSeriesData } from '../types/sales';
import { useMemo } from 'react';

interface LineChartProps {
  data: TimeSeriesData[];
  title: string;
}

export const LineChart = ({ data, title }: LineChartProps) => {
  const { points, maxValue, minValue, xLabels } = useMemo(() => {
    if (data.length === 0) {
      return { points: '', maxValue: 0, minValue: 0, xLabels: [] };
    }

    const values = data.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;

    const width = 600;
    const height = 200;
    const padding = 20;

    const pointsData = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((d.value - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });

    const step = Math.ceil(data.length / 6);
    const labels = data
      .filter((_, i) => i % step === 0 || i === data.length - 1)
      .map((d, i) => ({
        date: new Date(d.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        x: padding + (i * step / (data.length - 1)) * (width - 2 * padding),
      }));

    return {
      points: pointsData.join(' '),
      maxValue: max,
      minValue: min,
      xLabels: labels,
    };
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div className="relative">
        <svg viewBox="0 0 600 240" className="w-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((i) => {
            const y = 20 + (i * 180) / 4;
            return (
              <line
                key={i}
                x1="20"
                y1={y}
                x2="580"
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            );
          })}

          <polyline
            points={`20,220 ${points} 580,220`}
            fill="url(#lineGradient)"
            stroke="none"
          />

          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-700"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))',
            }}
          />

          {data.map((d, i) => {
            const x = 20 + (i / (data.length - 1)) * 560;
            const range = maxValue - minValue || 1;
            const y = 220 - ((d.value - minValue) / range) * 180;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="white"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  className="transition-all duration-300 hover:r-7"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#3b82f6"
                />
              </g>
            );
          })}

          {xLabels.map((label, i) => (
            <text
              key={i}
              x={label.x}
              y="235"
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {label.date}
            </text>
          ))}
        </svg>

        <div className="absolute top-0 right-0 text-right">
          <p className="text-xs text-gray-500">Peak</p>
          <p className="text-lg font-bold text-gray-900">
            ${maxValue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
