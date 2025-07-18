import { Component, inject, signal, Signal } from '@angular/core';
import { LockeService } from '../../../../core/services/locke-service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { LockeUserInfo } from '../../../../components/locke-user-info/locke-user-info';
import { UserService } from '../../../../core/services/user-service';
import { EditPokemonForm } from '../../../../components/edit-pokemon-form/edit-pokemon-form';
@Component({
  selector: 'app-locke-detail',
  imports: [LockeUserInfo],
  templateUrl: './locke-detail.html',
  styleUrl: './locke-detail.css',
})
export class LockeDetail {
  test_id: Signal<string> = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  lockeUsersInfo = signal<any>(null);
  private userInfoMap = new Map<string, Signal<any | null>>(); //SOLUCIONAR CARGA INNCESARIA
  constructor(
    private lockeService: LockeService,
    private userService: UserService,
    private dialog: Dialog
  ) {
    console.log(this.test_id());
    this.lockeService
      .getLocke(this.test_id())
      .then((res) => {
        this.lockeUsersInfo.set(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
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
  openModalEditPokemon(pokemonId: any) {
    console.log(pokemonId);

    console.log('openModalEditPokemon');
    this.dialog.open(EditPokemonForm, {
      data: {
        id: pokemonId,
      },
    });
  }
}
