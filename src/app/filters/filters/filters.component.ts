import { Component, OnInit } from '@angular/core';
import { Filter } from "../shared";
import { FilterService } from "../shared";
import { ActivatedRoute } from "@angular/router";
import { isUndefined } from "util";

declare var _ : any;

@Component({
  selector: 'mt-filter',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css']
})
export class FiltersComponent implements OnInit {

  filter: Filter = new Filter();
  filters: Filter[] = [];

  constructor(private filterService: FilterService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.filterService.get(params['id']).subscribe((f: Filter) => this.filter = f);
    });
    this._loadFilters();
  }

  public deleteOnClick(filter) {
    this.filterService.delete(filter).subscribe(this.deleteSuccessHandler.bind(this));
  }

  public saveOnClick(filter) {
    _.bindAll(this, 'successHandler');
    (isUndefined(filter.id))
      ? this.filterService.create(filter).subscribe(this.successHandler)
      : this.filterService.update(filter).subscribe(this.successHandler);
  }

  private deleteSuccessHandler() {
    this.successHandler(new Filter());
  }

  private successHandler(f: Filter) {
    this.filter = f;
    this._loadFilters();
  }

  private _loadFilters() {
    this.filterService.list().subscribe((f: Filter[]) => this.filters = f);
  }

}
