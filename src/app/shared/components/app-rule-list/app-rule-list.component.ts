import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rule } from '../../models';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-rule-list',
  templateUrl: './app-rule-list.component.html',
  styleUrls: ['./app-rule-list.component.scss']
})
export class AppRuleListComponent {

  @Input() rules: Rule[] = [];
  @Output() ruleSelected = new EventEmitter<Rule>();

  ruleOnClick(rule: Rule) {
    this.ruleSelected.emit(rule);
  }

  public tagsAsString(rule: Rule): string[] {
    return rule.tagsToApply.map((t: Tag) => t.name).join(',');
  }

}
