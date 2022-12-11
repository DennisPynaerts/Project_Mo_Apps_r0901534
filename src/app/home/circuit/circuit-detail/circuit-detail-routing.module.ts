import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircuitDetailPage } from './circuit-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CircuitDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircuitDetailPageRoutingModule {}
