import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Filter, Transaction } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TransactionService {

  constructor(private http: HttpClient) { }

  search(filter: Filter): Observable<Transaction[]> {
    const body = JSON.stringify(filter);
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post('http://localhost:8080/api/transactions/_search', body, headers)
      .map((response: Response) => response.json() as Transaction[])
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);

    return Observable.throw(errMsg);
  }

}
