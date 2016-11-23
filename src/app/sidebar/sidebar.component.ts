import { Component, OnInit } from '@angular/core';

import { ReportsService } from "../shared/services";
import { Report } from "../shared/models";
import { SidebarService } from "../shared/services/sidebar.service";

@Component({
  selector: 'mt-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  reports: Report[] = [];

  constructor(private sidebarService: SidebarService, private reportsService: ReportsService) { }

  ngOnInit() {
    this.sidebarService.loadReports();
    this.sidebarService.reportAdded$.subscribe((r: Report[]) => this.reports = r);
  }

}
