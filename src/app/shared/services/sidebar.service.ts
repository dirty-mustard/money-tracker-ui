import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Report } from '../models';
import { ReportsService } from "./reports.service";

@Injectable()
export class SidebarService {

    private reportedAddedSource = new Subject<Report[]>();

    // Observable string streams
    reportAdded$ = this.reportedAddedSource.asObservable();

    constructor(private reportsService: ReportsService) {}

    public loadReports() {
        this.reportsService.list().subscribe((r: Report[]) => this.reportedAddedSource.next(r));
    }

}
