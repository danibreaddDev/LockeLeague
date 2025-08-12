import { Component, Inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LockeService } from '../../core/services/locke-service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

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

  lifes = signal<number>(0);
  nextEvent = signal<string>('');
  status = signal<string>('');
  announcement = signal<any>(null);
  rules = signal<string[]>([]);
  isSubmitted = signal<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private lockeService: LockeService,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: { infoLocke: any }
  ) {
    this.setInfo(data);
    this.initForms();
  }
  private setInfo(data: any) {
    this.lifes.set(data.infoLocke.lifes);
    this.nextEvent.set(data.infoLocke.next_event);
    this.status.set(data.infoLocke.status);
    if (data.infoLocke.announcement === null) {
      this.announcement.set({
        title: null,
        description: null,
      });
      this.rules.set([]);
    } else {
      this.announcement.set(data.infoLocke.announcement);
      this.rules.set(this.data.infoLocke.announcement.rules);
    }
  }
  private initForms() {
    this.formAnnouncement = this.formBuilder.group({
      title: [this.announcement().title, Validators.required],
      description: [this.announcement().description, Validators.required],
    });
    this.formRule = this.formBuilder.group({
      rule: ['', Validators.required],
    });
    this.formLifes = this.formBuilder.group({
      lifes: [this.lifes(), [Validators.required, Validators.min(1)]],
    });
    this.formStatus = this.formBuilder.group({
      status: [this.status(), Validators.required],
    });
    this.formNextEvent = this.formBuilder.group({
      event: [
        this.nextEvent(),
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  closeModal() {
    this.dialogRef.close(this.isSubmitted());
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
    const formAnnouncementObj = {
      title: this.formAnnouncement.value.title,
      description: this.formAnnouncement.value.description,
      rules: this.rules(),
    };
    this.lockeService
      .updateAnnouncement(formAnnouncementObj, this.data.infoLocke.id)
      .then((res) => {
        if (!res.data) {
          this.isSubmitted.set(true);
          alert('Announcement updated successfully');
        } else if (res.error) {
          alert('error');
        }
      });
  }
  onSubmitLifes() {
    if (!this.formLifes.valid) {
      return;
    }

    this.lockeService
      .updateLifesLocke(
        Number(this.formLifes.value.lifes),
        this.data.infoLocke.id
      )
      .then((res) => {
        if (!res.data) {
          this.isSubmitted.set(true);
          alert('Lifes updated successfully');
        } else if (res.error) {
          alert('Error');
        }
      });
  }
  onSubmitEvent() {
    if (!this.formNextEvent.valid) {
      return;
    }
    this.lockeService
      .updateCurrentEvent(
        this.formNextEvent.value.event,
        this.data.infoLocke.id
      )
      .then((res) => {
        if (!res.data) {
          this.isSubmitted.set(true);
          alert('Event updated successfully');
        } else if (res.error) {
          alert('error');
        }
      });
  }
  onSubmitStatusLocke() {
    if (!this.formStatus.valid) {
      return;
    }
    console.log(this.formStatus.value);
  }
  deleteAnnouncement() {
    this.lockeService
      .updateAnnouncement(null, this.data.infoLocke.id)
      .then((res) => {
        if (!res.data) {
          this.isSubmitted.set(true);
          alert('Announcement deleted successfully');
        } else if (res.error) {
          alert('error');
        }
      });
  }
  deleteRule(rule: string) {
    this.rules.update((currentRules) => currentRules.filter((r) => r !== rule));
  }
  private addRule(rule: string) {
    this.rules.update((currentRules) => [...currentRules, rule]);
    this.formRule.reset();
  }
}
