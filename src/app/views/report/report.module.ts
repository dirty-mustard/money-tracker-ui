import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Import services
import {
  ReportService,
  TransactionService
} from '../../shared/';

import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { ReportViewComponent } from './report-view/report-view.component';

const APP_SERVICES = [
  TransactionService,
  ReportService
];

@NgModule({
  imports: [
    ReportRoutingModule,
    ChartsModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    ReportComponent,
    ReportViewComponent
  ],
  providers: [
    ...APP_SERVICES
  ]
})
export class ReportModule { }
