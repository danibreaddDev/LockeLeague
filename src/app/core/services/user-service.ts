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
}
