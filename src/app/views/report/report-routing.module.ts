import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportViewComponent } from './report-view';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Report'
    },
    children: [
      {
        path: ':id',
        component: ReportViewComponent,
        data: {
          title: 'Report view'
        }
      },
      {
        path: '',
        component: ReportComponent,
        data: {
          title: 'Report overview'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
