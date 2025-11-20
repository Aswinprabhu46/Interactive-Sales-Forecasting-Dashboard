# Sales Analytics Dashboard

A real-time, interactive sales analytics dashboard built with React, TypeScript, Tailwind CSS, and Vite. Upload CSV files to instantly analyze sales trends, metrics, and performance across regions and products.

## Features

- **Real-time Data Upload**: Drag & drop CSV files for instant analysis
- **Interactive Visualizations**:
  - Line charts for sales trends over time
  - Bar charts for top products and regional performance
  - Pie charts for category distribution
  - Data tables with sorting
  
- **Advanced Filtering**:
  - Filter by category, region, product, and date range
  - Real-time metric recalculation

- **Key Metrics**:
  - Total Revenue & Profit
  - Profit Margin Analysis
  - Average Order Value
  - Growth Rate Calculation
  - Top Product & Region Insights

- **Data Export**: Export filtered data back to CSV

- **Responsive Design**: Works on desktop, tablet, and mobile

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

## CSV Format

Your CSV file must include these columns:
```
date, product, category, region, quantity, revenue, cost, profit
```

Example:
```
2024-01-15,Widget A,Electronics,North,50,5000,3000,2000
```

## Sample Data Files

Three ready-to-use CSV files are included:

1. **sample-sales-data.csv** (50 rows) - Diverse electronics sales
2. **retail-sales-data.csv** (50 rows) - Tech products (Laptops, Monitors, etc.)
3. **ecommerce-sales-data.csv** (35 rows) - Apparel sales
4. **quarterly-business-data.csv** (20 rows) - SaaS subscription tiers

## Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or push to GitHub and connect to Vercel dashboard for automatic deployments.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Charts**: React with SVG visualizations

## Project Structure

```
src/
├── components/        # React components
│   ├── BarChart.tsx
│   ├── LineChart.tsx
│   ├── PieChart.tsx
│   ├── MetricCard.tsx
│   ├── FileUpload.tsx
│   ├── FilterPanel.tsx
│   └── DataTable.tsx
├── utils/            # Utility functions
│   ├── analytics.ts   # Data calculations
│   └── csvParser.ts   # CSV parsing logic
├── types/            # TypeScript interfaces
│   └── sales.ts
└── App.tsx           # Main component
```

## How It Works

1. **Upload CSV**: Drag & drop or click to upload a CSV file
2. **Parse Data**: CSV is parsed and validated
3. **Analyze**: Metrics and visualizations are calculated in real-time
4. **Filter**: Apply filters to drill into specific data
5. **Export**: Download analyzed data back to CSV

## Error Handling

- Invalid date formats are skipped
- Missing required columns trigger helpful error messages
- File size limited to 10MB
- Empty files are rejected

## Performance

- Handles up to 10,000 rows smoothly
- All calculations happen client-side
- No backend required
- Instant filtering and updates

## Future Enhancements

- Database integration for data persistence
- Multi-file comparison
- Advanced forecasting
- Custom report generation
- Data sharing & collaboration
