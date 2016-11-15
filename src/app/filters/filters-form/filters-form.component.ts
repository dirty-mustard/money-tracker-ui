import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Filter } from "../../shared/model";

import { Tag } from "../../shared/model/tag.model";

declare var _ : any;

const MAX_AMOUNT_SUGGESTED_TAGS = 10;

@Component({
  selector: 'mt-filter-form',
  templateUrl: 'filters-form.component.html',
  styleUrls: ['filters-form.component.css']
})
export class FilterFormComponent implements OnChanges {

  @Input('collapsed') collapsed: boolean = false;
  @Input('filter') filter: Filter = new Filter();
  @Input('availableTags') availableTags: Tag[] = [];
  @Input('selectedTags') selectedTags : Tag[] = [];
  @Input('errors') errors: Object = {};
  @Input('errorMessage') errorMessage: String;
  @Output('saveOnClick') saveEvent = new EventEmitter<Filter>();
  @Output('deleteOnClick') deleteEvent = new EventEmitter<Filter>();

  public query = '';
  public filteredList = [];
  public tagsToShow : Tag[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (_.contains(_.keys(changes), 'filter')) {
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

  select(item: Tag){
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

  onSubmit() {
    this.filter.tags = this.selectedTags;
    this.saveEvent.emit(this.filter);
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.filter);
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
