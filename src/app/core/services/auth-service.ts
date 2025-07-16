import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _clientSupabase = inject(SupabaseService).clientSupabase;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  // Observable que indica si la sesión inicial ya está cargada
  private sessionLoadedSubject = new ReplaySubject<boolean>(1);
  sessionLoaded$ = this.sessionLoadedSubject.asObservable();

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
    // Avisamos que la sesión ya se cargó
    this.sessionLoadedSubject.next(true);
    // Actualizar en tiempo real
    this._clientSupabase.auth.onAuthStateChange((_event, session) => {
      this.userSubject.next(session?.user ?? null);
    });
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
  async logOut() {
    const { error } = await this._clientSupabase.auth.signOut();
    return { error };
  }
}
