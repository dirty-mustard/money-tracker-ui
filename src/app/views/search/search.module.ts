import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';

// Import services
import {
  ReportService,
  TransactionService
} from '../../shared';

import { SharedModule } from '../../shared/shared.module';


const APP_SERVICES = [
  TransactionService,
  ReportService
];

@NgModule({
  imports: [
    SearchRoutingModule,
    ChartsModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    SearchComponent
  ],
  providers: [
    ...APP_SERVICES
  ]
})
export class SearchModule { }
