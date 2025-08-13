import {
  Component,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-settings-menu',
  imports: [],
  templateUrl: './settings-menu.html',
  styleUrl: './settings-menu.css',
})
export class SettingsMenu implements OnInit {
  @Input() TranslateValues: string[] = [];
  displayMenu = signal<boolean>(false);
  developerName = signal<string>('DanibreaddDev');
  theme = signal<'sun' | 'moon' | ''>('');
  ngOnInit() {
    const themeClass = document.documentElement.classList;
    if (themeClass.contains('theme-light')) {
      this.theme.set('moon');
    } else {
      this.theme.set('sun');
    }
  }
  showMenu() {
    console.log('valor: ', this.displayMenu());

    this.displayMenu.set(!this.displayMenu());
    console.log('valor despues: ', this.displayMenu());
  }
  switchTheme() {
    const classList = document.documentElement.classList;
    if (classList.contains('theme-light')) {
      classList.remove('theme-light');
      classList.add('theme-dark');
      this.theme.set('sun');
    } else {
      classList.remove('theme-dark');
      classList.add('theme-light');
      this.theme.set('moon');
    }
  }
}
