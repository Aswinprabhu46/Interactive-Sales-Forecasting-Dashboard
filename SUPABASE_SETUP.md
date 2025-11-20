# Supabase Integration Setup Guide

Your Sales Analytics Dashboard is now fully connected to Supabase with real-time data persistence!

## What Was Set Up

### Database Tables
1. **sales_records** - Stores all uploaded sales data
   - Columns: date, product, category, region, quantity, revenue, cost, profit
   - Indexed for fast queries on date, region, category, product

2. **data_uploads** - Tracks file uploads
   - Logs filename, record count, and upload timestamp
   - Helps maintain upload history

### Security
- Row Level Security (RLS) enabled on all tables
- All users can view and insert data (public analytics)
- Indexed queries for optimal performance

## How to View Your Project in Supabase

### Step 1: Go to Supabase Dashboard
1. Open [https://app.supabase.com](https://app.supabase.com)
2. Log in with your credentials

### Step 2: Select Your Project
- Look for your project name in the left sidebar
- Your project is connected to this dashboard

### Step 3: View Your Tables
1. In the left sidebar, click **SQL Editor** or **Database**
2. You'll see your two tables:
   - `sales_records`
   - `data_uploads`

### Step 4: View Your Data
1. Click on `sales_records` to see all uploaded data
2. Click on `data_uploads` to see upload history
3. All data syncs in real-time as you upload CSVs

## How the Integration Works

### Upload Flow
1. You upload a CSV file in the dashboard
2. File is parsed and validated locally
3. Records are saved to Supabase `sales_records` table
4. Upload is logged in `data_uploads` table
5. Dashboard fetches and displays all data
6. Dashboard automatically reloads on every upload

### Real-Time Features
- **On App Load**: Dashboard fetches all records from Supabase
- **On Upload**: New records are saved and fetched automatically
- **On Export**: You can download your Supabase data as CSV
- **On Clear All**: All records can be wiped from the database

## Features Now Available

### Database-Backed Analytics
- Data persists across sessions
- Multiple uploads accumulate in the database
- Historical data is retained
- Export combines all uploaded records

### Upload Tracking
- View all previous file uploads
- See record counts per upload
- Track upload timestamps

### Data Management
- Clear all data when needed
- Export everything as CSV
- Filter across entire database

## Using Your Dashboard Now

1. **First Upload**: Upload any CSV file
   - Data is saved to Supabase
   - Dashboard displays it immediately

2. **Multiple Uploads**: Keep uploading CSVs
   - All data accumulates
   - Dashboard shows combined analytics

3. **Check Supabase**:
   - Go to supabase.com
   - See your records in real-time
   - Monitor upload history

4. **Export**: Download all your accumulated data as CSV

## Environment Variables

Your dashboard uses:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Public API key

These are already configured in `.env`

## Accessing Supabase Console

### SQL Queries
Run custom SQL queries in **SQL Editor**:
```sql
-- Get top products
SELECT product, SUM(revenue) as total_revenue
FROM sales_records
GROUP BY product
ORDER BY total_revenue DESC;

-- Get sales by region
SELECT region, SUM(revenue) as total_revenue
FROM sales_records
GROUP BY region;

-- Get upload history
SELECT file_name, record_count, uploaded_at
FROM data_uploads
ORDER BY uploaded_at DESC;
```

### Monitoring
- Go to **Database** → **Backups** to see data safety
- Go to **Monitoring** to see API usage
- Go to **Settings** to manage security

## Deployment

When deployed to Vercel:
1. Environment variables are already set in `.env`
2. Vercel reads them automatically
3. Your live dashboard connects to Supabase
4. Data persists across all users
5. All data is encrypted in transit and at rest

## Troubleshooting

**I don't see my tables in Supabase:**
- Go to Database → Tables
- Tables may not show in navigation, but query them in SQL Editor
- Check the migration ran successfully

**Data not saving:**
- Check browser console for errors
- Verify Supabase credentials in `.env`
- Ensure RLS policies are not blocking writes

**Can't access dashboard:**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`
- Restart the dev server
- Clear browser cache

## What's Next

Now you can:
- Upload multiple CSV files
- Build historical analytics
- Export combined data
- Monitor trends over time
- Deploy to production

Your dashboard is production-ready with full data persistence!
