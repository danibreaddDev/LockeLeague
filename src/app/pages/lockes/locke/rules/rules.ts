import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { RuleService } from '../../../../core/services/rule-service';
import { RuleList } from '../../../../components/rule-list/rule-list';
import { Loader } from '../../../../shared/components/loader/loader';
import { CreateRuleForm } from '../../../../components/create-rule-form/create-rule-form';
import { EditRuleForm } from '../../../../components/edit-rule-form/edit-rule-form';

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
      data: {
        idLocke: this.idLocke(),
      },
    });
    dialogRef.closed.subscribe((res) => {
      const wasSubmitted = res as boolean | undefined;
      if (wasSubmitted) {
        this.getRules();
      }
    });
  }
  OpenModalEditRule(rule: any) {
    const dialogRef = this.dialog.open(EditRuleForm, {
      disableClose: true,
      data: {
        rule: rule,
      },
    });
    dialogRef.closed.subscribe((res) => {
      const wasSubmitted = res as boolean | undefined;
      if (wasSubmitted) {
        this.getRules();
      }
    });
  }
  deleteRule(rule: any) {
    if (!window.confirm('are you sure of delete this rule')) {
      return;
    }
    this.ruleService.deleteRule(rule.id).then((res) => {
      if (res.error) {
        alert('error: ' + res.error.message);
        return;
      }
      alert('rule deleted successfully');
      this.getRules();
    });
  }
  getRules() {
    this.ruleService.getRules(this.idLocke()).then((res) => {
      if (res.error) {
        alert('error: ' + res.error.message);
        return;
      }
      this.rules.set(res.data);
    });
  }
}
