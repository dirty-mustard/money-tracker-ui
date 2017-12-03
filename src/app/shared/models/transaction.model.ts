import { Tag } from './';

export class Transaction {
  id: string;
  account: string;
  amount: number;
  archived: boolean;
  date: string;
  description: string;
  locked: boolean;
  tags: Tag[];

  constructor(
    id: string,
    account: string,
    amount: number,
    archived: boolean,
    date: string,
    description: string,
    locked: boolean,
    tags: Tag[]
  ) {
    this.id = id;
    this.account = account;
    this.amount = amount;
    this.archived = archived;
    this.date = date;
    this.description = description;
    this.locked = locked;
    this.tags = tags;
  }
}
