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
  },  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircuitPageRoutingModule {}
