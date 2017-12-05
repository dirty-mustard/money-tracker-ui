import { Component, OnInit } from '@angular/core';
import {
  Transaction,
  ReportService,
  TagService,
  FilterService,
  Tag,
  Filter
} from '../../shared';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public transactions: Transaction[] = [];
  public availableTags: Tag[] = null;
  public availableFilters: Filter[] = null;

  constructor(private reportService: ReportService,
              private tagService: TagService,
              private filterService: FilterService) { }

  ngOnInit(): void {
    this.reportService.getReportTransactions(1).subscribe(this.reportTransactionSuccessHandler.bind(this));
    this.tagService.list().subscribe((tags: Tag[]) => this.availableTags = tags);
    this.filterService.list().subscribe((filters: Filter[]) => this.availableFilters = filters);
  }

  onSelectedTagsChangedHandler(tags: Tag[]) {
    console.log(tags);
  }

  onSelectedFilterChangedHandler(tags: Tag[]) {
    console.log(tags);
  }

  reportTransactionSuccessHandler(transactions: Transaction[]): void {
    this.transactions = transactions;
  }
}
