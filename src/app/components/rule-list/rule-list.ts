import { Component, Input } from '@angular/core';
import { RuleCard } from '../rule-card/rule-card';

@Component({
  selector: 'app-rule-list',
  imports: [RuleCard],
  templateUrl: './rule-list.html',
  styleUrl: './rule-list.css',
})
export class RuleList {
  @Input() rules!: any;
}
