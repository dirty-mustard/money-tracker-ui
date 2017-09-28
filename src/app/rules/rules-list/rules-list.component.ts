import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Rule } from "../../shared/models";

declare var _ : any;

@Component({
  selector: 'mt-rule-list',
  templateUrl: 'rules-list.component.html',
  styleUrls: ['rules-list.component.css']
})
export class RuleListComponent {

  @Input('selectedRule') selectedRule: Rule = new Rule();
  @Input('rules') rules: Rule[] = [];
  @Output('onRuleSelected') onRuleSelectedEvent = new EventEmitter<number>();
  @Output('newOnClick') newOnClickEvent = new EventEmitter();
  @Output('toggleRuleDetailsOnClick') toggleRuleDetailsOnClick = new EventEmitter();

  errorMessage: any = null;

  onRuleSelected(ruleId: number) {
    this.onRuleSelectedEvent.emit(ruleId);
  }

  toggleRuleDetails() {
    this.toggleRuleDetailsOnClick.emit();
  }

  newRuleOnClick() {
    this.newOnClickEvent.emit();
  }

}
