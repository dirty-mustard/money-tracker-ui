import { Injectable } from '@angular/core';

import { Filter } from '../models';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FilterService {

  constructor(private http: HttpClient) {}

  public create(filter: Filter): Observable<Filter> {
    return this.http.post<Filter>(`http://localhost:8080/api/filters`, filter)
      .pipe(
        catchError(this.handleError<Filter>('Filter creation failed'))
      );
  }

  public update(filter: Filter): Observable<Filter> {
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const uri = `http://localhost:8080/api/filters/${filter.id}`;

    return this.http.put<Filter>(uri, JSON.stringify(filter), headers)
      .pipe(
        catchError(this.handleError<Filter>('Updating of filter failed'))
      );
  }

  public delete(filter: Filter | number): Observable<Filter> {
    const id = typeof filter === 'number' ? filter : filter.id;
    return this.http.delete<Filter>(`http://localhost:8080/api/filters/${id}`)
      .pipe(
        catchError(this.handleError<Filter>('delete'))
      );
  }

  public list(): Observable<Filter[]> {
    return this.http.get<Filter[]>(`http://localhost:8080/api/filters`);
  }

  public get(id: any): Observable<Filter> {
    return this.http.get<Filter>(`http://localhost:8080/api/filters/${id}`);
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
