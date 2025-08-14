import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;

  constructor() {}
  async getRules(idLocke: string) {
    const { data, error } = await this._clientSupabase
      .from('rules')
      .select('*')
      .eq('locke_id', idLocke);
    return { data, error };
  }
}
