import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { AuthService } from './auth-service';
import { filter, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
  private _currentUser$ = inject(AuthService).user$;
  constructor() {}
  async createGroup(group: any) {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const { error } = await this._clientSupabase.from('groups').insert({
      name: group.name,
      description: group.description,
      created_by: user.id,
    });

    return { error };
  }
  async getGroupsCreated() {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const { data, error } = await this._clientSupabase
      .from('groups')
      .select('*')
      .eq('created_by', user.id);

    return { data, error };
  }
  async getGroupsJoined() {}
  async getGroupStats(id: string) {
    const { data, error } = await this._clientSupabase
      .from('group_stats')
      .select('*')
      .eq('group_id', id);
    return { data, error };
  }
  async getGroupName(id: string) {
    const { data, error } = await this._clientSupabase
      .from('groups')
      .select('name')
      .eq('id', id);
    return { data, error };
  }
}
