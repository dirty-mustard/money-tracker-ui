import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Tag, ARCHIVED, LOCKED, UNTAGGED } from "../../shared/models";
import { Rule } from "../../shared/models";

declare var _ : any;

const MAX_AMOUNT_SUGGESTED_TAGS = 10;

@Component({
  selector: 'mt-rules-form',
  templateUrl: 'rules-form.component.html',
  styleUrls: ['rules-form.component.css']
})
export class RuleFormComponent implements OnChanges {

  @Input('editingMode') editingMode: boolean = false;
  @Input('collapsed') collapsed: boolean = false;
  @Input('rule') rule: Rule = new Rule();
  @Input('availableTags') availableTags: Tag[] = [];
  @Input('selectedTags') selectedTags : Tag[] = [];
  @Input('errors') errors: Object = {};
  @Input('errorMessage') errorMessage: String;
  @Output('saveOnClick') saveEvent = new EventEmitter<Rule>();
  @Output('deleteOnClick') deleteEvent = new EventEmitter<Rule>();

  public query = '';
  public filteredList = [];
  public tagsToShow : Tag[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (_.contains(_.keys(changes), 'rule')) {
      this._cleanTagFilter();
    }
  }

  tagsOnKeyUp() {
    this.tagsToShow = this.availableTags.filter((t: Tag) => {
      return this.selectedTags.filter((tag: Tag) => _.isEqual(tag, t)).length <= 0
    });

    this.filteredList = (this.query !== "")
      ? this.tagsToShow.filter((t: Tag) => {
          return t.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        })
      : [];
    this.filteredList = this.filteredList.slice(0, MAX_AMOUNT_SUGGESTED_TAGS);
  }

  archivedTransactionsOnClick() {
    (this.rule.hasOption(ARCHIVED))
        ? this.rule.removeOption(ARCHIVED)
        : this.rule.addOption(ARCHIVED);
  }

  untaggedTransactionsOnClick() {
    (this.rule.hasOption(UNTAGGED))
        ? this.rule.removeOption(UNTAGGED)
        : this.rule.addOption(UNTAGGED);
  }

  lockedTransactionsOnClick() {
    (this.rule.hasOption(LOCKED))
        ? this.rule.removeOption(LOCKED)
        : this.rule.addOption(LOCKED);
  }

  select(item: Tag) {
    this.query = "";
    this.selectedTags.push(item);
    this.filteredList = [];
  }

  remove(item: Tag) {
    let i = this.selectedTags.indexOf(item);
    if(i != -1) {
      this.selectedTags.splice(i, 1);
    }
  }

  onUpdate() {
    this.rule.tags = this.selectedTags;
    this.saveEvent.emit(this.rule);
  }

  onCreate() {
    this.rule.tags = this.selectedTags;
    this.saveEvent.emit(this.rule);
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.rule);
  }

  containsErrors() : boolean {
    return _.keys(this.errors).length > 0;
  }

  hasError(field: string) {
    return _.contains(_.keys(this.errors), field);
  }

  _cleanTagFilter(clearSelectedTags = false) {
    this.query = '';
    this.filteredList = [];
    this.tagsToShow = [];
    if (clearSelectedTags) {
      this.selectedTags = [];
    }
  }

  getError(field: string) {
    return (this.hasError(field)) ? this.errors[field] : 'Unknown error.';
  }

}
