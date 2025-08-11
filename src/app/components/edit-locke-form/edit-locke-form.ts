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
  formLifes!: FormGroup;
  formNextEvent!: FormGroup;
  formStatus!: FormGroup;
  formRule!: FormGroup;
  infoLocke = signal<any>(null);
  lifes = signal<number>(0);
  nextEvent = signal<string>('');
  status = signal<string>('');
  announcement = signal<any>(null);
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
    });
    this.formRule = this.formBuilder.group({
      rule: ['', Validators.required],
    });
    this.formLifes = this.formBuilder.group({
      lifes: [1, [Validators.required, Validators.min(1)]],
    });
    this.formStatus = this.formBuilder.group({
      status: ['', Validators.required],
    });
    this.formNextEvent = this.formBuilder.group({
      event: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  onSubmitRule() {
    if (!this.formRule.valid) {
      return;
    }
    this.addRule(this.formRule.value.rule);
  }
  onSubmitAnnouncement() {
    if (!this.formAnnouncement.valid) {
      return;
    }
    //construir objeto con titulo,descripcion y reglas.
  }
  onSubmitLifes() {
    if (!this.formLifes.valid) {
      return;
    }
  }
  onSubmitEvent() {
    if (!this.formNextEvent.valid) {
      return;
    }
  }
  onSubmitStatusLocke() {
    if (!this.formStatus.valid) {
      return;
    }
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
