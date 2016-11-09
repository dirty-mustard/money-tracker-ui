import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from "../shared";

@Component({
  moduleId: module.id,
  selector: 'mt-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.list();
  }

  onSubmit() {
  }

}
