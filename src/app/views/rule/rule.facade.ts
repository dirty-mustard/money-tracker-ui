import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';

import {
  FilterService,
  TagService,
  RuleService,
  Rule,
  Tag,
  Filter
} from '../../shared';

@Injectable()
export class RuleFacade {

  constructor(private ruleService: RuleService,
              private tagService: TagService,
              private filterService: FilterService) {}

  public list(): Observable<Rule[]> {

    return this.ruleService.list().concatMap((rules: Rule[]) => {
      rules.map((rule: Rule) => {
        this.tagService.getByList(rule.tagsToApply).subscribe((tags: Tag[]) => rule.tagsToApply = tags);
        this.filterService.get(rule.filter).subscribe((filter: Filter) => rule.filter = filter);
      });

      return Observable.of(rules);
    });
  }
}
