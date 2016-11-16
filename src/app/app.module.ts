import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { ContentComponent } from './content';
import { FooterComponent } from './footer';
import { ControlsComponent } from './controls';
import { FiltersComponent } from "./filters/filters";
import { FilterFormComponent } from "./filters/filters-form";
import { FilterListComponent } from "./filters/filters-list";
import { FilterService, TagService } from "./shared/service";
import { HomeComponent } from "./home";
import { AppComponent } from "./app.component";
import { FilterFormService } from "./filters/shared";
import { ReportFormService } from "./reports/shared";
import { ReportFormComponent } from "./reports/report-form";
import { ReportService } from "./shared/service/report.service";
import { ReportResolver } from "./shared/resolver";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    ControlsComponent,
    HomeComponent,

    // Filters
    FilterFormComponent,
    FilterListComponent,
    FiltersComponent,

    // Reports
    ReportFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    FormBuilder,

    // Filters
    FilterService,

    FilterFormService ,
    // Reports
    ReportService,
    ReportResolver,

    ReportFormService,
    // Tags
    TagService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
