import { Component, inject, signal, Signal } from '@angular/core';
import { TournamentList } from '../../../../components/tournament-list/tournament-list';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalTournamentDetail } from '../../../../components/modal-tournament-detail/modal-tournament-detail';
import { TournamentService } from '../../../../core/services/tournament-service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Loader } from '../../../../shared/components/loader/loader';
import { CreateTournamentForm } from '../../../../components/create-tournament-form/create-tournament-form';

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
  isShowedFilterSection = signal<boolean>(false);
  tournamentStatus = signal<string>('active');
  constructor(
    private dialog: Dialog,
    private tournamentService: TournamentService
  ) {
    this.getTournaments();
  }
  openModalTournamentDetail(tournamentId: string) {
    this.dialog.open(ModalTournamentDetail, {
      disableClose: true,
      data: {
        tournamentId: tournamentId,
      },
    });
  }
  openModalCreateTournament() {
    const dialogRef = this.dialog.open(CreateTournamentForm, {
      disableClose: true,
      data: { idLocke: this.idLocke() },
    });
    dialogRef.closed.subscribe((result) => {
      const wasSubmitted = result as boolean | undefined;
      if (wasSubmitted) {
        this.setStatus('draft');
        this.getTournaments();
      }
    });
  }
  getTournaments() {
    this.tournamentService
      .getTournaments(this.idLocke(), this.tournamentStatus())
      .then((res) => {
        if (res.error) {
          alert('error to get tournaments');
        } else {
          this.tournaments.set(res.data);
        }
      });
  }
  ShowFilterSection() {
    this.isShowedFilterSection.set(!this.isShowedFilterSection());
  }
  setStatus(status: string) {
    this.tournamentStatus.set(status);
    this.getTournaments();
  }
}
