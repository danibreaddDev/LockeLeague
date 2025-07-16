import { CommonModule } from '@angular/common';
import { Component, Input, WritableSignal } from '@angular/core';
import { LockeCard } from '../locke-card/locke-card';
import { Loader } from '../../shared/components/loader/loader';
@Component({
  selector: 'app-locke-list',
  imports: [CommonModule, LockeCard, Loader],
  templateUrl: './locke-list.html',
  styleUrl: './locke-list.css',
})
export class LockeList {
  @Input() lockeList!: WritableSignal<any[] | null | undefined>;
}
