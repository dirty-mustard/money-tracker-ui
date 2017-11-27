import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { Tag, ARCHIVED, LOCKED, UNTAGGED } from '../../shared/models';
import { Filter } from '../../shared/models';

declare const _: any;

const MAX_AMOUNT_SUGGESTED_TAGS = 10;

@Component({
  selector: 'mt-filters-form',
  templateUrl: 'filters-form.component.html',
  styleUrls: ['filters-form.component.css']
})
export class FiltersFormComponent implements OnChanges {

  @Input('editingMode') editingMode = false;
  @Input('collapsed') collapsed = false;
  @Input('filter') filter: Filter = new Filter();
  @Input('availableTags') availableTags: Tag[] = [];
  @Input('selectedTags') selectedTags: Tag[] = [];
  @Input('errors') errors: Object = {};
  @Input('errorMessage') errorMessage: String;
  @Output() saveEvent = new EventEmitter<Filter>();
  @Output() deleteEvent = new EventEmitter<Filter>();

  public query = '';
  public filteredList: any[] = [];
  public tagsToShow: Tag[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (_.contains(_.keys(changes), 'filter')) {
      this._cleanTagFilter();
    }
  }

  tagsOnKeyUp() {
    this.tagsToShow = this.availableTags.filter((t: Tag) => {
      return this.selectedTags.filter((tag: Tag) => _.isEqual(tag, t)).length <= 0;
    });

    this.filteredList = (this.query !== '')
      ? this.tagsToShow.filter((t: Tag) => {
          return t.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        })
      : [];
    this.filteredList = this.filteredList.slice(0, MAX_AMOUNT_SUGGESTED_TAGS);
  }

  archivedTransactionsOnClick() {
    (this.filter.hasOption(ARCHIVED))
        ? this.filter.removeOption(ARCHIVED)
        : this.filter.addOption(ARCHIVED);
  }

  untaggedTransactionsOnClick() {
    (this.filter.hasOption(UNTAGGED))
        ? this.filter.removeOption(UNTAGGED)
        : this.filter.addOption(UNTAGGED);
  }

  lockedTransactionsOnClick() {
    (this.filter.hasOption(LOCKED))
        ? this.filter.removeOption(LOCKED)
        : this.filter.addOption(LOCKED);
  }

  select(item: Tag) {
    this.query = '';
    this.selectedTags.push(item);
    this.filteredList = [];
  }

  remove(item: Tag) {
    const i = this.selectedTags.indexOf(item);
    if (i !== -1) {
      this.selectedTags.splice(i, 1);
    }
  }

  onUpdate() {
    this.filter.tags = this.selectedTags;
    this.saveEvent.emit(this.filter);
  }

  onCreate() {
    this.filter.tags = this.selectedTags;
    this.saveEvent.emit(this.filter);
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.filter);
  }

  containsErrors(): boolean {
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
