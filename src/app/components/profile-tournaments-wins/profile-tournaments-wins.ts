import { Component, Input, input, WritableSignal } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';
import { profile } from '../../interfaces/user';

@Component({
  selector: 'app-profile-tournaments-wins',
  imports: [Loader],
  templateUrl: './profile-tournaments-wins.html',
  styleUrl: './profile-tournaments-wins.css',
})
export class ProfileTournamentsWins {
  @Input() profileInfo!: WritableSignal<profile | null>;
}
