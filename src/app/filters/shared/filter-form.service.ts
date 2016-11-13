import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { FilterService, TagService } from "../../shared/service";
import { Filter, Tag, Error } from '../../shared/model';

declare var _ : any;

@Injectable()
export class FilterFormService {

  constructor(private filterService: FilterService, private tagService: TagService) {}

  public get(id: number): Observable<Filter> {
    return this.filterService.get(id)
      .flatMap((filter: Filter) => {
        let tagIds = _.map(filter.tags, (t: Tag) => { return t; });
        return (tagIds.length > 0)
          ? Observable.forkJoin(Observable.of(filter), this.tagService.getByList(tagIds))
          : Observable.forkJoin(Observable.of(filter), Observable.of<Tag[]>([]));
      }).map((filterDetails: Filter) => {
        let filter: Filter = filterDetails[0];
        if (!_.isUndefined(filterDetails[1])
          && _.isArray(filterDetails[1])
          && filterDetails[1].length > 0
        ) {
          filter.tags = filterDetails[1];
        }

        return filter;
      });
  }

  public list(): Observable<Filter[]> {
    return this.filterService.list();
  }

  public create(filter: Filter): Observable<Filter> {
    return this.filterService.create(filter);
  }

  public update(filter: Filter) : Observable<Filter> {
    return this.filterService.update(filter);
  }

  public delete(filter: Filter) : Observable<Response> {
    return this.filterService.delete(filter);
  }

}
