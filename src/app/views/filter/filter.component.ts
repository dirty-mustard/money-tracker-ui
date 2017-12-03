import { Component, OnInit } from '@angular/core';

import { FilterService } from '../../shared';
import { Filter } from '../../shared/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filters: Filter[] = [];

  public onFilterSelected(filter: Filter) {
    console.log(`Clicked on filter ${filter.id}`);
  }

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.list().subscribe((filters: Filter[]) => this.filters = filters);
  }

}
