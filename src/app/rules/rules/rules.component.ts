import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Error } from "../../shared";
import { Rule, Tag } from "../../shared/models";
import { RulesFormService } from "../shared";

declare var _ : any;

@Component({
  selector: 'mt-rule',
  templateUrl: 'rules.component.html',
  styleUrls: ['rules.component.css']
})
export class RulesComponent implements OnInit, OnChanges {

  @Input('ruleFormCollapsed') ruleFormCollapsed: boolean = false;
  @Input('ruleId') ruleId: number;
  @Output('ruleOnChange') ruleOnChange : EventEmitter<number> = new EventEmitter<number>();

  rule: Rule = new Rule();
  availableRules: Rule[] = [];
  tags: Tag[] = [];

  errorMessage: string;
  errors: Object = {};

  constructor(private ruleFormService: RulesFormService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (_.contains(_.keys(changes), 'ruleId')) {

      (!_.isUndefined(this.ruleId))
          ? this._loadRule(this.ruleId)
          : this.rule = new Rule();
    }
  }

  ngOnInit(): void {
    if (!_.isUndefined(this.ruleId)) {
      this._loadRule(this.ruleId);
    }
    this._loadRules();
    this._loadTags();
  }

  public newOnClick() {
    this.rule = new Rule();
    this.clearErrors();
  }

  public deleteOnClick(rule) {
    this.ruleFormService.delete(rule).subscribe(this.deleteSuccessHandler.bind(this));
  }

  public onRuleSelected(ruleId: number) {
    this.ruleOnChange.emit(ruleId);
    this._loadRule(ruleId);
  }

  public toggleRuleDetailsOnClick() {
    this.ruleFormCollapsed = !this.ruleFormCollapsed;
  }

  public saveOnClick(rule: Rule) {
    _.bindAll(this, 'successHandler', 'errorHandler');
    (_.isUndefined(rule.id))
      ? this.ruleFormService.create(rule).subscribe(this.successHandler, this.errorHandler)
      : this.ruleFormService.update(rule).subscribe(this.successHandler, this.errorHandler);
  }

  private deleteSuccessHandler() {
    this.successHandler(new Rule());
  }

  private successHandler(r: Rule) {
    this.rule = r;
    this._loadRules();
    this.clearErrors();
  }

  clearErrors() {
    this.errors = {};
    this.errorMessage = null;
  }

  private errorHandler(error: Error) {
    this.errorMessage  = error.error;
    _.each(_.keys(error.errorDetails), (t: string) => this.errors[t] = error.errorDetails[t]);
  }

  private _loadRule(ruleId: number) {
    this.ruleFormService.get(ruleId).subscribe((r: Rule) => {
      this.rule = r;
    });
  }

  private _loadRules() {
    this.ruleFormService.listRules().subscribe((r: Rule[]) => this.availableRules = r);
  }

  private _loadTags() {
    this.ruleFormService.listTags().subscribe((t: Tag[]) => this.tags = t);
  }

}
