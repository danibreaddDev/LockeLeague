import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SettingsMenu } from '../../shared/components/settings-menu/settings-menu';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterOutlet, SettingsMenu],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {}
