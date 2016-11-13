import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { FilterFormComponent } from './filters/filters-form';
import { FiltersComponent } from "./filters/filters";
import { HomeComponent } from "./home";

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filters', component: FiltersComponent },
  { path: 'filters/:id', component: FiltersComponent }
];


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
