import { Component } from '@angular/core';
import { SettingsMenu } from '../settings-menu/settings-menu';

@Component({
  selector: 'app-footer',
  imports: [SettingsMenu],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
