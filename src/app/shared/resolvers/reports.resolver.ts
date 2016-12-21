import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { Report } from "../models";
import { ReportsService } from "../services";

@Injectable()
export class ReportsResolver implements Resolve<Report> {

    constructor(private reportService: ReportsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.reportService.get(route.params['id']);
    }

}