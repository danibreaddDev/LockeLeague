import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, signal } from '@angular/core';
import { TournamentService } from '../../core/services/tournament-service';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  selector: 'app-modal-tournament-detail',
  imports: [Loader],
  templateUrl: './modal-tournament-detail.html',
  styleUrl: './modal-tournament-detail.css',
})
export class ModalTournamentDetail {
  tournament = signal<any | null>(null);
  matches = signal<any[] | null>(null);
  winners = signal<any[] | null>(null);
  constructor(
    private tournamentService: TournamentService,
    @Inject(DIALOG_DATA) public data: { tournamentId: string }
  ) {
    this.getTournamentDetail();
  }
  getTournamentDetail() {
    this.tournamentService.getTournament(this.data.tournamentId).then((res) => {
      if (res.error) {
        alert('error to get tournament detail');
      } else {
        this.tournament.set(res.data);
        this.getMatches();
      }
    });
  }
  startTournament() {
    this.tournamentService
      .startTournament(this.tournament().id, this.tournament().locke_id)
      .then((res) => {
        if (res!.updateTournament) {
          console.error(res?.updateTournament.message);
        } else {
          this.getTournamentDetail();
        }
      });
  }
  getMatches() {
    if (this.tournament().status !== 'active') {
      return;
    }
    this.tournamentService.getMatches(this.tournament().id).then((res) => {
      if (res.matches) {
        this.matches.set(res.matches);
      } else {
        console.error('error to get matches');
      }
    });
  }
  addWinner(matchId: string, participant: any) {
    this.winners.set([...(this.winners() || []), { matchId, participant }]);
  }
}
