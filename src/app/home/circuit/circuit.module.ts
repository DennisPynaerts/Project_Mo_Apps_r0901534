import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircuitPageRoutingModule } from './circuit-routing.module';

import { CircuitPage } from './circuit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircuitPageRoutingModule
  ],
  declarations: [CircuitPage]
})
export class CircuitPageModule {}
