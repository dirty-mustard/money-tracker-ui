import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PIE, LINE, Filter, Report } from "../../shared/models";
import { ReportsService } from "../../shared/services/reports.service";

declare var _ : any;

@Component({
  selector: 'mt-report-form',
  templateUrl: 'reports-form.component.html',
  styleUrls: ['reports-form.component.css']
})
export class ReportsFormComponent implements OnInit {

  report: Report = new Report();

  @Input('errors') errors: Object = {};
  @Input('errorMessage') errorMessage: String;
  @Output('saveOnClick') saveEvent = new EventEmitter<Report>();
  @Output('deleteOnClick') deleteEvent = new EventEmitter<Report>();

  constructor(private reportService: ReportsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.report = this.route.snapshot.data['report'];
  }

  onSubmit() {
    this.saveEvent.emit(this.report);
    (this.report.id)
      ? this.reportService.update(this.report).subscribe((r: Report) => this.report = r)
      : this.reportService.create(this.report).subscribe((r: Report) => this.report = r);
  }

  filterOnChange(filterId: number) {
    this.report.filter = filterId;
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.report);
  }

  pieChartOnClick() {
    this.report.hasChart(PIE)
      ? this.report.removeChart(PIE)
      : this.report.addChart(PIE);
  }

  newReportOnClick() {
    this.report = new Report();
  }

  lineChartOnClick() {
    this.report.hasChart(LINE)
        ? this.report.removeChart(LINE)
        : this.report.addChart(LINE);
  }

  containsErrors() : boolean {
    return _.keys(this.errors).length > 0;
  }

  hasError(field: string) {
    return _.contains(_.keys(this.errors), field);
  }

  getError(field: string) {
    return (this.hasError(field)) ? this.errors[field] : 'Unknown error.';
  }

}
