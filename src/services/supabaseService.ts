import { supabase } from '../lib/supabase';
import { SalesRecord } from '../types/sales';

export const saveSalesRecords = async (records: SalesRecord[], fileName: string) => {
  try {
    const { data, error } = await supabase
      .from('sales_records')
      .insert(
        records.map(r => ({
          date: r.date,
          product: r.product,
          category: r.category,
          region: r.region,
          quantity: r.quantity,
          revenue: r.revenue,
          cost: r.cost,
          profit: r.profit,
        }))
      );

    if (error) {
      console.error('Error saving records:', error);
      throw error;
    }

    const { error: uploadError } = await supabase
      .from('data_uploads')
      .insert({
        file_name: fileName,
        record_count: records.length,
      });

    if (uploadError) {
      console.error('Error logging upload:', uploadError);
    }

    return { success: true, count: records.length };
  } catch (error) {
    console.error('Save error:', error);
    throw error;
  }
};

export const fetchAllSalesRecords = async (): Promise<SalesRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('sales_records')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching records:', error);
      throw error;
    }

    return (data || []).map((r: any) => ({
      id: r.id,
      date: r.date,
      product: r.product,
      category: r.category,
      region: r.region,
      quantity: r.quantity,
      revenue: r.revenue,
      cost: r.cost,
      profit: r.profit,
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const deleteSalesRecord = async (id: string) => {
  try {
    const { error } = await supabase
      .from('sales_records')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export const fetchUploadHistory = async () => {
  try {
    const { data, error } = await supabase
      .from('data_uploads')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('History fetch error:', error);
    return [];
  }
};

export const deleteAllRecords = async () => {
  try {
    const { error } = await supabase
      .from('sales_records')
      .delete()
      .gte('created_at', '2000-01-01');

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete all error:', error);
    throw error;
  }
};
