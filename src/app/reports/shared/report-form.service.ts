import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { ReportService, FilterService } from "../../shared/service";
import { Report, Filter } from "../../shared/model";

declare var _ : any;

@Injectable()
export class ReportFormService {

  constructor(private reportService: ReportService, private filterService: FilterService) {}

  public get(id: number): Observable<Report> {
    return this.reportService.get(id);
  }

  public listReports() : Observable<Report[]> {
    return this.reportService.list();
  }

  public listFilters(): Observable<Filter[]> {
    return this.filterService.list();
  }

  // public create(report: Filter): Observable<Filter> {}
  //
  // public update(report: Filter) : Observable<Filter> {}
  //
  // public delete(report: Filter) : Observable<Response> {}

}
