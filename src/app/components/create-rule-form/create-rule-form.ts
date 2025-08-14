import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-rule-form',
  imports: [],
  templateUrl: './create-rule-form.html',
  styleUrl: './create-rule-form.css',
})
export class CreateRuleForm {
  constructor(private dialogRef: DialogRef) {}
  CloseModal() {
    this.dialogRef.close();
  }
}
