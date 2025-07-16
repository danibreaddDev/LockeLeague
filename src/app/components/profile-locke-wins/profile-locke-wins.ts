import { Component, input } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  selector: 'app-profile-locke-wins',
  imports: [Loader],
  templateUrl: './profile-locke-wins.html',
  styleUrl: './profile-locke-wins.css',
})
export class ProfileLockeWins {
  locke_wins = input<number>();
}
