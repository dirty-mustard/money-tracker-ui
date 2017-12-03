import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Import services
import {
  TagService
} from '../../shared/';

import { SharedModule } from '../../shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';

const APP_SERVICES = [
  TagService
];

@NgModule({
  imports: [
    TagRoutingModule,
    ChartsModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    TagComponent,
  ],
  providers: [
    ...APP_SERVICES
  ]
})
export class TagModule { }
