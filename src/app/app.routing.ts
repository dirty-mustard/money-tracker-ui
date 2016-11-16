import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FiltersComponent } from "./filters/filters";
import { HomeComponent } from "./home";
import { ReportFormComponent } from "./reports/report-form";
import { ReportResolver } from "./shared/resolver/report.resolver";

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filters', component: FiltersComponent },
  {
    path: 'reports/:id',
    component: ReportFormComponent,
    resolve: {
      report: ReportResolver
    }
  }
];


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
