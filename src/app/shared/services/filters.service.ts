import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Filter, Error } from '../models';
import { Observable } from 'rxjs/Rx';
import { environment } from "../../../environments/environment";

declare var _ : any;

@Injectable()
export class FiltersService {

    constructor(private http: Http) {}

    public create(filter: Filter): Observable<Filter> {
        return this.http.post(`${environment.apiUrl}/filters`, filter)
          .map((r: Response) => Filter.fromJson(r.json()))
          .catch(this.errorHandler);
    }

    public update(filter: Filter) : Observable<Filter> {
      let body = JSON.stringify(filter);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.put(`${environment.apiUrl}/filters/${filter.id}`, body, options)
        .map((r: Response) => Filter.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public delete(filter: Filter) : Observable<Response> {
      return this.http.delete(`${environment.apiUrl}/filters/${filter.id}`)
        .catch(this.errorHandler);
    }

    public list(): Observable<Filter[]> {
        return this.http.get(`${environment.apiUrl}/filters`)
          .map((r: Response) => {
            if (r) {
              let filters: Filter[] = [];
              _.each(r.json(), f => filters.push(Filter.fromJson(f)));
              return filters;
            } else {
              return Observable.of<Filter[]>([]);
            }
          })
          .catch(this.errorHandler);
    }

    public get(id): Observable<Filter> {
      return this.http.get(`${environment.apiUrl}/filters/${id}`)
        .map((r: Response) => Filter.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public errorHandler(error: any) {
      return Observable.throw(Error.fromJson(error.json()) || 'Server error');
    }

}
