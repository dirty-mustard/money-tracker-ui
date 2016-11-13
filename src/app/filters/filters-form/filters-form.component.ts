import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Filter } from "../shared";

@Component({
  selector: 'mt-filter-form',
  templateUrl: 'filters-form.component.html',
  styleUrls: ['filters-form.component.css']
})
export class FilterFormComponent {

  @Input('filter') filter: Filter = new Filter();
  @Output('saveOnClick') saveEvent = new EventEmitter<Filter>();
  @Output('deleteOnClick') deleteEvent = new EventEmitter<Filter>();
  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;
    this.saveEvent.emit(this.filter);
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.filter);
  }

  newFilterOnClick() {
    console.log('neww');
    this.filter = new Filter();
    this.submitted = false;
  }

}
