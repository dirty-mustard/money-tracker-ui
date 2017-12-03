import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Report } from '../../models';

@Component({
  selector: 'app-report-list',
  templateUrl: './app-report-list.component.html',
  styleUrls: ['./app-report-list.component.scss']
})
export class AppReportListComponent {

  @Input() reports: Report[] = [];
  @Output() reportSelected = new EventEmitter<Report>();

  reportOnClick(report: Report) {
    this.reportSelected.emit(report);
  }

}
