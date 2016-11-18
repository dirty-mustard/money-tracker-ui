import { Tag } from './tag.model';

export class Transaction {
  id: string;
  account: string;
  amount: number;
  archived: boolean;
  date: string;
  description: string;
  locked: boolean;
  tags: Tag[];
}
