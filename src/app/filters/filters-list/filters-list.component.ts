import { OnInit, Component, Input, Output, EventEmitter } from "@angular/core";
import { Filter } from "../../shared/model";

@Component({
  selector: 'mt-filter-list',
  templateUrl: 'filters-list.component.html',
  styleUrls: ['filters-list.component.css']
})
export class FilterListComponent {

  @Input('selectedFilter') selectedFilter: Filter = new Filter();
  @Input('filters') filters: Filter[] = [];
  @Output('onFilterSelected') onFilterSelectedEvent = new EventEmitter<number>();
  @Output('newOnClick') newOnClickEvent = new EventEmitter();
  errorMessage: any = null;

  onFilterSelected(filterId: number) {
    this.onFilterSelectedEvent.emit(filterId);
  }

  newFilterOnClick() {
    this.newOnClickEvent.emit();
  }

}
