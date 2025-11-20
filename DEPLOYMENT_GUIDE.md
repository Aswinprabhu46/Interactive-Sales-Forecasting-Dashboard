# Sales Analytics Dashboard - Vercel Deployment Guide

## Available Sample CSV Files

Your project includes 3 ready-to-use sample datasets:

1. **sample-sales-data.csv** - 50 rows of diverse electronics sales (50 days)
2. **retail-sales-data.csv** - 50 rows of detailed tech products (Laptops, Monitors, etc.)
3. **ecommerce-sales-data.csv** - 35 rows of apparel sales (Shoes, Jackets, Jeans, etc.)
4. **quarterly-business-data.csv** - 20 rows of SaaS software pricing tiers

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Node.js installed locally

## Step-by-Step Deployment to Vercel

### 1. Push Your Project to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Sales Analytics Dashboard"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/sales-analytics-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI (Easiest)**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (answer prompts)
vercel

# For production deployment
vercel --prod
```

**Option B: Using Vercel Dashboard (Web UI)**

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Select your `sales-analytics-dashboard` repository
5. Click "Import"
6. Leave default settings as is
7. Click "Deploy"

### 3. Environment Variables (If Using Supabase in Future)

If you plan to add Supabase integration later:

1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 4. Verify Deployment

Your dashboard will be live at:
```
https://your-project-name.vercel.app
```

## How to Use the Dashboard

### Uploading Sample Data

1. Open your deployed dashboard
2. Drag & drop any CSV file into the upload area
3. The dashboard will instantly:
   - Parse the data
   - Calculate all metrics
   - Display interactive visualizations
   - Show regional breakdowns
   - Display trends

### Available CSV Files

Download and use any of these files:

- **sample-sales-data.csv** - General widgets/gadgets data
- **retail-sales-data.csv** - Computer hardware & peripherals
- **ecommerce-sales-data.csv** - Clothing and apparel
- **quarterly-business-data.csv** - SaaS subscription plans

## CSV Format Reference

Your CSV must have these columns (in any order):
```
date, product, category, region, quantity, revenue, cost, profit
```

Example row:
```
2024-01-15,Widget A,Electronics,North,50,5000,3000,2000
```

## Features Available

Once deployed, you can:

- **Upload** CSV files (up to 10MB)
- **View** real-time KPI metrics
- **Filter** data by:
  - Category
  - Region
  - Product
  - Date Range
- **Visualize** with:
  - Line charts (sales trends)
  - Bar charts (top products, regions)
  - Pie charts (category distribution)
  - Data tables with sorting
- **Export** filtered data back to CSV

## Performance Tips

- Dashboard loads in ~2-3 seconds
- Handles up to 10,000 rows smoothly
- All calculations happen client-side (no server needed)
- Fully responsive on mobile/tablet/desktop

## Troubleshooting

**Dashboard not loading?**
- Clear browser cache (Cmd+Shift+Delete)
- Try different browser
- Check internet connection

**CSV upload not working?**
- Verify CSV format matches requirements
- Check file size is under 10MB
- Ensure no special characters in column names

**Charts not displaying?**
- Make sure data has valid dates, products, categories, regions
- Try with one of the sample datasets first

## Next Steps

- Add more historical data
- Create custom CSV files for your business
- Monitor analytics trends over time
- Plan based on forecasted patterns

## Support

For issues, check:
- CSV format is correct
- All required columns are present
- No missing values in critical fields
