import { Component, OnInit } from '@angular/core';

import {
  Rule,
} from '../../shared';
import { RuleFacade } from './rule.facade';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  public rules: Rule[] = [];

  constructor(private ruleFacade: RuleFacade) { }

  ngOnInit() {
    this.ruleFacade.list().subscribe((rules: Rules[]) => this.rules = rules);
  }

  onRuleSelectedHandler(rule: Rule) {
    console.log(`Clicked on rule ${rule.id}`);
  }

}
