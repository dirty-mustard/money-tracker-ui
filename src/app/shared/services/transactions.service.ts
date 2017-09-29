import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Transaction, Filter } from '../models';
import { environment } from "../../../environments/environment";

@Injectable()
export class TransactionsService {

  constructor(private http: Http) { }

  search(filter: Filter): Observable<Transaction[]> {
    let body = JSON.stringify(filter);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.apiUrl}/api/transactions/_search`, body, options)
      .map((response: Response) => response.json() as Transaction[])
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);

    return Observable.throw(errMsg);
  }

}
