import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
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
  @Input() users!: WritableSignal<profile[]>;
  @Input() groups!: WritableSignal<[]>;
  @Input() groupSelected!: WritableSignal<any>;
  isMyGrouposShowed: boolean = true;
  isOtherGrouposShowed: boolean = false;

  clickModal() {
    this.clickOpenModal.emit();
  }
  showMyGroups() {
    this.isMyGrouposShowed = true;
    this.isOtherGrouposShowed = false;
  }
  showOtherGroups() {
    this.isMyGrouposShowed = false;
    this.isOtherGrouposShowed = true;
  }
  getGroupSelected(group: any) {
    this.groupSelected.set(group);
  }
}
