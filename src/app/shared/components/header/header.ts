import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SettingsMenu } from '../settings-menu/settings-menu';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SettingsMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isShowNavMobile = signal<boolean>(false);
}
