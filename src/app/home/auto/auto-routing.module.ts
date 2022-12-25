import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoPage } from './auto.page';

const routes: Routes = [
  {
    path: '',
    component: AutoPage
  },
  // {
  //   path: 'model',
  //   loadChildren: () => import('./model/model.module').then( m => m.ModelPageModule)
  // },
  {
    path: 'modeldetail',
    loadChildren: () => import('./model-detail/model-detail.module').then( m => m.ModelDetailPageModule)
  },
  {
    path: 'autodetail',
    loadChildren: () => import('./autodetail/autodetail.module').then( m => m.AutodetailPageModule)
  },
  {
    path: 'nieuwe-auto',
    loadChildren: () => import('./nieuwe-auto/nieuwe-auto.module').then( m => m.NieuweAutoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoPageRoutingModule {}
