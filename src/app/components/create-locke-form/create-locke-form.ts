import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LockeService } from '../../core/services/locke-service';

@Component({
  selector: 'app-create-locke-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-locke-form.html',
  styleUrl: './create-locke-form.css',
})
export class CreateLockeForm implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    private lockeService: LockeService,
    @Inject(DIALOG_DATA) public data: { groups: any }
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
    if (!this.form.valid) {
      alert('incorrect Form');
      return;
    }

    this.createLocke(this.form.value);
  }
  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lifes: [0, [Validators.required, Validators.min(0)]],
      group_id: [null, [Validators.required]],
    });
  }
  private createLocke(lockeObj: any) {
    this.lockeService.createLocke(lockeObj).then((res) => {
      if (!res.data && !res.error) {
        this.dialogRef.close(true);
        return;
      } else if (res.error) {
        alert(res.error);
      }
    });
  }
}
