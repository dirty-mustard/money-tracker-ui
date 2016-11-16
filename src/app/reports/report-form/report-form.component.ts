import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Filter } from "../../shared/model";
import { Report } from "../../shared/model";
import { ReportFormService } from "../shared/report-form.service";

declare var _ : any;

@Component({
  selector: 'mt-report-form',
  templateUrl: 'report-form.component.html',
  styleUrls: ['report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  report: Report = new Report();

  @Input('errors') errors: Object = {};
  @Input('errorMessage') errorMessage: String;
  @Output('saveOnClick') saveEvent = new EventEmitter<Report>();
  @Output('deleteOnClick') deleteEvent = new EventEmitter<Report>();

  constructor(private reportFormService: ReportFormService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.report = this.route.snapshot.data['report'];
  }

  onSubmit() {
    this.saveEvent.emit(this.report);
  }

  deleteOnClick() {
    this.deleteEvent.emit(this.report);
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
