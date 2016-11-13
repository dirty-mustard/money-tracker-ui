import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Filter, Tag } from "../../shared/model";
import { FilterFormService } from "../shared";

declare var _ : any;

@Component({
  selector: 'mt-filter-form',
  templateUrl: 'filters-form.component.html',
  styleUrls: ['filters-form.component.css']
})
export class FilterFormComponent {

  @Input('filter') filter: Filter = new Filter();
  @Input('errors') errors: Object = {};
  @Input('errorMessage') errorMessage: String;
  @Output('saveOnClick') saveEvent = new EventEmitter<Filter>();
  @Output('deleteOnClick') deleteEvent = new EventEmitter<Filter>();

  onSubmit() {
    this.saveEvent.emit(this.filter);
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.filter);
  }

  newFilterOnClick() {
    this.filter = new Filter();
  }

  containsErrors() : boolean {
    return _.keys(this.errors).length > 0;
  }

  hasError(field: string) {
    return _.contains(_.keys(this.errors), field);
  }

  getError(field: string) {
    return (this.hasError(field)) ? this.errors[field] : 'Unknown error.';
  }

}
