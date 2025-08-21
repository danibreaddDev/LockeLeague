import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tournament-card',
  imports: [],
  templateUrl: './tournament-card.html',
  styleUrl: './tournament-card.css',
})
export class TournamentCard {
  @Input() tournament!: any;
  @Output() onClickTournament = new EventEmitter<string>();
  openTournamentDetail() {
    this.onClickTournament.emit(this.tournament.id);
  }
}
