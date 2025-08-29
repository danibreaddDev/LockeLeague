import { Component, inject, signal, Signal } from '@angular/core';
import { TournamentList } from '../../../../components/tournament-list/tournament-list';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalTournamentDetail } from '../../../../components/modal-tournament-detail/modal-tournament-detail';
import { TournamentService } from '../../../../core/services/tournament-service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Loader } from '../../../../shared/components/loader/loader';
import { CreateTournamentForm } from '../../../../components/create-tournament-form/create-tournament-form';
import { LockeService } from '../../../../core/services/locke-service';
import { AuthService } from '../../../../core/services/auth-service';

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
  creatorLocke = signal<string>('');
  currentUser = inject(AuthService).user$;
  canManageTournament = signal<boolean>(false);
  constructor(
    private dialog: Dialog,
    private tournamentService: TournamentService,
    private lockeService: LockeService
  ) {
    this.getCreatorLocke();
    this.getTournaments();
  }

  openModalTournamentDetail(tournamentId: string) {
    this.dialog.open(ModalTournamentDetail, {
      disableClose: true,
      data: {
        tournamentId: tournamentId,
        canManageTournament: this.canManageTournament(),
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
  getCreatorLocke() {
    this.lockeService.getCreatorLocke(this.idLocke()).then((res) => {
      if (res.error) {
        alert('error: ' + res.error.message);
        return;
      }
      this.creatorLocke.set(res.data?.created_by);
      this.checkManageTournaments();
    });
  }
  getTournaments() {
    this.tournamentService
      .getTournaments(this.idLocke(), this.tournamentStatus())
      .then((res) => {
        if (res.error) {
          alert(`error:  ${res.error.message}`);
          return;
        }
        this.tournaments.set(res.data);
      })
      .catch((err) => {
        alert('Error loading tournaments: ' + err);
      });
  }
  ShowFilterSection() {
    this.isShowedFilterSection.set(!this.isShowedFilterSection());
  }
  setStatus(status: string) {
    this.tournamentStatus.set(status);
    this.getTournaments();
  }
  private checkManageTournaments() {
    this.currentUser.subscribe((user) => {
      if (user?.id === this.creatorLocke()) {
        this.canManageTournament.set(true);
      }
    });
  }
}
