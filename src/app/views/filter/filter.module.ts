import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Import services
import {
  FilterService
} from '../../shared/';

import { SharedModule } from '../../shared/shared.module';
import { FilterRoutingModule } from './filter-routing.module';
import { FilterComponent } from './filter.component';

const APP_SERVICES = [
  FilterService
];

@NgModule({
  imports: [
    FilterRoutingModule,
    ChartsModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    FilterComponent,
  ],
  providers: [
    ...APP_SERVICES
  ]
})
export class FilterModule { }
