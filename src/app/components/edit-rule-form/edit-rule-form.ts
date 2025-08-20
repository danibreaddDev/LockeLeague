import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RuleService } from '../../core/services/rule-service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-rule-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-rule-form.html',
  styleUrl: './edit-rule-form.css',
})
export class EditRuleForm {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(DIALOG_DATA) public data: { rule: any },
    private ruleService: RuleService,
    private dialogRef: DialogRef
  ) {
    this.initForms();
  }
  CloseModal() {
    this.dialogRef.close();
  }
  initForms() {
    this.form = this.formBuilder.group({
      title: [
        this.data.rule.title,
        [Validators.required, Validators.maxLength(15)],
      ],
      description: [
        this.data.rule.description,
        [Validators.required, Validators.minLength(15)],
      ],
    });
  }
  onSubmit() {
    if (!this.form.valid) {
      alert('incorrect form');
      return;
    }
    const newRule = {
      id: this.data.rule.id,
      title: this.form.value.title,
      description: this.form.value.description,
    };
    console.log(newRule);

    this.ruleService.updateRule(newRule).then((res) => {
      if (!res.data) {
        alert('Rule updated successfully');
        this.dialogRef.close(true);
      } else if (!res.data && res.error) {
        alert('error');
      }
    });
  }
}
