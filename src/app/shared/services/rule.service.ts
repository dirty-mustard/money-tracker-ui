import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Rule } from '../models/rule.model';

@Injectable()
export class RuleService {

  constructor(private http: HttpClient) {}

  public list(): Observable<Rule[]> {
      return this.http.get<Rule[]>(`http://localhost:8080/api/rules`);
  }

  public get(id: any): Observable<Rule> {
    return this.http.get<Rule>(`http://localhost:8080/api/rules/${id}`);
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
