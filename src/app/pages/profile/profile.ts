import { Component, signal, inject } from '@angular/core';
import { ProfileService } from '../../core/services/profile-service';
import { ProfileGeneralInfo } from '../../components/profile-general-info/profile-general-info';
import { Dialog } from '@angular/cdk/dialog';
import { CreateGroupForm } from '../../components/create-group-form/create-group-form';
import { ProfileClasification } from '../../components/profile-clasification/profile-clasification';
import { profile } from '../../interfaces/user';
import { UserService } from '../../core/services/user-service';
import { GroupService } from '../../core/services/group-service';
import { ProfileLockeWins } from '../../components/profile-locke-wins/profile-locke-wins';
import { ProfileTournamentsWins } from '../../components/profile-tournaments-wins/profile-tournaments-wins';
import { LockeService } from '../../core/services/locke-service';
import { ProfileBestLockes } from '../../components/profile-best-lockes/profile-best-lockes';

import { DropDownMenu } from '../../shared/components/drop-down-menu/drop-down-menu';
import { SettingsMenu } from '../../shared/components/settings-menu/settings-menu';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileGeneralInfo,
    ProfileClasification,
    ProfileLockeWins,
    ProfileTournamentsWins,
    ProfileBestLockes,
    DropDownMenu,
    SettingsMenu,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  dialog = inject(Dialog);
  profileInfo = signal<profile | null>(null);
  users = signal<profile[]>([]);
  groups = signal<[]>([]);
  groupSelected = signal<any>(null);
  lockes = signal<any[] | null | undefined>(null);
  usersToAdd = signal<profile[]>([]);
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private groupService: GroupService,
    private lockeService: LockeService
  ) {
    this.getInfoProfile();
    this.getGroupsCreated();
    this.getBestLockes();
  }
  AddUsersToGroupSelected(users: profile[]) {
    this.groupService.addUsers(users, this.groupSelected()).then((res) => {
      if (!res.data) {
        alert('Users added succesfully');
        this.getGroupsCreated();
      } else if (res.error) {
        alert('error');
      }
    });
  }
  private getUsers() {
    this.userService
      .listUsers()
      .then((res: any) => {
        this.users.set(res.data);
      })
      .catch((error) => console.error(error));
  }
  private getInfoJson() {}
  openModalCreateGroup() {
    this.dialog.open(CreateGroupForm, {
      data: 'open',
    });
  }
  getInfoProfile() {
    this.profileService
      .getInfo()
      .then((res) => {
        this.profileInfo.set(res.data);
      })
      .catch((error) => console.error(error));
  }

  getGroupsCreated() {
    this.getUsers();
    this.groupService
      .getGroupsCreated()
      .then((res: any) => {
        this.groups.set(res.data);
        this.groupSelected.set(res.data[0]);
      })
      .catch((error) => console.error(error));
  }
  getBestLockes() {
    this.lockeService
      .getBestLockes()
      .then((res: any) => {
        this.lockes.set(res.data);
        this.getInfoJson();
      })
      .catch((error) => console.error(error));
  }
}
