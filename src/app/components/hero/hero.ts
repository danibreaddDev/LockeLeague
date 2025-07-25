import { Component, Input, output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  isloading = false;
  clickLogin = output<void>();
  clickLogOut = output<void>();
  @Input() user: User | null = null;
  constructor() {
    console.log(this.user);
  }

  login() {
    this.clickLogin.emit();
  }
  logout() {
    this.clickLogOut.emit();
  }
}
