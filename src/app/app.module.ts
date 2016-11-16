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
import { FiltersService, TagsService } from "./shared/services";
import { HomeComponent } from "./home";
import { AppComponent } from "./app.component";
import { FiltersFormService } from "./filters/shared";
import { ReportsFormComponent } from "./reports/reports-form";
import { ReportsService } from "./shared/services/reports.service";
import { ReportsResolver } from "./shared/resolvers";

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
    ReportsFormComponent
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
    FiltersService,

    FiltersFormService ,
    // Reports
    ReportsService,
    ReportsResolver,

    // Tags
    TagsService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
