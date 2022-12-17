import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NieuwModelPage } from './nieuw-model.page';

const routes: Routes = [
  {
    path: '',
    component: NieuwModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NieuwModelPageRoutingModule {}
