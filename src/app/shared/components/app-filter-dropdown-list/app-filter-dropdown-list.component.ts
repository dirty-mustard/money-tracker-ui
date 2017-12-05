import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../models';

@Component({
  selector: 'app-filter-dropdown-list',
  templateUrl: './app-filter-dropdown-list.component.html',
  styleUrls: ['./app-filter-dropdown-list.component.scss']
})
export class AppFilterDropdownListComponent {

  @Input() filters: Filter[];
  @Output() onSelectedFilterChanged = new EventEmitter<Filter>();

  public onChange(filter: Filter) {
    this.onSelectedFilterChanged.emit(filter);
  }

}
