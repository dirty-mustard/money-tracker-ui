import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';

import * as _ from 'underscore';

@Component({
  selector: 'app-transaction-list',
  templateUrl: 'app-transaction-list.component.html',
  styleUrls: ['app-transaction-list.component.scss']
})
export class AppTransactionListComponent {

  @Input() transactions: Transaction[] = [];

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
