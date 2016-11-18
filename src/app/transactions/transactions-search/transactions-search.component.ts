import { Component, OnInit } from '@angular/core';

import { Filter, Tag } from "../../shared/models";
import { TransactionsSearchFormService } from "../shared";
import { Transaction } from "../../shared/models/transaction.model";

declare var _ : any;

@Component({
    selector: 'mt-transactions-search',
    templateUrl: 'transactions-search.component.html'
})
export class TransactionsSearchComponent implements OnInit {

    filter: Filter = new Filter();
    transactions: Transaction[];
    tags: Tag[] = [];

    errorMessage: string;
    errors: Object = {};

    constructor(private transactionSearchFormService: TransactionsSearchFormService) {}

    ngOnInit(): void {
        this._loadTags();
    }

    private _loadTags() {
        this.transactionSearchFormService.listTags().subscribe((t: Tag[]) => this.tags = t);
    }

    public OnSubmit() {
        // Do something and use success and error handlers
        this.transactionSearchFormService.search(this.filter).subscribe((t: Transaction[]) => this.transactions = t);
    }

    private successHandler(f: Filter) {

    }

    private errorHandler(error: Error) {

    }

    clearErrors() {
        this.errors = {};
        this.errorMessage = null;
    }

}
