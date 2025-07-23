import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { getFormatted } from '../../../utils/functions';
import { UserService } from '../../core/services/user-service';
import { Loader } from '../../shared/components/loader/loader';
import { AuthService } from '../../core/services/auth-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-locke-user-info',
  imports: [CommonModule, Loader],
  templateUrl: './locke-user-info.html',
  styleUrl: './locke-user-info.css',
})
export class LockeUserInfo {
  MAX_TEAMS_MEMBER = signal<number>(6);
  @Input() user!: any;
  @Input() userInfo!: Signal<any | null | undefined>;
  @Output() onOpenModalEditPokemon = new EventEmitter<any>();
  @Output() onOpenModalAddPokemon = new EventEmitter<void>();

  currentUser = inject(AuthService).user$;
  isEditableUser = false;
  constructor() {
    effect(() => this.checkCurrentUser());
  }
  getFormattedName(nombre: string): string {
    return getFormatted(nombre);
  }
  checkCurrentUser() {
    this.currentUser.subscribe((user) => {
      if (user?.id === this.user.user_id) {
        this.isEditableUser = true;
        console.log(this.isEditableUser);
      }
    });
  }
  getFieldsToAddPokemon() {
    console.log('la longitud del equipo es de', this.user.team.length);

    if (this.user.team.length - 1 === this.MAX_TEAMS_MEMBER()) {
      return 0;
    }
    console.log(this.MAX_TEAMS_MEMBER() - this.user.team.length);

    return this.MAX_TEAMS_MEMBER() - this.user.team.length;
  }
  emitEditModal(event: Event, pokemon: any, id: any) {
    console.log('id que vamos a emitir', id);

    const pokemonData = {
      id: id,
      pokemonId: pokemon,
    };
    event.preventDefault();
    event.stopPropagation();
    console.log('click a emitir');
    this.onOpenModalEditPokemon.emit(pokemonData);
  }
  emitAddModal() {
    this.onOpenModalAddPokemon.emit();
  }
}
