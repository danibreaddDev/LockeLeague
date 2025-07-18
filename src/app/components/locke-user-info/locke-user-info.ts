import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
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
  @Input() user!: any;
  @Input() userInfo!: Signal<any | null | undefined>;
  @Output() onOpenModalEditPokemon = new EventEmitter<any>();
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
  emitShowModal(event: Event, pokemon: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('click a emitir');
    this.onOpenModalEditPokemon.emit(pokemon);
  }
}
