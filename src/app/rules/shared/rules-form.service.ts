import { Injectable } from "@angular/core";
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Rule, Tag } from '../../shared/models';
import { RulesService, TagsService } from "../../shared/services";

declare var _ : any;

@Injectable()
export class RulesFormService {

  constructor(private ruleService: RulesService, private tagService: TagsService) {}

  public get(id: number): Observable<Rule> {
    return this.ruleService.get(id)
      .flatMap(
        (rule: Rule) => {
          let tagIds = _.map(rule.tags, (t: Tag) => { return t; });
          return (tagIds.length > 0)
            ? Observable.forkJoin(Observable.of(rule), this.tagService.getByList(tagIds))
            : Observable.forkJoin(Observable.of(rule), Observable.of<Tag[]>([]));
        }
      ).map(
        (ruleDetails: Rule) => {
          let rule: Rule = ruleDetails[0];
          if (!_.isUndefined(ruleDetails[1])
            && _.isArray(ruleDetails[1])
            && ruleDetails[1].length > 0
          ) {
            rule.tags = ruleDetails[1];
          }

          return rule;
        }
      );
  }

  public listTags(): Observable<Tag[]> {
    return this.tagService.list();
  }

  public listRules(): Observable<Rule[]> {
    return this.ruleService.list();
  }

  public create(rule: Rule): Observable<Rule> {
    let r = rule;
    r.tags = r.tags.map((t: Tag) => { return t.id });
    return this.ruleService.create(rule)
      .flatMap(
        (rule: Rule) => {
          let tagIds = _.map(rule.tags, (t: Tag) => { return t; });
          return (tagIds.length > 0)
            ? Observable.forkJoin(Observable.of(rule), this.tagService.getByList(tagIds))
            : Observable.forkJoin(Observable.of(rule), Observable.of<Tag[]>([]));
        }
      ).map(
        (ruleDetails: Rule) => {
          let rule: Rule = ruleDetails[0];
          if (!_.isUndefined(ruleDetails[1])
              && _.isArray(ruleDetails[1])
              && ruleDetails[1].length > 0
          ) {
            rule.tags = ruleDetails[1];
          }

          return rule;
        }
      );
  }

  public update(rule: Rule) : Observable<Rule> {
    let r = rule;
    r.tags = r.tags.map((t: Tag) => { return t.id });
    return this.ruleService.update(r)
      .flatMap(
        (rule: Rule) => {
          let tagIds = _.map(rule.tags, (t: Tag) => { return t; });
          return (tagIds.length > 0)
              ? Observable.forkJoin(Observable.of(rule), this.tagService.getByList(tagIds))
              : Observable.forkJoin(Observable.of(rule), Observable.of<Tag[]>([]));
        }
      ).map(
        (ruleDetails: Rule) => {
          let rule: Rule = ruleDetails[0];
          if (!_.isUndefined(ruleDetails[1])
              && _.isArray(ruleDetails[1])
              && ruleDetails[1].length > 0
          ) {
            rule.tags = ruleDetails[1];
          }

          return rule;
        }
      );
  }

  public delete(rule: Rule) : Observable<Response> {
    return this.ruleService.delete(rule);
  }

}
