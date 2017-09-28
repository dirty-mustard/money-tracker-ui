import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report, Filter, Transaction } from '../../shared/models';
import { ReportsService, FiltersService, TransactionsService } from '../../shared/services';

declare var _ : any;

@Component({
  selector: 'mt-report-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ReportViewComponent implements OnInit {

  report: Report = new Report();
  transactions: Transaction[] = [];

  constructor(private reportService: ReportsService,
              private filterService: FiltersService,
              private transactionsService: TransactionsService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (_.contains(_.keys(params), 'id')) {
        this.reportService.get(params['id']).subscribe((report: Report) => {
          this.report = report;
          this.filterService.get(report.filter).subscribe((filter: Filter) => {
            this.transactionsService.search(filter).subscribe((transactions: Transaction[]) => {
              this.transactions = transactions;
            });
          });
        });
      }
    });
  }

}
