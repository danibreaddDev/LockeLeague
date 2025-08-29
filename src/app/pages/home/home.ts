import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Hero } from '../../components/hero/hero';
import { AuthService } from '../../core/services/auth-service';
import { Router, Routes } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SettingsMenu } from '../../shared/components/settings-menu/settings-menu';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, CommonModule, SettingsMenu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  authService = inject(AuthService);
  router = inject(Router);
  user$: Observable<User | null> = this.authService.user$;
  constructor() {}

  async authWithDiscord() {
    try {
      const authResponse = await this.authService.logInWithDiscord();
      if (authResponse.error) throw authResponse.error;
    } catch (error) {
      console.error(error);
    }
  }
  async logOut() {
    const { error } = await this.authService.logOut();
    if (error) console.error('error en cerrar sesion', error);
  }
}
