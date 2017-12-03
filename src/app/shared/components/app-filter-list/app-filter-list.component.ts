import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../models/filter.model';

@Component({
  selector: 'app-filter-list',
  templateUrl: './app-filter-list.component.html',
  styleUrls: ['./app-filter-list.component.scss']
})
export class AppFilterListComponent {

  @Input() filters: Filter[] = [];
  @Output() filterSelected = new EventEmitter<Filter>();

  filterOnClick(filter: Filter) {
    this.filterSelected.emit(filter);
  }

}
