import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class FaqsService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
  constructor() {}
  async getFaqs() {
    try {
      const { data, error } = await this._clientSupabase
        .from('faqs')
        .select('*');
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error getting FAQs:', error);
      return null;
    }
  }
}
