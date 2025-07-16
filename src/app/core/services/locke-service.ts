import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { AuthService } from './auth-service';
import { filter, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LockeService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
  private _currentUser$ = inject(AuthService).user$;
  constructor() {}
  async getLockes() {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const { data, error } = await this._clientSupabase
      .from('locke_users')
      .select(
        `
    *,
   locke:locke_id (
      name,
      lifes
    )`
      )
      .eq('user_id', user.id)
      .limit(3);
    return { data, error };
  }
}
