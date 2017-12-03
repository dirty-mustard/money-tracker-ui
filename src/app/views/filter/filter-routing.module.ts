import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Filter'
    },
    children: [
      {
        path: '',
        component: FilterComponent,
        data: {
          title: 'Filter overview'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterRoutingModule {}
