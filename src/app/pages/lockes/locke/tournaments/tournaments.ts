import { Component } from '@angular/core';
import { TournamentList } from '../../../../components/tournament-list/tournament-list';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalTournamentDetail } from '../../../../components/modal-tournament-detail/modal-tournament-detail';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [TournamentList],
  templateUrl: './tournaments.html',
  styleUrl: './tournaments.css',
})
export class Tournaments {
  constructor(private dialog: Dialog) {}
  openModalTournamentDetail(tournamentId: string) {
    const dialogRef = this.dialog.open(ModalTournamentDetail, {
      data: {
        tournamentId: tournamentId,
      },
    });
    dialogRef.closed.subscribe((result) => {});
  }
}
