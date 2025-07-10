import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { AuthService } from './auth-service';
import { filter, firstValueFrom } from 'rxjs';
interface profile {
  id: string;
  created_at: string;
  name: string;
  avatar_url: string;
  user_name: string;
  rank: number;
}
interface profileInfoState {
  profile: profile | null; // null al inicio porque aún no se ha cargado
  loading: boolean;
  error: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
  private _currentUser$ = inject(AuthService).user$;
  private _state = signal<profileInfoState>({
    profile: null,
    loading: false,
    error: false,
  });
  //selectors
  profile = computed(() => this._state().profile);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);

  constructor() {}
  async getInfoProfile() {
    try {
      this._state.update((state) => ({
        ...state,
        loading: true,
      }));
      const user = await firstValueFrom(
        this._currentUser$.pipe(filter((user) => !!user))
      );
      const { data } = await this._clientSupabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) {
        this._state.update((state) => ({
          ...state,
          profile: data,
        }));
      }
    } catch (error) {
      this._state.update((state) => ({
        ...state,
        error: true,
      }));
    } finally {
      this._state.update((state) => ({
        ...state,
        loading: false,
      }));
    }
  }
  async getInfo() {
    const user = await firstValueFrom(
      this._currentUser$.pipe(filter((user) => !!user))
    );
    const { data } = await this._clientSupabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    return { data };
  }
}
