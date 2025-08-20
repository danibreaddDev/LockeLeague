import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RuleService } from '../../core/services/rule-service';

@Component({
  selector: 'app-create-rule-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-rule-form.html',
  styleUrl: './create-rule-form.css',
})
export class CreateRuleForm {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: { idLocke: string },
    private ruleService: RuleService
  ) {
    this.initForms();
  }
  initForms() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
    });
  }
  onSubmit() {
    if (!this.form.valid) {
      alert('incorrect form');
      return;
    }
    this.ruleService
      .createRule(this.form.value, this.data.idLocke)
      .then((res: any) => {
        if (!res.data) {
          alert('Rule created successfully');
          this.dialogRef.close(true);
        } else if (!res.data && res.error) {
          alert('error to create Rule');
        }
      });
  }
  CloseModal() {
    this.dialogRef.close();
  }
}
