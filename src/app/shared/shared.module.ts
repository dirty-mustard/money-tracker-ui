import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import components
import {
  AppTransactionListComponent,
  AppReportListComponent,
  AppFilterListComponent,
  AppTagListComponent,
} from './components';

// Import pipes
import { AppCurrencyPipe } from './pipes/app-currency';

import {
  FilterService,
  ReportService,
  TransactionService,
  TagService
} from './services';

const APP_COMPONENTS = [
  AppTransactionListComponent,
  AppReportListComponent,
  AppFilterListComponent,
  AppTagListComponent
];

const APP_SERVICES = [
  FilterService,
  ReportService,
  TransactionService,
  TagService
];

const APP_PIPES = [
  AppCurrencyPipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...APP_COMPONENTS,
    ...APP_PIPES,
  ],
  providers: [
    ...APP_SERVICES
  ],
  exports: [
    ...APP_COMPONENTS,
    ...APP_PIPES
  ]
})
export class SharedModule { }
