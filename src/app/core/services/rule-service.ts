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
  async createRule(rule: any, idLocke: string) {
    const ruleToInsert = {
      title: rule.title,
      description: rule.description,
      locke_id: idLocke,
    };
    const { data, error } = await this._clientSupabase
      .from('rules')
      .insert(ruleToInsert);
    return { data, error };
  }
  async updateRule(rule: any) {
    const { data, error } = await this._clientSupabase
      .from('rules')
      .update({
        title: rule.title,
        description: rule.description,
      })
      .eq('id', rule.id);
    return { data, error };
  }
  async deleteRule(id: string) {
    const { data, error } = await this._clientSupabase
      .from('rules')
      .delete()
      .eq('id', id);
    return { data, error };
  }
}
