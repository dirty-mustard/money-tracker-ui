import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../shared/models/transaction.model';

@Component({
  selector: 'mt-transactions-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class TransactionsListComponent implements OnInit {

  @Input('transactions') transactions: Transaction[];

  ngOnInit() { }

}
