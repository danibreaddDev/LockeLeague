import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GroupService } from '../../../../core/services/group-service';

@Component({
  selector: 'app-table-clasification',
  imports: [],
  templateUrl: './table-clasification.html',
  styleUrl: './table-clasification.css',
})
export class TableClasification implements OnChanges {
  @Input() groupSelected!: any;
  stats!: any;
  constructor(private groupService: GroupService) {}
  ngOnChanges() {
    this.getGroup(this.groupSelected.id);
  }
  private async getGroup(id: string) {
    console.log(id);

    this.groupService
      .getGroupStats(id)
      .then((res) => {
        console.log(res);
        this.stats = res.data;
      })
      .catch((error) => console.error(error));
  }
}
