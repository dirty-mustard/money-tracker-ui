import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Report,
  Filter,
  Transaction,
  PIE,
  LINE
} from '../../../shared';
import { ReportService } from '../../../shared/services/report.service';
import { FilterService } from '../../../shared/services/filter.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit, OnChanges {

  public report: Report = null;
  public filter: Filter = null;
  public transactions: Transaction[] = [];

  public expenseChartDataSet: Array<any> = [
    { data: [], label: 'Unknown' }
  ];

  public incomeChartDataSet: Array<any> = [
    { data: [], label: 'Unknown' }
  ];

  public expenseChartLabels: Array<string> = [];
  public incomeChartLabels: Array<string> = [];

  public balanceChartColors: Array<any> = [
    {
      backgroundColor: '#C4CFD5',
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];

  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (_.contains(_.keys(params), 'id')) {
        const reportId = params['id'];
        this.reportService.get(reportId).subscribe(this.reportSuccessHandler.bind(this));
        this.reportService.getReportTransactions(reportId).subscribe(this.reportTransactionSuccessHandler.bind(this));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (_.contains(_.keys(changes), 'transactions')) {
      this.calculateExpenses();
      this.calculateIncome();
      this.calculateBalance();
    }
  }

  constructor(private reportService: ReportService,
              private filterService: FilterService,
              private route: ActivatedRoute) {}

  reportSuccessHandler(r: Report): void {
    this.report = r;
    this.filterService.get(r.filter).subscribe(this.reportFilterSuccessHandler.bind(this));
  }

  reloadChartData(transactions?: Transaction[]): void {
    const t = (transactions) ? transactions : this.transactions;
    const incomeTransactions = t.filter((transaction: Transaction) => transaction.amount > 0);
    const expenseTransactions = t.filter((transaction: Transaction) => transaction.amount < 0);

    this.reloadExpenseChartData(expenseTransactions);
    this.reloadIncomeChartData(incomeTransactions);
  }

  reloadExpenseChartData(transactions: Transaction[]): void {
    this.expenseChartDataSet = [
      {
        data: transactions.map((t: Transaction) => t.amount * -1),
        label: this.report.name
      }
    ];

    this.expenseChartLabels = transactions.map((t: Transaction) => t.date);
  }

  reloadIncomeChartData(transactions: Transaction[]): void {
    this.incomeChartDataSet = [
      {
        data: transactions.map((t: Transaction) => t.amount),
        label: this.report.name
      }
    ];

    this.incomeChartLabels = transactions.map((t: Transaction) => t.date);
  }

  reportFilterSuccessHandler(f: Filter): void {
    this.filter = f;
  }

  reportTransactionSuccessHandler(transactions: any): void {
    this.transactions = transactions;
    this.reloadChartData(this.transactions);
  }

  numberOfExpenseTransactions(): number {
    return this.transactions
      .filter((transaction: Transaction) => transaction.amount < 0)
      .length;
  }

  public calculateExpenses(): number {
    const expenseTransactions = this.transactions
      .filter((t: Transaction) => t.amount < 0)
      .map((t: Transaction) => t.amount);

    return (expenseTransactions.length > 0)
      ? expenseTransactions.reduce((a, b) => a + b, 0)
      : 0;
  }

  public numberOfIncomeTransactions(): number {
    const incomeTransactions = this.transactions
      .filter((transaction: Transaction) => transaction.amount > 0)
      .map((t: Transaction) => t.amount);

    return incomeTransactions.length;
  }

  public calculateIncome(): number {
    const incomeTransactions = this.transactions
      .filter((transaction: Transaction) => transaction.amount > 0)
      .map((t: Transaction) => t.amount);

    return (incomeTransactions.length > 0)
      ? incomeTransactions.reduce((a, b) => a + b, 0)
      : 0;
  }

  public calculateBalance(): number {
    return this.calculateExpenses() + this.calculateIncome();
  }

}
