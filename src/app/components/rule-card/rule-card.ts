import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RuleService } from '../../core/services/rule-service';

@Component({
  selector: 'app-rule-card',
  imports: [ReactiveFormsModule],
  templateUrl: './rule-card.html',
  styleUrl: './rule-card.css',
})
export class RuleCard {
  @Input() idLocke!: string;
  @Input() rule!: any;
  @Input() index: number = 0;
  @Output() onShowEditRuleForm = new EventEmitter<any>();
  @Output() onDeleteRule = new EventEmitter<void>();
  form!: FormGroup;
  isEditable = signal<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private ruleService: RuleService
  ) {}
}
