import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'auto',
    loadChildren: () => import('./auto/auto.module').then( m => m.AutoPageModule)
  },
  {
    path: 'auto/:id',
    loadChildren: () => import('./auto/autodetail/autodetail.module').then( m => m.AutodetailPageModule)
  },
  {
    path: 'auto/:id/model-detail/:modelId',
    loadChildren: () => import('./auto/model-detail/model-detail.module').then( m => m.ModelDetailPageModule)
  },
  {
    path: 'circuit',
    loadChildren: () => import('./circuit/circuit.module').then( m => m.CircuitPageModule)
  },
  {
    path: 'circuit/:id',
    loadChildren: () => import('./circuit/circuit-detail/circuit-detail.module').then( m => m.CircuitDetailPageModule)
  },
  {
    path: 'circuit/nieuw-circuit',
    loadChildren: () => import('./circuit/nieuw-circuit/nieuw-circuit.module').then( m => m.NieuwCircuitPageModule)
  },
  {
    path: 'circuit/nieuw-auto',
    loadChildren: () => import('./auto/nieuwe-auto/nieuwe-auto.page').then( m => m.NieuweAutoPage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
