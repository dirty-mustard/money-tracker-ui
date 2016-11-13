import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Filter } from './';
import { Error } from '../../shared';
import { Observable } from 'rxjs/Rx';

declare var _ : any;

@Injectable()
export class FilterService {

    constructor(private http: Http) {}

    public create(filter: Filter): Observable<Filter> {
        return this.http.post(`http://localhost:8080/api/filters`, filter)
          .map((r: Response) => Filter.fromJson(r.json()))
          .catch(this.errorHandler);
    }

    public update(filter: Filter) : Observable<Filter> {
      let body = JSON.stringify(filter);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.put(`http://localhost:8080/api/filters/${filter.id}`, body, options)
        .map((r: Response) => Filter.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public delete(filter: Filter) : Observable<Response> {
      return this.http.delete(`http://localhost:8080/api/filters/${filter.id}`)
        .catch(this.errorHandler);
    }

    public list(): Observable<Filter[]> {
        return this.http.get(`http://localhost:8080/api/filters`)
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
      return this.http.get(`http://localhost:8080/api/filters/${id}`)
        .map((r: Response) => Filter.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public errorHandler(error: any) {
      return Observable.throw(Error.fromJson(error.json()) || 'Server error');
    }

}
