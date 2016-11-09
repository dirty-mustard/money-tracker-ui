import { Component, OnInit, Input } from '@angular/core';
import { Filter, FilterService } from "../shared";

@Component({
  moduleId: module.id,
  selector: 'mt-filter-form',
  templateUrl: 'filter-form.component.html',
  styleUrls: ['filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  _filter: Filter = null;
  submitted: boolean = false;

  constructor(private filterService: FilterService) { }

  @Input()
  set filter(filter: Filter) {
    this._filter = (filter) || new Filter();
  }

  get filter() { return this._filter; }

  ngOnInit(): void {
    this._filter = new Filter();

  }

  onSubmit() {
    this.submitted = true;
    this.filterService.create(this._filter);
  }

}
