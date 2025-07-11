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
    console.log('eee');

    const select = event.target as HTMLSelectElement;
    const user = select.value;

    const userTofind = this.users()?.find((u) => u.user_name === user);
    if (userTofind) {
      console.log('eee encuentro el user');
      this.usersToAddGroup.push(userTofind);
    }
    console.log('toy fuera el user');
    console.log(this.usersToAddGroup);
    select.value = '';
  }
  deleteUser(user: profile) {
    console.log('eee');

    this.usersToAddGroup = this.usersToAddGroup.filter(
      (u) => u.user_name !== user.user_name
    );
    console.log(this.usersToAddGroup);
  }
}
