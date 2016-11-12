import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home';
import { FilterFormComponent } from './filters/filters-form';
import { FilterComponent } from "./filters/filters";

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filters', component: FilterComponent },
  { path: 'filters/:id', component: FilterFormComponent }
];


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
