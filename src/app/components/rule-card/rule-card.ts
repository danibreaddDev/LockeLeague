import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rule-card',
  imports: [],
  templateUrl: './rule-card.html',
  styleUrl: './rule-card.css',
})
export class RuleCard {
  @Input() rule!: any;
  @Input() index: number = 0;
}
