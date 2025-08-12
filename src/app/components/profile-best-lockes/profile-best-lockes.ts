import {
  Component,
  effect,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-best-lockes',
  imports: [Loader, RouterLink],
  templateUrl: './profile-best-lockes.html',
  styleUrl: './profile-best-lockes.css',
})
export class ProfileBestLockes {
  @Input() lockes!: WritableSignal<any[] | null | undefined>;

  constructor() {
    effect(() => {
      console.log(this.lockes());
    });
  }
  getFormatted(pokemon: string) {
    if (pokemon.length === 1) {
      return '00' + pokemon;
    }
    if (pokemon.length === 2) {
      return '0' + pokemon;
    } else {
      return pokemon;
    }
  }
}
