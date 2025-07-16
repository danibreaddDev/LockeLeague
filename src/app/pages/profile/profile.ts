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
import { ProfileLockeWins } from '../../components/profile-locke-wins/profile-locke-wins';
import { ProfileTournamentsWins } from '../../components/profile-tournaments-wins/profile-tournaments-wins';
import { LockeService } from '../../core/services/locke-service';
import { ProfileBestLockes } from '../../components/profile-best-lockes/profile-best-lockes';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
    ProfileGeneralInfo,
    CommonModule,
    ProfileClasification,
    ProfileLockeWins,
    ProfileTournamentsWins,
    ProfileBestLockes,
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
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private groupService: GroupService,
    private lockeService: LockeService,
    private httpClient: HttpClient
  ) {
    this.getInfoProfile();
    this.getGroupsCreated();
    this.getBestLockes();
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
      .getLockes()
      .then((res: any) => {
        this.lockes.set(res.data);
        this.getInfoJson();
      })
      .catch((error) => console.error(error));
  }
}
