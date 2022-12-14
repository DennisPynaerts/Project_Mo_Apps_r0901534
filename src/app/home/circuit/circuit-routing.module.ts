import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircuitPage } from './circuit.page';

const routes: Routes = [
  {
    path: '',
    component: CircuitPage
  },
  {
    path: 'circuit-detail',
    loadChildren: () => import('./circuit-detail/circuit-detail.module').then( m => m.CircuitDetailPageModule)
  },
  {
    path: 'nieuw-circuit',
    loadChildren: () => import('./nieuw-circuit/nieuw-circuit.module').then( m => m.NieuwCircuitPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircuitPageRoutingModule {}
