import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TournamentService } from '../../core/services/tournament-service';

@Component({
  selector: 'app-create-tournament-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-tournament-form.html',
  styleUrl: './create-tournament-form.css',
})
export class CreateTournamentForm {
  form!: FormGroup;
  formRules!: FormGroup;
  rules = signal<string[]>([]);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: { idLocke: string },
    private tournamentService: TournamentService
  ) {
    this.initForm();
  }
  closeModal() {
    this.dialogRef.close();
  }
  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.formRules = this.formBuilder.group({
      rule: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }
  onSubmitRules() {
    if (
      this.rules().includes(this.formRules.value.rule) ||
      !this.formRules.valid
    ) {
      return;
    }
    this.rules.set([
      ...this.rules(),
      this.formRules.value.rule.toString().toUpperCase(),
    ]);
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const tournamentData = {
      ...this.form.value,
      locke_id: this.data.idLocke,
      rules: this.rules(),
      status: 'draft',
    };
    this.tournamentService.createTournament(tournamentData).then((res) => {
      if (res.error) {
        alert('Error creating tournament: ' + res.error.message);
      } else {
        alert('Tournament created successfully');
        this.dialogRef.close(true);
      }
    });
  }
  deleteRule(rule: string) {
    this.rules.set(this.rules().filter((r) => r !== rule));
  }
}
