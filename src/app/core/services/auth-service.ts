import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { BehaviorSubject } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  constructor() {
    this.getSession();
  }
  async logInWithDiscord() {
    const { data, error } = await this._clientSupabase.auth.signInWithOAuth({
      provider: 'discord',
    });
    return { data, error };
  }
  async getSession() {
    // Cargar la sesión inicial (si la hay en localStorage)
    const { data } = await this._clientSupabase.auth.getSession();
    this.userSubject.next(data.session?.user ?? null);

    // Actualizar en tiempo real
    this._clientSupabase.auth.onAuthStateChange((_event, session) => {
      this.userSubject.next(session?.user ?? null);
      console.log('en el servicio', this.getCurrentUser());
    });
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
  async logOut() {
    console.log('que pasa');
    const { error } = await this._clientSupabase.auth.signOut();
    return { error };
  }
}
