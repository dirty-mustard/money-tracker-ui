import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { ContentComponent } from './content';
import { FooterComponent } from './footer';
import { ControlsComponent } from './controls';

import { FiltersComponent } from "./filters/filters";
import { FiltersFormComponent } from "./filters/filters-form";
import { FiltersListComponent } from "./filters/filters-list";
import { FiltersService, TagsService } from "./shared/services";
import { FiltersFormService } from "./filters/shared";

import { HomeComponent } from "./home";
import { ReportsFormComponent } from "./reports/reports-form";
import { ReportsService } from "./shared/services/reports.service";
import { ReportsResolver } from "./shared/resolvers";
import { TransactionsSearchComponent } from "./transactions/transactions-search";
import { TransactionsSearchFormService } from "./transactions/shared";

import { TransactionsService } from './shared/services/transactions.service';
import { TransactionsListComponent } from './transactions/list';

import { SidebarService } from "./shared/services/sidebar.service";

import { TransactionImporterComponent } from './transaction-importer';

import { MtCurrencyPipe } from './shared/pipes/mt-currency.pipe';
import { MtDatePipe } from './shared/pipes/mt-date.pipe';
import { MtTextPipe } from './shared/pipes/mt-text.pipe';

import { FileSelectDirective } from "ng2-file-upload";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    ControlsComponent,
    HomeComponent,

    // Transactions
    TransactionsSearchComponent,

    // Filters
    FiltersFormComponent,
    FiltersListComponent,
    FiltersComponent,

    // Reports
    ReportsFormComponent,

    // Transactions
    TransactionsListComponent,

    // CSV Importer
    TransactionImporterComponent,

    MtCurrencyPipe,
    MtDatePipe,
    MtTextPipe,

    FileSelectDirective
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

    // Transactions
    TransactionsSearchFormService,

    // Filters
    FiltersService,

    FiltersFormService ,
    // Reports
    ReportsService,
    ReportsResolver,

    // Tags
    TagsService,

    // Transactions
    TransactionsService,

    // Sidebar
    SidebarService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
