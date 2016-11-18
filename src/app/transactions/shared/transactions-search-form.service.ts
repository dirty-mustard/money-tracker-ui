import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

import { Transaction, Filter, Tag } from '../../shared/models';
import { TransactionsService, TagsService } from "../../shared/services";

declare var _ : any;

@Injectable()
export class TransactionsSearchFormService {

  constructor(private tagService: TagsService, private transactionService: TransactionsService) {}

  public listTags(): Observable<Tag[]> {
    return this.tagService.list();
  }

  public search(filter: Filter): Observable<Transaction[]> {
    let f = _.clone(filter);
    f.tags = f.tags.map((t: Tag) => { return t.id });
    return this.transactionService.search(f);
  }

}
