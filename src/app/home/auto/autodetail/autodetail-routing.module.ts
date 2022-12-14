import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutodetailPage } from './autodetail.page';

const routes: Routes = [
  {
    path: '',
    component: AutodetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutodetailPageRoutingModule {}
