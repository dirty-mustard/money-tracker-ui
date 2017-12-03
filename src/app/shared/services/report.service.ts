import { Injectable } from '@angular/core';

import { PieChart, Report, Transaction } from '../models';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) {}

  public create(report: Report): Observable<Report> {
      return this.http.post<Report>(`http://localhost:8080/api/reports`, report)
        .pipe(
          catchError(this.handleError<Report>('created report'))
        );
  }

  public update(report: Report): Observable<Report> {
    const body = JSON.stringify(report);
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put<Report>(`http://localhost:8080/api/reports/${report.id}`, body, headers)
      .pipe(
        catchError(this.handleError<Report>('update'))
      );
  }

  public delete(report: Report | number): Observable<Report> {
    const id = typeof report === 'number' ? report : report.id;
    return this.http.delete<Report>(`http://localhost:8080/api/reports/${id}`)
      .pipe(
        catchError(this.handleError<Report>('delete'))
      );
  }

  public list(): Observable<Report[]> {
      return this.http.get<Report[]>(`http://localhost:8080/api/reports`);
  }

  public get(id: any): Observable<Report> {
    return this.http.get<Report>(`http://localhost:8080/api/reports/${id}`);
  }

  public getReportTransactions(reportId: any): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`http://localhost:8080/api/reports/${reportId}/transactions`);
  }

  public getReportPieData(reportId: any): Observable<PieChart[]> {
    return this.http.get<PieChart[]>(`http://localhost:8080/api/reports/${reportId}/pieChart`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
