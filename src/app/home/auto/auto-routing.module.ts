import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoPage } from './auto.page';

const routes: Routes = [
  {
    path: '',
    component: AutoPage
  },
  {
    path: 'model',
    loadChildren: () => import('./model/model.module').then( m => m.ModelPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoPageRoutingModule {}
