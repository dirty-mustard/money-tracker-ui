import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Import services
import {
  RuleService
} from '../../shared/';

import { SharedModule } from '../../shared/shared.module';
import { RuleRoutingModule } from './rule-routing.module';
import { RuleComponent } from './rule.component';
import { RuleFacade } from './rule.facade';

const APP_SERVICES = [
  RuleService,
  RuleFacade
];

@NgModule({
  imports: [
    RuleRoutingModule,
    ChartsModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    RuleComponent,
  ],
  providers: [
    ...APP_SERVICES
  ]
})
export class RuleModule { }
