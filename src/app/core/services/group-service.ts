import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { AuthService } from './auth-service';
import { filter, firstValueFrom } from 'rxjs';
import { profile } from '../../interfaces/user';

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
    const { data, error } = await this._clientSupabase
      .from('groups')
      .insert({
        name: group.name,
        description: group.description,
        created_by: user.id,
      })
      .select('id');
    if (data) {
      await this._clientSupabase.from('group_stats').insert({
        group_id: data[0].id,
        user_id: user.id,
        rank: 0,
        locke_wins: 0,
        tournament_wins: 0,
      });
    }

    return { data, error };
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
  async getGroupsJoined() {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const { data, error } = await this._clientSupabase
      .from('groups')
      .select('*,group_stats!inner(user_id)')
      .eq('group_stats.user_id', user.id)
      .neq('created_by', user.id);
    return { data, error };
  }
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
  async addUsers(users: profile[], groupSelected: any) {
    const rows = users.map((user) => ({
      group_id: groupSelected.id,
      user_id: user.id,
      rank: 0,
      locke_wins: 0,
      tournament_wins: 0,
    }));
    const { data, error } = await this._clientSupabase
      .from('group_stats')
      .insert(rows);
    return { data, error };
  }
}
