import { Component, inject, signal, Signal } from '@angular/core';
import { TournamentList } from '../../../../components/tournament-list/tournament-list';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalTournamentDetail } from '../../../../components/modal-tournament-detail/modal-tournament-detail';
import { TournamentService } from '../../../../core/services/tournament-service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Loader } from '../../../../shared/components/loader/loader';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [TournamentList, Loader],
  templateUrl: './tournaments.html',
  styleUrl: './tournaments.css',
})
export class Tournaments {
  idLocke: Signal<string> = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  tournaments = signal<any | null>(null);
  constructor(
    private dialog: Dialog,
    private tournamentService: TournamentService
  ) {
    this.getTournaments();
  }
  openModalTournamentDetail(tournamentId: string) {
    const dialogRef = this.dialog.open(ModalTournamentDetail, {
      data: {
        tournamentId: tournamentId,
      },
    });
    dialogRef.closed.subscribe((result) => {});
  }
  getTournaments() {
    this.tournamentService.getTournaments(this.idLocke()).then((res) => {
      if (res.error) {
        alert('error to get tournaments');
      } else {
        this.tournaments.set(res.data);
      }
    });
  }
}
