import { Component, effect, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GroupService } from '../../core/services/group-service';

@Component({
  selector: 'app-locke-card',
  imports: [RouterLink],
  templateUrl: './locke-card.html',
  styleUrl: './locke-card.css',
})
export class LockeCard {
  @Input() locke!: any;
  nameLocke = signal<string>('');
  constructor(private groupService: GroupService) {
    effect(() => {
      this.getGroupName(this.locke.locke.group_id);
    });
  }
  getFormatted(pokemon: string) {
    if (pokemon.length === 1) {
      return '00' + pokemon;
    }
    if (pokemon.length === 2) {
      return '0' + pokemon;
    } else {
      return pokemon;
    }
  }
  getGroupName(groupId: string) {
    this.groupService
      .getGroupName(groupId)
      .then((res: any) => {
        console.log(res.data[0].name);
        this.nameLocke.set(res.data[0].name);
      })
      .catch((err) => console.error(err));
  }
}
