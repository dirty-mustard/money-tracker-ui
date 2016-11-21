import { Component, OnInit } from '@angular/core';

import { ReportsService } from "../shared/services";
import { Report } from "../shared/models";

@Component({
  selector: 'mt-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  reports: Report[] = [];

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.reportsService.list().subscribe((r: Report[]) => this.reports = r);
  }

}
