import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 3th parties
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

// Import components
import {
  AppTransactionListComponent,
  AppReportListComponent,
  AppFilterListComponent,
  AppTagListComponent,
  AppTagDropdownListComponent,
  AppFilterDropdownListComponent,
  AppRuleListComponent,
} from './components';

// Import pipes
import { AppCurrencyPipe } from './pipes/app-currency';

import {
  FilterService,
  ReportService,
  TransactionService,
  TagService,
  RuleService,
} from './services';

const APP_COMPONENTS = [
  AppTransactionListComponent,
  AppReportListComponent,
  AppFilterListComponent,
  AppTagListComponent,
  AppTagDropdownListComponent,
  AppFilterDropdownListComponent,
  AppRuleListComponent
];

const APP_SERVICES = [
  FilterService,
  ReportService,
  TransactionService,
  TagService,
  RuleService
];

const APP_PIPES = [
  AppCurrencyPipe
];

@NgModule({
  imports: [
    CommonModule,
    MultiselectDropdownModule,
    FormsModule
  ],
  declarations: [
    ...APP_COMPONENTS,
    ...APP_PIPES
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
