import { Tag } from './tag.model';

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
  public tags: any[] = [];
  public options: string[] = [];

  public static fromJson(json: Object): Filter {
    const filter = new Filter();
    _.each(_.keys(filter), (p: any) => {
      if (_.contains(_.keys(json), p)) {
        filter[p] = json[p] ;
      }
    });

    return filter;
  }

  constructor() {
    this.amount = new FilterAmount();
  }

  public hasOption(option: string): boolean {
    return _.contains(this.options, option);
  }

  public addOption(option: string) {
    if (!_.contains(this.options, option)) {
      this.options.push(option);
    }
  }

  public removeOption(option: string) {
    if (_.contains(this.options, option)) {
      this.options.splice(this.options.indexOf(option), 1);
    }
  }
}

export class FilterAmount {

  public from: number;
  public to: number;

  get amount() {
    const from = (this.from === undefined) ? '' : this.from.toString();
    const to = (this.to === undefined) ? '' : this.to.toString();

    return 'From: ${from} To: ${to}';
  }
}

export const ARCHIVED = 'ARCHIVED';
export const LOCKED = 'LOCKED';
export const UNTAGGED = 'UNTAGGED';

export class FilterOption {

  value: string;
  display: string;

  public static values(): FilterOption[] {
    return [
      new FilterOption('ARCHIVED', 'Archived'),
      new FilterOption('LOCKED', 'Locked'),
      new FilterOption('UNTAGGED', 'Untagged')
    ];
  };

  constructor(value: string, display: string) {
    this.value   = value;
    this.display = display;
  }

}
