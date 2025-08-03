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
@Component({
  selector: 'app-locke-detail',
  imports: [LockeUserInfo, Loader],
  templateUrl: './locke-detail.html',
  styleUrl: './locke-detail.css',
})
export class LockeDetail {
  test_id: Signal<string> = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  generalInfo = signal<any | null>(null);
  lockeUsersInfo = signal<any>(null);
  private userInfoMap = new Map<string, Signal<any | null>>(); //SOLUCIONAR CARGA INNCESARIA
  @Output() onReloadWindow = new EventEmitter<void>();
  constructor(
    private lockeService: LockeService,
    private userService: UserService,
    private dialog: Dialog
  ) {
    this.getInfoAboutLocke();
  }

  getInfoUser(user: any): Signal<any | null> {
    if (this.userInfoMap.has(user.user_id)) {
      return this.userInfoMap.get(user.user_id)!;
    }

    const userInfo = signal<any | null>(null);
    this.userService
      .getUser(user.user_id)
      .then((res: any) => {
        userInfo.set(res.data[0]);
      })
      .catch((err) => console.error(err));

    this.userInfoMap.set(user.user_id, userInfo);
    return userInfo;
  }
  openModalEditPokemon(pokemonData: any) {
    const dialogRef = this.dialog.open(EditPokemonForm, {
      data: {
        id: pokemonData.id,
        pokemonId: pokemonData.pokemonId,
      },
    });
    dialogRef.closed.subscribe((result) => {
      const wasSubmitted = result as boolean | undefined;
      if (!wasSubmitted) {
        return;
      }
      this.getInfoAboutLocke();
    });
  }

  openModalAddPokemon(userId: string) {
    const dialogRef = this.dialog.open(CreatePokemonForm, {
      data: {
        userId: userId,
      },
    });
    dialogRef.closed.subscribe((result) => {
      const wasSubmitted = result as boolean | undefined;
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
    this.lockeService
      .getLocke(this.test_id())
      .then((res) => {
        this.lockeUsersInfo.set(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }
}
