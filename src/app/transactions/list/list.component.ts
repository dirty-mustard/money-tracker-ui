import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsService } from '../../services/transactions.service';
import { Filter } from '../../model/filter.model';
import { Transaction } from '../../model/transaction.model';

@Component({
  selector: 'mt-transactions-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class TransactionsListComponent implements OnInit {

  transactions: Observable<Transaction[]>;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    let filter = new Filter();
    filter.from = '2016-01-01';
    filter.to = '2016-07-01';
    // filter.description = 'suma';
    // filter.tags = [1];

    this.transactions = this.transactionsService.search(filter);
  }

}
