# Deploy to Vercel - Complete Guide

Your dashboard is ready to deploy. This is the final step to go live!

## What You Have

✓ Dashboard with all features working
✓ Supabase database connected
✓ All tables created (sales_records, data_uploads)
✓ Environment variables configured locally

## Step 1: Deploy to Vercel

### Option A: Using Vercel CLI (Fastest)

```bash
npm install -g vercel
vercel --prod
```

Follow the prompts - it will deploy your project instantly.

### Option B: Using GitHub (Recommended for Team)

1. Push your project to GitHub
2. Go to https://vercel.com/import
3. Connect your GitHub repository
4. Vercel automatically deploys on every push

### Option C: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

## Step 2: Add Environment Variables to Vercel

After deployment starts, add your environment variables:

### In Vercel Dashboard:

1. Go to your project settings
2. Click "Environment Variables"
3. Add these two variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://aubfioapojnlqvbisgmm.supabase.co
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1YmZpb2Fwb2pubHF2YmlzZ21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzQ2NzYsImV4cCI6MjA3ODQ1MDY3Nn0.jtnslIkqAxR0JQdEB5ezLIxYLRTY1zdIj4Zs3xttn_8
```

4. Click "Save"
5. Go to "Deployments" and redeploy to apply variables

### Or Using Vercel CLI:

```bash
vercel env add VITE_SUPABASE_URL https://aubfioapojnlqvbisgmm.supabase.co
vercel env add VITE_SUPABASE_ANON_KEY eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1YmZpb2Fwb2pubHF2YmlzZ21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzQ2NzYsImV4cCI6MjA3ODQ1MDY3Nn0.jtnslIkqAxR0JQdEB5ezLIxYLRTY1zdIj4Zs3xttn_8
```

## Step 3: Verify Deployment

After redeploy:

1. Your project gets a live URL (like `your-project.vercel.app`)
2. Open that URL in your browser
3. Upload a CSV file to test
4. Check Supabase dashboard to verify data was saved

## How It Works After Deployment

```
┌──────────────────────┐
│   Users Visit URL    │
│   (your-site.com)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Vercel Serves      │
│   Your Dashboard     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Upload CSV         │
│   (via Dashboard)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Supabase API       │
│   (Saves Data)       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Supabase Database  │
│   (Your Tables)      │
└──────────────────────┘
```

## Troubleshooting

### Build Fails on Vercel

Check the build logs for errors. Usually it's missing environment variables.

**Solution:**
- Go to Settings → Environment Variables
- Ensure both variables are added
- Redeploy

### Dashboard Loads But Can't Upload

This means environment variables aren't loaded.

**Solution:**
1. Verify variables in Vercel Settings
2. Redeploy the project
3. Hard refresh browser (Ctrl+Shift+R)

### Data Not Saving to Supabase

Check browser console for errors.

**Solution:**
1. Verify API keys are correct
2. Check Supabase project is online
3. Go to Supabase → Monitoring to check for errors

### 404 Error on Live URL

Vercel deployment might still be in progress.

**Solution:**
- Wait a few minutes
- Check deployment status in Vercel dashboard
- Redeploy if needed

## Your Live URL

After deployment, you'll get a URL like:
```
https://your-project-name.vercel.app
```

Share this with others to use your dashboard!

## Important Security Notes

✓ Your Anon Key is public (safe to expose)
✓ Never share your Service Role Key
✓ Supabase data is encrypted in transit
✓ Backups are automatic

## Keeping Your Dashboard Updated

If you make changes locally:

### Using GitHub (Recommended)
1. Make changes locally
2. Commit to GitHub
3. Vercel automatically redeploys

### Using Vercel CLI
1. Make changes locally
2. Run `vercel --prod`
3. Deploy instantly

## Custom Domain

To add your own domain:

1. In Vercel dashboard, go to Settings → Domains
2. Add your domain
3. Follow DNS configuration steps
4. Your dashboard is now at your custom domain!

## Next Steps

1. Deploy to Vercel using one of the options above
2. Add environment variables
3. Test by uploading a CSV
4. Share your live URL with others

Your dashboard is production-ready!
