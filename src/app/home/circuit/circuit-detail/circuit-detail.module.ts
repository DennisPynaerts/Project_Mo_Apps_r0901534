import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircuitDetailPageRoutingModule } from './circuit-detail-routing.module';

import { CircuitDetailPage } from './circuit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircuitDetailPageRoutingModule
  ],
  declarations: [CircuitDetailPage]
})
export class CircuitDetailPageModule {}
