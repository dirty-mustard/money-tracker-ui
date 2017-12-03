import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagComponent } from './tag.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tag'
    },
    children: [
      {
        path: '',
        component: TagComponent,
        data: {
          title: 'Tag overview'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule {}
