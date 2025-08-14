import { Component, effect, Input, input, WritableSignal } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';
import { profile } from '../../interfaces/user';

@Component({
  selector: 'app-profile-locke-wins',
  imports: [Loader],
  templateUrl: './profile-locke-wins.html',
  styleUrl: './profile-locke-wins.css',
})
export class ProfileLockeWins {
  @Input() profileInfo!: WritableSignal<profile | null>;
  constructor() {
    effect(() => {
      console.log(this.profileInfo());
    });
  }
}
