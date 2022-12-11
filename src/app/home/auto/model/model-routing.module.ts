import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelPage } from './model.page';

const routes: Routes = [
  {
    path: '',
    component: ModelPage
  },
  {
    path: 'model-detail',
    loadChildren: () => import('./model-detail/model-detail.module').then( m => m.ModelDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelPageRoutingModule {}