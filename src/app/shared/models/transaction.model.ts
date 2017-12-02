import { Tag } from './tag.model';

declare var _: any;

export class Transaction {
  id: string;
  account: string;
  amount: number;
  archived: boolean;
  date: string;
  description: string;
  locked: boolean;
  tags: Tag[];

  public static fromJson(json: Object) : Transaction {
    let transaction = new Transaction();
    _.each(_.keys(transaction), p => {
      if (_.contains(_.keys(json), p)) {
        transaction[p] = json[p] ;
      }
    });

    return transaction;
  }
}
