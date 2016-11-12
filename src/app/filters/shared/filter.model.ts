export class Filter {

  public id: number;
  public createdAt: string;
  public name: string;
  public from: string;
  public to: string;
  public description: string;
  public amount: FilterAmount;
  public accountHolder: string;
  public account: string;
  public offsetAccount: string;
  public tags: number[];
  public options: string[];

  constructor() {
    this.amount = new FilterAmount();
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
