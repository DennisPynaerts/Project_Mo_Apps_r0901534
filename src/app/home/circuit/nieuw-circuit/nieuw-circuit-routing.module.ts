import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NieuwCircuitPage } from './nieuw-circuit.page';

const routes: Routes = [
  {
    path: '',
    component: NieuwCircuitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NieuwCircuitPageRoutingModule {}
