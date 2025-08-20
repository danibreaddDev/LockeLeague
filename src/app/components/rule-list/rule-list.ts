import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleCard } from '../rule-card/rule-card';

@Component({
  selector: 'app-rule-list',
  imports: [RuleCard],
  templateUrl: './rule-list.html',
  styleUrl: './rule-list.css',
})
export class RuleList {
  @Input() rules!: any;
  @Input() idLocke!: string;
  @Output() onShowEditRuleForm = new EventEmitter<any>();
  @Output() onDeleteRule = new EventEmitter<any>();
}
