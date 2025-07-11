import { Component, signal, effect, inject } from '@angular/core';
import { ProfileService } from '../../core/services/profile-service';
import { ProfileGeneralInfo } from '../../components/profile-general-info/profile-general-info';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { CreateGroupForm } from '../../components/create-group-form/create-group-form';
import { ProfileClasification } from '../../components/profile-clasification/profile-clasification';
import { profile } from '../../interfaces/user';
import { UserService } from '../../core/services/user-service';
import { GroupService } from '../../core/services/group-service';

@Component({
  selector: 'app-profile',
  imports: [ProfileGeneralInfo, CommonModule, ProfileClasification],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  dialog = inject(Dialog);
  profileInfo = signal<profile | null>(null);
  users = signal<profile[]>([]);
  groups = signal<[]>([]);
  groupSelected = signal<any>(null);
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private groupService: GroupService
  ) {
    effect(() => {
      this.getInfoProfile();
      this.getGroupsCreated();
    });
  }
  openModalCreateGroup() {
    this.dialog.open(CreateGroupForm);
  }
  getInfoProfile() {
    this.profileService
      .getInfo()
      .then((res) => {
        this.profileInfo.set(res.data);
      })
      .catch((error) => console.error(error));
  }
  getUsers() {
    this.userService
      .listUsers()
      .then((res: any) => {
        console.log('users', res.data);
        this.users.set(res.data);
      })
      .catch((error) => console.error(error));
  }
  getGroupsCreated() {
    this.getUsers();
    this.groupService
      .getGroupsCreated()
      .then((res: any) => {
        console.log('gruops', res.data);
        this.groups.set(res.data);
        this.groupSelected.set(res.data[0]);
      })
      .catch((error) => console.error(error));
  }
}
