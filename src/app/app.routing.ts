import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FiltersComponent } from "./filters/filters";
import { HomeComponent } from "./home";
import { ReportsFormComponent } from "./reports/reports-form";
import { ReportsResolver } from "./shared/resolvers/reports.resolver";

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filters', component: FiltersComponent },
  {
    path: 'reports/:id',
    component: ReportsFormComponent,
    resolve: {
      report: ReportsResolver
    }
  }
];


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
