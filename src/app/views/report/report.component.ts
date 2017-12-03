import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Report,
  ReportService
} from '../../shared';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {

  public reports: Report[] = [];

  constructor(private reportService: ReportService,
              private router: Router) { }

  ngOnInit(): void {
    this.reportService.list().subscribe((reports: Report[]) => this.reports = reports);
  }

  public onReportSelected(report: Report): void {
    console.log(`Report with id ${report.id} was selected`);
    this.router.navigate(['/reports', report.id]);
  }

}
