import { Injectable } from "@angular/core";
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Filter, Tag } from '../../shared/models';
import { FiltersService, TagsService } from "../../shared/services";

declare const _: any;

@Injectable()
export class FiltersFormService {

  constructor(private filterService: FiltersService, private tagService: TagsService) {}

  public get(id: number): Observable<Filter> {
    const filter = this.filterService.get(id);
    return filter
      .flatMap((f: Filter) => {
        const tagIds = _.map(f.tags, (t: Tag) => t);
        return !_.isEmpty(tagIds)
          ? Observable.forkJoin(Observable.of(f), (this.tagService.getByList(tagIds)))
          : Observable.forkJoin(Observable.of(f));
      })
      .map((response: Array<any>) => {
      console.log(response);
        const f: Filter = response[0];
        if (!_.isUndefined(response[1])
          && _.isArray(response[1])
          && response[1].length > 0
        ) {
          f.tags = response[1];
        }

        return f;
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
    f.tags = f.tags.map((t: Tag) => t.id);
    return this.filterService.create(filter)
      .flatMap((filter: Filter) => {
        let tagIds = _.map(filter.tags, (t: Tag) => { return t; });
        return Observable.forkJoin(Observable.of(filter), (this.tagService.getByList(tagIds)));
      })
      .map((response: Array<any>) => {
        let filter: Filter = response[0];
        if (!_.isUndefined(response[1])
          && _.isArray(response[1])
          && response[1].length > 0
        ) {
          filter.tags = response[1];
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
        return Observable.forkJoin(Observable.of(filter), (this.tagService.getByList(tagIds)));
      })
      .map((response: Array<any>) => {
        let filter: Filter = response[0];
        if (!_.isUndefined(response[1])
          && _.isArray(response[1])
          && response[1].length > 0
        ) {
          filter.tags = response[1];
        }

        return filter;
      });
  }

  public delete(filter: Filter) : Observable<Response> {
    return this.filterService.delete(filter);
  }

}
