import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { Report } from "../model";
import { ReportService } from "../service";

@Injectable()
export class ReportResolver implements Resolve<Report> {
    constructor(private reportService: ReportService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.reportService.get(route.params['id']);
    }
}