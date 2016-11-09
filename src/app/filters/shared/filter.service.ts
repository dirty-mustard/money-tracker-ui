import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Filter, FilterAmount } from './';

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

  public list() {
    console.log('calling');
    this.http.get(`http://localhost:8080/api/filters`)
      .subscribe(response => {
        console.log(response.json());
      });
  }

}
