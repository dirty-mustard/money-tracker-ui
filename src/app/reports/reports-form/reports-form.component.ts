import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PIE, LINE, Filter, Report } from "../../shared/models";
import { ReportsService } from "../../shared/services/reports.service";
import { SidebarService } from "../../shared/services/sidebar.service";
import { Response } from "@angular/http";

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

  constructor(private sidebarService: SidebarService,
              private reportService: ReportsService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (_.contains(_.keys(params),'id')) {
        this.reportService.get(params['id']).subscribe((r: Report) => this.report = r);
      }
    });
  }

  onSubmit() {
    this.saveEvent.emit(this.report);
    (this.report.id)
      ? this.reportService.update(this.report).subscribe(this.submitOnSuccess.bind(this))
      : this.reportService.create(this.report).subscribe(this.submitOnSuccess.bind(this));
  }

  submitOnSuccess(r: Report) {
    this.report = r;
    this.sidebarService.loadReports();
  }

  filterOnChange(filterId: number) {
    this.report.filter = filterId;
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.report);
    this.reportService.delete(this.report).subscribe((r: Response) => this.submitOnSuccess(new Report()));
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
