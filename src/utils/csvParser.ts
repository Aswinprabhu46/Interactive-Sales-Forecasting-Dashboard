import { SalesRecord } from '../types/sales';

export const parseCSV = (csvText: string): SalesRecord[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const records: SalesRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== headers.length) continue;

    const record: any = {
      id: crypto.randomUUID(),
    };

    headers.forEach((header, index) => {
      const value = values[index];

      if (header.includes('date')) {
        const trimmedDate = value.trim();
        const dateObj = new Date(trimmedDate);
        if (!isNaN(dateObj.getTime())) {
          record.date = trimmedDate;
        }
      } else if (header.includes('product') && !header.includes('category')) {
        record.product = value.trim();
      } else if (header.includes('category')) {
        record.category = value.trim();
      } else if (header.includes('region')) {
        record.region = value.trim();
      } else if (header.includes('quantity') || header.includes('qty')) {
        record.quantity = parseFloat(value) || 0;
      } else if (header.includes('revenue') || header.includes('sales')) {
        record.revenue = parseFloat(value) || 0;
      } else if (header.includes('cost')) {
        record.cost = parseFloat(value) || 0;
      } else if (header.includes('profit')) {
        record.profit = parseFloat(value) || 0;
      } else if (header.includes('customer')) {
        record.customer_type = value.trim();
      }
    });

    if (!record.profit && record.revenue && record.cost) {
      record.profit = record.revenue - record.cost;
    }

    if (record.date && record.product && record.revenue !== undefined) {
      records.push(record as SalesRecord);
    }
  }

  return records;
};

export const validateCSV = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith('.csv')) {
      reject(new Error('Please upload a CSV file'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('File size should be less than 10MB'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
