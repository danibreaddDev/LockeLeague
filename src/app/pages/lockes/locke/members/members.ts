import { Component, inject, Signal, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user-service';
import { Dialog } from '@angular/cdk/dialog';
import { EditPokemonForm } from '../../../../components/edit-pokemon-form/edit-pokemon-form';
import { CreatePokemonForm } from '../../../../components/create-pokemon-form/create-pokemon-form';
import { EditLockeForm } from '../../../../components/edit-locke-form/edit-locke-form';
import { LockeService } from '../../../../core/services/locke-service';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { LockeUserInfo } from '../../../../components/locke-user-info/locke-user-info';

@Component({
  selector: 'app-members',
  imports: [LockeUserInfo],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members {
  test_id: Signal<string> = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  lockeUsersInfo = signal<any>(null);
  lifesUser = signal<number>(0);
  private userInfoMap = new Map<string, Signal<any | null>>(); //SOLUCIONAR CARGA INNCESARIA
  constructor(
    private userService: UserService,
    private lockeService: LockeService,
    private dialog: Dialog
  ) {
    this.getInfo();
  }
  getInfo() {
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
    });
  }

  updateLifes(userToEdit: any) {
    this.lockeService.updateLifesUser(userToEdit).then((err: any) => {
      if (!err.error) {
        alert('vidas actualizadas');
        this.getInfoUser(userToEdit.user);
        return;
      }
      alert(err.error);
    });
  }
}
