import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core/core.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CoreComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'search',
        loadChildren: './views/search/search.module#SearchModule'
      },
      {
        path: 'reports',
        loadChildren: './views/report/report.module#ReportModule'
      },
      {
        path: 'filters',
        loadChildren: './views/filter/filter.module#FilterModule'
      },
      {
        path: 'tags',
        loadChildren: './views/tag/tag.module#TagModule'
      },
      {
        path: 'rules',
        loadChildren: './views/rule/rule.module#RuleModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
