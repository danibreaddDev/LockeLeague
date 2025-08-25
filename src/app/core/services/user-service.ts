import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;

  constructor() {}

  async listUsers() {
    const { data, error } = await this._clientSupabase
      .from('users')
      .select('*');
    return { data, error };
  }
  async getUser(id: string) {
    const { data, error } = await this._clientSupabase
      .from('users')
      .select('avatar_url,name')
      .eq('id', id);
    return { data, error };
  }
  async getUserByIds(ids: string[]) {
    const { data, error } = await this._clientSupabase
      .from('users')
      .select('id,avatar_url,name')
      .in('id', ids);
    return { data, error };
  }
}
