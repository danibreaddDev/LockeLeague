import { Component, input } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  selector: 'app-profile-tournaments-wins',
  imports: [Loader],
  templateUrl: './profile-tournaments-wins.html',
  styleUrl: './profile-tournaments-wins.css',
})
export class ProfileTournamentsWins {
  tournament_wins = input<number>();
}
