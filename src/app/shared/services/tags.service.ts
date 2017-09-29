import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Tag, Error } from '../models';
import { Observable } from 'rxjs/Rx';
import { environment } from "../../../environments/environment";

declare var _ : any;

@Injectable()
export class TagsService {

    constructor(private http: Http) {}

    public create(tag: Tag): Observable<Tag> {
        return this.http.post(`${environment.apiUrl}/tags`, tag)
          .map((r: Response) => Tag.fromJson(r.json()))
          .catch(this.errorHandler);
    }

    public update(tag: Tag) : Observable<Tag> {
      let body = JSON.stringify(tag);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.put(`${environment.apiUrl}/tags/${tag.id}`, body, options)
        .map((r: Response) => Tag.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public delete(tag: Tag) : Observable<Response> {
      return this.http.delete(`${environment.apiUrl}/tags/${tag.id}`)
        .catch(this.errorHandler);
    }

    public list(): Observable<Tag[]> {
        return this.http.get(`${environment.apiUrl}/tags`)
          .map((r: Response) => {
            if (r) {
              let tags: Tag[] = [];
              _.each(r.json(), f => tags.push(Tag.fromJson(f)));
              return tags;
            } else {
              return Observable.of<Tag[]>([]);
            }
          })
          .catch(this.errorHandler);
    }

    public get(id): Observable<Tag> {
      return this.http.get(`${environment.apiUrl}/tags/${id}`)
        .map((r: Response) => Tag.fromJson(r.json()))
        .catch(this.errorHandler);
    }

    public getByList(ids: number[]): Observable<Tag[]> {
      return this.http.get(`${environment.apiUrl}/tags?ids=${ids.join(',')}`)
        .map((r: Response) => {
          let tags: Tag[] = [];
          _.each(r.json(), f => tags.push(Tag.fromJson(f)));
          return tags;
        })
        .catch(this.errorHandler);
    }

    public errorHandler(error: any) {
      return Observable.throw(Error.fromJson(error.json()) || 'Server error');
    }

}
