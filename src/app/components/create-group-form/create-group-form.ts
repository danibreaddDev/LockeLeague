import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { GroupService } from '../../core/services/group-service';
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-create-group-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-group-form.html',
  styleUrl: './create-group-form.css',
})
export class CreateGroupForm {
  form!: FormGroup;
  groupService = inject(GroupService);
  dialogRef = inject(DialogRef);
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.createGroup(this.form.value);
  }
  async createGroup(formValue: any) {
    const group = {
      name: formValue.name,
      description: formValue.description,
    };
    const { error } = await this.groupService.createGroup(group);
    if (error) {
      alert('hubo un error');
    }
    alert('se ha creado el grupo correctamente');
    this.dialogRef.close();
  }
}
