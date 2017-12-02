import { Component, Input } from '@angular/core';
import { Transaction } from '../../shared/models/transaction.model';

declare const _: any;

@Component({
  selector: 'mt-transactions-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class TransactionsListComponent {

  @Input('transactions') transactions: Transaction[] = [];

  public transactionsGroupedByDate(): any {
    const groupedTransactions: any[] = [];

    const uniqueDates: any[] = _.uniq(this.transactions.map((t: Transaction) => t.date), true);
    uniqueDates.forEach((uniqueDate) => {
      const transactions = this.transactions.filter((t: Transaction) => {
        return t.date === uniqueDate;
      });
      groupedTransactions.push({ key: uniqueDate, values: transactions });
    });

    return groupedTransactions;
  }

}
