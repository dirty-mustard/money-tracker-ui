import {
  Filter,
  Tag
} from './';

export class Rule {

  public id: number;
  public createdAt: string;
  public filter: Filter|number;
  public enabled: boolean;
  public archive: boolean;
  public tagsToApply: Tag[]|number[];

  constructor(
    id: number,
    createdAt: string,
    filter: Filter|number,
    enabled: boolean,
    archive: boolean,
    tagsToApply: Tag[]|number[]
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.filter = filter;
    this.enabled = enabled;
    this.archive = archive;
    this.tagsToApply = tagsToApply;
  }
}
