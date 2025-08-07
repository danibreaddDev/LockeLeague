import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LockeService } from '../../core/services/locke-service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-locke-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-locke-form.html',
  styleUrl: './edit-locke-form.css',
})
export class EditLockeForm {
  formAnnouncement!: FormGroup;
  formRule!: FormGroup;
  rules = signal<string[]>([]);
  constructor(
    private formBuilder: FormBuilder,
    private lockeService: LockeService,
    private dialogRef: DialogRef
  ) {
    this.initForms();
  }
  private initForms() {
    this.formAnnouncement = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      rules: [[]],
    });
    this.formRule = this.formBuilder.group({
      rule: ['', Validators.required],
    });
  }
  onSubmitRule() {
    if (!this.formRule.valid) {
      return;
    }
    this.addRule(this.formRule.value.rule);
  }
  deleteRule(rule: string) {
    console.log('borrar');

    this.rules.update((currentRules) => currentRules.filter((r) => r !== rule));
  }
  private addRule(rule: string) {
    this.rules.update((currentRules) => [...currentRules, rule]);
    this.formRule.reset();
  }
}
