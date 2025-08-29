import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
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
  winnersRound = signal<any[] | null>(null);
  currentRound = signal<string>('');
  participants = signal<any[] | null>(null);
  canManageTournament = signal<boolean>(false);
  constructor(
    private tournamentService: TournamentService,
    @Inject(DIALOG_DATA)
    public data: { tournamentId: string; canManageTournament: boolean },
    private dialogRef: DialogRef
  ) {
    this.getTournamentDetail();
  }

  closeModal() {
    this.dialogRef.close();
  }
  getTournamentDetail() {
    this.tournamentService.getTournament(this.data.tournamentId).then((res) => {
      if (res.error) {
        alert('error:' + res.error.message);
        return;
      }
      this.tournament.set(res.data);
      this.checkStatusTournament();
    });
  }

  startTournament() {
    this.tournamentService
      .startTournament(this.tournament().id, this.tournament().locke_id)
      .then((res) => {
        if (res?.updateTournament) {
          alert('error: ' + res?.updateTournament.message);
          return;
        }
        this.getTournamentDetail();
      });
  }
  completeRound() {
    if (!this.winnersRound()) {
      alert('You must select at least one winner');
      return;
    }
    if (this.winnersRound()?.length !== this.matches()?.length) {
      alert('You must select a winner for each match');
      return;
    }
    this.tournamentService
      .completeMatches(
        this.winnersRound(),
        this.currentRound(),
        this.tournament().id
      )
      .then((res) => {
        if (res.error) {
          alert('error: ' + res.error.message);
          return;
        }
        this.winnersRound.set(null);
        this.getTournamentDetail();
      });
  }
  getMatches() {
    if (this.tournament().status !== 'active') {
      return;
    }
    this.tournamentService.getMatches(this.tournament().id).then((res) => {
      if (res.matches) {
        this.matches.set(res.matches);
        this.currentRound.set(res.matches[0].round);
      } else {
        console.error('error to get matches');
      }
    });
  }
  getParticipants() {
    this.tournamentService.getParticipants(this.tournament().id).then((res) => {
      if (res.errorGetParticipants) {
        alert(
          'error to get participants, error:' + res.errorGetParticipants.message
        );
        return;
      }
      this.participants.set(res.participants);
      console.log(this.participants());
    });
  }
  getOrderedParticipants() {
    return this.participants()?.sort((a, b) => a.final_rank - b.final_rank);
  }
  addWinner(matchId: string, participant: any) {
    if (this.winnersRound()?.some((w) => w.matchId === matchId)) {
      return;
    }
    this.winnersRound.set([
      ...(this.winnersRound() || []),
      { matchId, participant },
    ]);
  }
  removeWinner(winner: any) {
    this.winnersRound.set(
      this.winnersRound()?.filter((w) => w.matchId !== winner.matchId) || []
    );
  }
  private checkStatusTournament() {
    if (this.tournament().status === 'active') {
      this.getMatches();
    } else if (this.tournament().status === 'completed') {
      this.getParticipants();
    }
  }
}
