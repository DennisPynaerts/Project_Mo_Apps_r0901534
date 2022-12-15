import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NieuweAutoPage } from './nieuwe-auto.page';

const routes: Routes = [
  {
    path: '',
    component: NieuweAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NieuweAutoPageRoutingModule {}
