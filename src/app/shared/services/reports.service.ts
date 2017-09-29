import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Report, Error } from '../models';
import { Observable } from 'rxjs/Rx';
import { environment } from "../../../environments/environment";

declare var _ : any;

@Injectable()
export class ReportsService {

    constructor(private http: Http) {}

    public create(report: Report): Observable<Report> {
        return this.http.post(`${environment.apiUrl}/reports`, report)
          .map((r: Response) => Report.fromJson(r.json()))
          .catch(this.errorHandler);
    }

    public update(report: Report) : Observable<Report> {
      let body = JSON.stringify(report);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.put(`${environment.apiUrl}/reports/${report.id}`, body, options)
        .map((r: Response) => Report.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public delete(report: Report) : Observable<Response> {
      return this.http.delete(`${environment.apiUrl}/reports/${report.id}`)
        .catch(this.errorHandler);
    }

    public list(): Observable<Report[]> {
        return this.http.get(`${environment.apiUrl}/reports`)
          .map((r: Response) => {
            if (r) {
              let reports: Report[] = [];
              _.each(r.json(), f => reports.push(Report.fromJson(f)));
              return reports;
            } else {
              return Observable.of<Report[]>([]);
            }
          })
          .catch(this.errorHandler);
    }

    public get(id): Observable<Report> {
      return this.http.get(`${environment.apiUrl}/reports/${id}`)
        .map((r: Response) => Report.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public errorHandler(error: any) {
      return Observable.throw(Error.fromJson(error.json()) || 'Server error');
    }

}
