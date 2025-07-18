import { Component, computed, Inject, signal } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { getFormatted } from '../../../utils/functions';
@Component({
  selector: 'app-edit-pokemon-form',
  imports: [],
  templateUrl: './edit-pokemon-form.html',
  styleUrl: './edit-pokemon-form.css',
})
export class EditPokemonForm {
  count = signal(4);
  indices = computed(() => Array.from({ length: this.count() }, (_, i) => i));
  getformatedName = getFormatted;
  constructor(@Inject(DIALOG_DATA) public data: { id: any }) {}
}
