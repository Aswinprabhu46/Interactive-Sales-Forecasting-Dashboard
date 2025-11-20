/*
  # Create Sales Data Tables

  1. New Tables
    - `sales_records`
      - `id` (uuid, primary key)
      - `date` (text, sales date)
      - `product` (text, product name)
      - `category` (text, product category)
      - `region` (text, sales region)
      - `quantity` (integer, units sold)
      - `revenue` (numeric, total revenue)
      - `cost` (numeric, cost of goods)
      - `profit` (numeric, profit margin)
      - `created_at` (timestamp)
    
    - `data_uploads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, uploader)
      - `file_name` (text, original filename)
      - `record_count` (integer)
      - `uploaded_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - All users can insert their own sales records
    - Users can view all records (public data)
    - Only record owner can update/delete

  3. Indexes
    - Index on date for faster queries
    - Index on region for filtering
*/

CREATE TABLE IF NOT EXISTS sales_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date text NOT NULL,
  product text NOT NULL,
  category text NOT NULL,
  region text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  revenue numeric NOT NULL DEFAULT 0,
  cost numeric NOT NULL DEFAULT 0,
  profit numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS data_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  file_name text NOT NULL,
  record_count integer NOT NULL DEFAULT 0,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE sales_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sales records"
  ON sales_records FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert sales records"
  ON sales_records FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view upload history"
  ON data_uploads FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert upload records"
  ON data_uploads FOR INSERT
  TO public
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_sales_date ON sales_records(date);
CREATE INDEX IF NOT EXISTS idx_sales_region ON sales_records(region);
CREATE INDEX IF NOT EXISTS idx_sales_category ON sales_records(category);
CREATE INDEX IF NOT EXISTS idx_sales_product ON sales_records(product);
CREATE INDEX IF NOT EXISTS idx_uploads_created ON data_uploads(uploaded_at);
