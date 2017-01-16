import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FiltersComponent } from "./filters/filters";
import { ReportsFormComponent } from "./reports/reports-form";
import { ReportViewComponent } from "./reports/report-view";
import { TransactionsSearchComponent } from "./transactions/transactions-search";
import { ReportsResolver } from "./shared/resolvers/reports.resolver";

export const appRoutes: Routes = [
  { path: '', component: TransactionsSearchComponent },
  { path: 'filters', component: FiltersComponent },
  {
    path: 'reports',
    children: [
      {
        path: 'new',
        component: ReportsFormComponent
      },
      {
        path: ':id',
        component: ReportViewComponent,
      },
      {
        path: ':id/configure',
        component: ReportsFormComponent,
        resolve: {
          report: ReportsResolver
        }
      }
    ]
  },
  {
    path: 'transactions/search',
    component: TransactionsSearchComponent,
  }
];


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
