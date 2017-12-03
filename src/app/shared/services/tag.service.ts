import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Tag } from '../models';


@Injectable()
export class TagService {

  constructor(private http: HttpClient) {}

  public create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`http://localhost:8080/api/tags`, tag)
      .pipe(
        catchError(this.handleError<Tag>('created report'))
      );
  }

  public update(tag: Tag): Observable<Tag> {
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put<Tag>(`http://localhost:8080/api/tags/${tag.id}`, JSON.stringify(tag), headers)
      .pipe(
        catchError(this.handleError<Tag>('updated report'))
      );
  }

  public delete(tag: Tag): Observable<Tag> {
    return this.http.delete<Tag>(`http://localhost:8080/api/tags/${tag.id}`)
      .pipe(
        catchError(this.handleError<Tag>('created report'))
      );
  }

  public list(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`http://localhost:8080/api/tags`)
      .pipe(
        catchError(this.handleError<Tag[]>('Listing tags'))
      );
  }

  public get(tag: Tag|number): Observable<Tag> {
    const id = typeof tag === 'number' ? tag : tag.id;
    return this.http.get<Tag>(`http://localhost:8080/api/tags/${id}`)
      .pipe(
        catchError(this.handleError<Tag>('fetching single report'))
      );
  }

  public getByList(ids: number[]): Observable<Tag[]> {
    return this.http.get<Tag[]>(`http://localhost:8080/api/tags?ids=${ids.join(',')}`)
      .pipe(
        catchError(this.handleError<Tag[]>('Listing list of tags'))
      );
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
