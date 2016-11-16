import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Report, Error } from '../model';
import { Observable } from 'rxjs/Rx';

declare var _ : any;

@Injectable()
export class ReportService {

    constructor(private http: Http) {}

    public create(report: Report): Observable<Report> {
        return this.http.post(`http://localhost:8080/api/reports`, report)
          .map((r: Response) => Report.fromJson(r.json()))
          .catch(this.errorHandler);
    }

    public update(report: Report) : Observable<Report> {
      let body = JSON.stringify(report);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.put(`http://localhost:8080/api/reports/${report.id}`, body, options)
        .map((r: Response) => Report.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public delete(report: Report) : Observable<Response> {
      return this.http.delete(`http://localhost:8080/api/reports/${report.id}`)
        .catch(this.errorHandler);
    }

    public list(): Observable<Report[]> {
        return this.http.get(`http://localhost:8080/api/reports`)
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
      return this.http.get(`http://localhost:8080/api/reports/${id}`)
        .map((r: Response) => Report.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public errorHandler(error: any) {
      return Observable.throw(Error.fromJson(error.json()) || 'Server error');
    }

}
