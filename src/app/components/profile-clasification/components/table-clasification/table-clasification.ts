import { Component, Input, OnChanges, signal } from '@angular/core';
import { GroupService } from '../../../../core/services/group-service';
import { UserService } from '../../../../core/services/user-service';
import { Loader } from '../../../../shared/components/loader/loader';

@Component({
  selector: 'app-table-clasification',
  imports: [Loader],
  templateUrl: './table-clasification.html',
  styleUrl: './table-clasification.css',
})
export class TableClasification implements OnChanges {
  @Input() groupSelected!: any;
  stats = signal<any[] | undefined | null>(null);
  users: any = [];

  constructor(
    private groupService: GroupService,
    private userService: UserService
  ) {}
  ngOnChanges() {
    //reiniciar estado de los stats al cambiar de grupo
    this.stats.set(null);
    this.getGroup(this.groupSelected.id);
  }
  private async getGroup(id: string) {
    this.groupService
      .getGroupStats(id)
      .then((res) => {
        const stats = res.data;
        if (!stats || !stats.length) return;
        return Promise.all(
          stats.map(async (stat) => {
            try {
              const userResponse = await this.userService.getUser(stat.user_id);
              const user = userResponse.data;
              if (!user) return;
              return {
                name: user[0].name,
                avatar_url: user[0].avatar_url,
                ...stat,
              };
            } catch (error) {}
          })
        );
      })
      .then((mappedStats) => {
        this.stats.set(mappedStats);
      })
      .catch((error) => console.error(error));
  }
}
