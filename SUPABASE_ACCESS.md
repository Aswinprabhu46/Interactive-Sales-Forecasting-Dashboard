# Where to Find Your Project in Supabase

## Your Supabase Project Details

Your dashboard is connected to Supabase. Here's how to access it:

### Step 1: Open Supabase
Visit: **https://app.supabase.com**

### Step 2: Navigate to Your Project
Your project is: **aubfioapojnlqvbisgmm**

In the Supabase dashboard:
1. Look at the left sidebar
2. Find your project in the list
3. Click to select it

### Step 3: View Your Tables

Once in your project:

**Option A: Using the Table Editor**
1. Click **Database** in the left menu
2. Click **Tables**
3. You'll see:
   - `sales_records` - Your sales data
   - `data_uploads` - Upload history

**Option B: Using SQL Editor**
1. Click **SQL Editor** in the left menu
2. Click **New Query**
3. Run queries like:
   ```sql
   SELECT * FROM sales_records LIMIT 10;
   SELECT * FROM data_uploads;
   ```

### Step 4: See Your Data

Once you upload a CSV in the dashboard:
- Go to `sales_records` table
- You'll see all rows with:
  - Date
  - Product
  - Category
  - Region
  - Quantity
  - Revenue
  - Cost
  - Profit

Go to `data_uploads` table to see:
- File names you uploaded
- Record counts
- Upload timestamps

## Direct Links

### Project URL
```
https://aubfioapojnlqvbisgmm.supabase.co
```

### API Documentation
```
https://aubfioapojnlqvbisgmm.supabase.co/rest/v1/
```

## Understanding the Data Flow

```
┌─────────────────────┐
│  Your Dashboard     │
│  (Upload CSV)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Parse & Validate   │
│  (Local)            │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Supabase API       │
│  (Save Records)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ sales_records Table │
│ data_uploads Table  │
└─────────────────────┘
```

## What Happens When You Upload

1. **File Selected**: CSV file validation (size, format)
2. **Parsing**: CSV converted to records locally
3. **Saving**: Records sent to Supabase
4. **Logging**: Upload tracked in data_uploads
5. **Fetching**: All records loaded from Supabase
6. **Display**: Dashboard shows updated analytics

All steps happen in seconds!

## Monitoring Your Data

### In Supabase Dashboard

1. **Real-time Sync**: Changes appear instantly
2. **Row Count**: See how many records you have
3. **Storage Used**: Monitor database size
4. **Recent Activity**: View latest records

### Using SQL Queries

Get sales summary:
```sql
SELECT
  COUNT(*) as total_records,
  SUM(revenue) as total_revenue,
  SUM(profit) as total_profit,
  AVG(revenue) as avg_revenue
FROM sales_records;
```

Top products:
```sql
SELECT product, SUM(revenue) as revenue
FROM sales_records
GROUP BY product
ORDER BY revenue DESC
LIMIT 10;
```

Sales by region:
```sql
SELECT region, SUM(revenue) as revenue
FROM sales_records
GROUP BY region
ORDER BY revenue DESC;
```

## Project Settings

To manage your project settings in Supabase:
1. Go to **Settings** (gear icon, bottom left)
2. You can:
   - Change database password
   - View API keys
   - Configure backups
   - Manage authentication
   - View usage statistics

## Your API Keys

Your dashboard uses:
- **Anon Key**: Allows public read/write (configured)
- **Service Role Key**: Admin access (not used by dashboard)

Never share your Service Role Key!

## Getting Help

If you can't see your data:
1. Verify project name matches: `aubfioapojnlqvbisgmm`
2. Check tables exist in Database → Tables
3. Run query in SQL Editor
4. Check browser console for errors
5. Verify `.env` has correct URL and key

Your dashboard is now fully integrated with Supabase!
