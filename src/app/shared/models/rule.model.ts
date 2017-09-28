import { Tag } from "./tag.model";

declare var _: any;

export class Rule {

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
  public tags = [];
  public options: string[] = [];

  constructor() {
    this.amount = new FilterAmount();
  }

  public static fromJson(json: Object) : Rule {
    let rule = new Rule();
    _.each(_.keys(rule), p => {
      if (_.contains(_.keys(json), p)) {
        rule[p] = json[p];
      }
    });

    return rule;
  }

  public hasOption(option: string) : boolean {
    return _.contains(this.options, option);
  }

  public addOption(option: string) {
    if (!_.contains(this.options, option)) {
      this.options.push(option);
    }
  }

  public removeOption(option: string) {
    if (_.contains(this.options, option)) {
      this.options.splice(this.options.indexOf(option), 1)
    }
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

export const ARCHIVED = 'ARCHIVED';
export const LOCKED = 'LOCKED';
export const UNTAGGED = 'UNTAGGED';

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
