import { Component, Input, WritableSignal } from '@angular/core';
import { profile } from '../../interfaces/user';

@Component({
  selector: 'app-user-select',
  imports: [],
  templateUrl: './user-select.html',
  styleUrl: './user-select.css',
})
export class UserSelect {
  @Input() users!: WritableSignal<profile[] | null>;
  usersToAddGroup: profile[] = [];
  addUser(event: Event) {
    const select = event.target as HTMLSelectElement;
    const user = select.value;

    const userTofind = this.users()?.find((u) => u.user_name === user);
    if (userTofind) {
      this.usersToAddGroup.push(userTofind);
    }
    select.value = '';
  }
  deleteUser(user: profile) {
    this.usersToAddGroup = this.usersToAddGroup.filter(
      (u) => u.user_name !== user.user_name
    );
  }
}
