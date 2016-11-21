import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Filter } from "../../shared/models";

declare var _ : any;

@Component({
  selector: 'mt-filter-list',
  templateUrl: 'filters-list.component.html',
  styleUrls: ['filters-list.component.css']
})
export class FiltersListComponent {

  @Input('selectedFilter') selectedFilter: Filter = new Filter();
  @Input('filters') filters: Filter[] = [];
  @Output('onFilterSelected') onFilterSelectedEvent = new EventEmitter<number>();
  @Output('newOnClick') newOnClickEvent = new EventEmitter();
  @Output('toggleFilterDetailsOnClick') toggleFilterDetailsOnClick = new EventEmitter();

  errorMessage: any = null;

  onFilterSelected(filterId: number) {
    this.onFilterSelectedEvent.emit(filterId);
  }

  toggleFilterDetails() {
    this.toggleFilterDetailsOnClick.emit();
  }

  newFilterOnClick() {
    this.newOnClickEvent.emit();
  }

}
