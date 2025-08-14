import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { RuleService } from '../../../../core/services/rule-service';
import { RuleList } from '../../../../components/rule-list/rule-list';
import { Loader } from '../../../../shared/components/loader/loader';
import { CreateRuleForm } from '../../../../components/create-rule-form/create-rule-form';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [RuleList, Loader],
  templateUrl: './rules.html',
  styleUrl: './rules.css',
})
export class Rules {
  idLocke: Signal<string> = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  rules = signal<any | null>(null);
  constructor(private dialog: Dialog, private ruleService: RuleService) {
    this.getRules();
  }
  openModalCreateRule() {
    const dialogRef = this.dialog.open(CreateRuleForm, {
      disableClose: true,
    });
  }
  getRules() {
    this.ruleService.getRules(this.idLocke()).then((res) => {
      if (res.data) {
        this.rules.set(res.data);
      } else if (!res.data && res.error) alert(res.error.message);
    });
  }
}
