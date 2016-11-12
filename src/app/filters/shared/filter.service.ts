import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { Filter } from './';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FilterService {

    constructor(private http: Http) {}

    public create(filter: Filter) {
        console.log('calling');
        this.http.post(`http://localhost:8080/api/filters`, filter)
            .subscribe(response => {
                    console.log(response.json());
            });
    }

    public list(): Observable<Filter[]> {
        return this.http.get(`http://localhost:8080/api/filters`)
          .map((r: Response) => {
            console.log(r.json());
            return (r) ? r.json() as Filter[] : Observable.of<Filter[]>([]);
          })
          .catch((error:any) => Observable.of<Filter[]>([]));
    }

    public get(id): Observable<Filter> {
      return this.http.get(`http://localhost:8080/api/filters/${id}`)
        .map((r: Response) => {
          console.log(r.json());
          return (r) ? r.json() as Filter : Observable.of<Filter>();
        })
        .catch((error:any) => Observable.of<Filter>(new Filter));
    }

}
