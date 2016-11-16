import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { isUndefined } from "util";
import { Error } from "../../shared";
import { Filter, Tag } from "../../shared/models";
import { FiltersFormService } from "../shared";

declare var _ : any;

@Component({
  selector: 'mt-filter',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input('filterFormCollapsed') filterFormCollapsed: boolean = false;
  @Input('filterId') filterId: number;
  @Output('filterOnChange') filterOnChange : EventEmitter<number> = new EventEmitter<number>();

  filter: Filter = new Filter();
  availableFilters: Filter[] = [];
  tags: Tag[] = [];

  errorMessage: string;
  errors: Object = {};

  constructor(private filterFormService: FiltersFormService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (_.contains(_.keys(changes), 'filterId')) {

      (!isUndefined(this.filterId))
          ? this._loadFilter(this.filterId)
          : this.filter = new Filter();
    }
  }

  ngOnInit(): void {
    if (!isUndefined(this.filterId)) {
      this._loadFilter(this.filterId);
    }
    this._loadFilters();
    this._loadTags();
  }

  public newOnClick() {
    this.filter = new Filter();
    this.clearErrors();
  }

  public deleteOnClick(filter) {
    this.filterFormService.delete(filter).subscribe(this.deleteSuccessHandler.bind(this));
  }

  public onFilterSelected(filterId: number) {
    this.filterOnChange.emit(filterId);
    this._loadFilter(filterId);
  }

  public toggleFilterDetailsOnClick() {
    this.filterFormCollapsed = !this.filterFormCollapsed;
  }

  public saveOnClick(filter: Filter) {
    _.bindAll(this, 'successHandler', 'errorHandler');
    (isUndefined(filter.id))
      ? this.filterFormService.create(filter).subscribe(this.successHandler, this.errorHandler)
      : this.filterFormService.update(filter).subscribe(this.successHandler, this.errorHandler);
  }

  private deleteSuccessHandler() {
    this.successHandler(new Filter());
  }

  private successHandler(f: Filter) {
    this.filter = f;
    this._loadFilters();
    this.clearErrors();
  }

  clearErrors() {
    this.errors = {};
    this.errorMessage = null;
  }

  private errorHandler(error: Error) {
    this.errorMessage  = error.error;
    _.each(_.keys(error.errorDetails), (t: string) => this.errors[t] = error.errorDetails[t]);
  }

  private _loadFilter(filterId: number) {
    this.filterFormService.get(filterId).subscribe((f: Filter) => {
      this.filter = f;
    });
  }

  private _loadFilters() {
    this.filterFormService.listFilters().subscribe((f: Filter[]) => this.availableFilters = f);
  }

  private _loadTags() {
    this.filterFormService.listTags().subscribe((t: Tag[]) => this.tags = t);
  }

}
