import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-create-locke-form',
  imports: [],
  templateUrl: './create-locke-form.html',
  styleUrl: './create-locke-form.css',
})
export class CreateLockeForm {
  constructor(
    private dialog: DialogRef,
    @Inject(DIALOG_DATA) public data: { groups: any }
  ) {}
}
