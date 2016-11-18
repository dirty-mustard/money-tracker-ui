import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FiltersComponent } from "./filters/filters";
import { HomeComponent } from "./home";
import { ReportsFormComponent } from "./reports/reports-form";
import { ReportsResolver } from "./shared/resolvers/reports.resolver";
import { TransactionsSearchComponent } from "./transactions/transactions-search";

export const appRoutes: Routes = [
  { path: '', component: TransactionsSearchComponent },
  { path: 'filters', component: FiltersComponent },
  {
    path: 'reports/:id',
    component: ReportsFormComponent,
    resolve: {
      report: ReportsResolver
    }
  },
  {
    path: 'transactions/search',
    component: TransactionsSearchComponent,
  }
];


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
