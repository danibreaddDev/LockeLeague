import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LockeService } from '../../core/services/locke-service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-locke-form',
  imports: [],
  templateUrl: './edit-locke-form.html',
  styleUrl: './edit-locke-form.css',
})
export class EditLockeForm {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private lockeService: LockeService,
    private dialogRef: DialogRef
  ) {}
}
