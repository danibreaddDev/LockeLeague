import { Component, inject, signal } from '@angular/core';
import { LockeList } from '../../components/locke-list/locke-list';
import { RouterLink } from '@angular/router';
import { LockeService } from '../../core/services/locke-service';
import { Dialog } from '@angular/cdk/dialog';
import { CreateLockeForm } from '../../components/create-locke-form/create-locke-form';
import { GroupService } from '../../core/services/group-service';
@Component({
  selector: 'app-lockes',
  imports: [LockeList, RouterLink],
  templateUrl: './lockes.html',
  styleUrl: './lockes.css',
})
export class Lockes {
  lockesList = signal<any[] | null | undefined>(null);
  groups = signal<any>(null);
  dialog = inject(Dialog);
  constructor(
    private lockeService: LockeService,
    private groupService: GroupService
  ) {
    this.getLockes();
    this.getGroups();
  }
  openModalCreateLocke() {
    console.log(this.groups());

    this.dialog.open(CreateLockeForm, {
      data: {
        groups: this.groups(),
      },
    });
  }
  private getLockes() {
    this.lockeService
      .getLockes()
      .then((res) => {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            this.lockesList.set(res.data);
          });
        } else {
          this.lockesList.set(res.data);
        }
      })
      .catch((err) => console.error(err));
  }
  private getGroups() {
    this.groupService
      .getGroupsCreated()
      .then((res) => {
        this.groups.set(res.data);
      })
      .catch((err) => console.error(err));
  }
}
