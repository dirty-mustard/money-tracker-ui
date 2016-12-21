import { Injectable } from "@angular/core";
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Filter, Tag } from '../../shared/models';
import { FiltersService, TagsService } from "../../shared/services";

declare var _ : any;

@Injectable()
export class FiltersFormService {

  constructor(private filterService: FiltersService, private tagService: TagsService) {}

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

  public listTags(): Observable<Tag[]> {
    return this.tagService.list();
  }

  public listFilters(): Observable<Filter[]> {
    return this.filterService.list();
  }

  public create(filter: Filter): Observable<Filter> {
    let f = filter;
    f.tags = f.tags.map((t: Tag) => { return t.id });
    return this.filterService.create(filter)
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

  public update(filter: Filter) : Observable<Filter> {
    let f = filter;
    f.tags = f.tags.map((t: Tag) => { return t.id });
    return this.filterService.update(f)
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

  public delete(filter: Filter) : Observable<Response> {
    return this.filterService.delete(filter);
  }

}
