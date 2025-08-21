import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TournamentCard } from '../tournament-card/tournament-card';

@Component({
  selector: 'app-tournament-list',
  imports: [TournamentCard],
  templateUrl: './tournament-list.html',
  styleUrl: './tournament-list.css',
})
export class TournamentList {
  @Input() tournaments!: any;
  @Output() onClickTournament = new EventEmitter<string>();
}
