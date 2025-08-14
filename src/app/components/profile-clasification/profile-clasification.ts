import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserSelect } from '../user-select/user-select';
import { profile } from '../../interfaces/user';
import { Loader } from '../../shared/components/loader/loader';
import { TableClasification } from './components/table-clasification/table-clasification';

@Component({
  selector: 'app-profile-clasification',
  imports: [UserSelect, Loader, TableClasification],
  templateUrl: './profile-clasification.html',
  styleUrl: './profile-clasification.css',
})
export class ProfileClasification {
  @Output() clickOpenModal = new EventEmitter<void>();
  @Output() usersToAdd = new EventEmitter<profile[]>();
  @Output() onClickMyGroups = new EventEmitter<void>();
  @Output() onClickJoinedGroups = new EventEmitter<void>();
  @Input() users!: WritableSignal<profile[]>;
  @Input() groups!: WritableSignal<[]>;
  @Input() groupSelected!: WritableSignal<any>;

  isMyGrouposShowed: boolean = true;
  isOtherGrouposShowed: boolean = false;

  constructor() {
    console.log('dentro de padre', this.groupSelected);
  }

  clickModal() {
    this.clickOpenModal.emit();
  }
  showMyGroups() {
    this.isMyGrouposShowed = true;
    this.isOtherGrouposShowed = false;
    this.onClickMyGroups.emit();
  }
  showOtherGroups() {
    this.isMyGrouposShowed = false;
    this.isOtherGrouposShowed = true;
    this.onClickJoinedGroups.emit();
  }
  getGroupSelected(group: any) {
    this.groupSelected.set(group);
  }
}
