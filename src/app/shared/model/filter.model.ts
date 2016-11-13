import { Tag } from "./tag.model";

declare var _: any;

export class Filter {

  public id: number = undefined;
  public createdAt: string = undefined;
  public name: string = undefined;
  public from: string = undefined;
  public to: string = undefined;
  public description: string = undefined;
  public amount: FilterAmount = undefined;
  public accountHolder: string = undefined;
  public account: string = undefined;
  public offsetAccount: string = undefined;
  public tags: Tag[] = [];
  public options: string[] = [];

  constructor() {
    this.amount = new FilterAmount();
  }

  public static fromJson(json: Object) : Filter {
    let filter = new Filter();
    _.each(_.keys(filter), p => {
      if (_.contains(_.keys(json), p)) {
        filter[p] = json[p] ;
      }
    });

    return filter;
  }
}

export class FilterAmount {

  public from: number;
  public to: number;

  get amount() {
    let from = (this.from === undefined) ? '' : this.from.toString();
    let to = (this.to === undefined) ? '' : this.to.toString();

    return 'From: ${from} To: ${to}';
  }
}

export class FilterOption {

  value: string;
  display: string;

  constructor(value, display) {
    this.value   = value;
    this.display = display;
  }

  public static values() : FilterOption[] {
      return [
        new FilterOption('ARCHIVED', 'Archived'),
        new FilterOption('LOCKED', 'Locked'),
        new FilterOption('UNTAGGED', 'Untagged')
      ];
  };

}
