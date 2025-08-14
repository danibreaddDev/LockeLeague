import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { LockeService } from '../../../../core/services/locke-service';
import { Router, ROUTER_OUTLET_DATA } from '@angular/router';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { LockeUserInfo } from '../../../../components/locke-user-info/locke-user-info';
import { UserService } from '../../../../core/services/user-service';
import { EditPokemonForm } from '../../../../components/edit-pokemon-form/edit-pokemon-form';
import { Loader } from '../../../../shared/components/loader/loader';
import { CreatePokemonForm } from '../../../../components/create-pokemon-form/create-pokemon-form';
import { EditLockeForm } from '../../../../components/edit-locke-form/edit-locke-form';
@Component({
  selector: 'app-locke-detail',
  imports: [Loader],
  templateUrl: './locke-detail.html',
  styleUrl: './locke-detail.css',
})
export class LockeDetail {
  test_id: Signal<string> = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  generalInfo = signal<any | null>(null);
  constructor(private lockeService: LockeService, private dialog: Dialog) {
    this.getInfoAboutLocke();
  }
  openModalEditLocke() {
    console.log(this.generalInfo());

    const dialogRef = this.dialog.open(EditLockeForm, {
      disableClose: true,
      data: {
        infoLocke: this.generalInfo(),
      },
    });
    dialogRef.closed.subscribe((result) => {
      const wasSubmitted = result as boolean | undefined;
      console.log(wasSubmitted);
      if (!wasSubmitted) {
        return;
      }
      this.getInfoAboutLocke();
    });
  }
  private getInfoAboutLocke() {
    this.lockeService
      .getGeneralInfoLocke(this.test_id())
      .then((res: any) => {
        console.log(res.data[0]);
        this.generalInfo.set(res.data[0]);
      })
      .catch((err) => console.error(err));
  }
}
