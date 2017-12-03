import { Component, OnInit } from '@angular/core';
import {
  Transaction,
  ReportService
} from '../../shared';

@Component({
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

  public transactions: Transaction[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getReportTransactions(1).subscribe(this.reportTransactionSuccessHandler.bind(this));
  }

  reportTransactionSuccessHandler(transactions: Transaction[]): void {
    this.transactions = transactions;
  }
}
