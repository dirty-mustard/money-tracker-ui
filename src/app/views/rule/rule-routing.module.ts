import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RuleComponent } from './rule.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Rule'
    },
    children: [
      {
        path: '',
        component: RuleComponent,
        data: {
          title: 'Rule overview'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleRoutingModule {}
