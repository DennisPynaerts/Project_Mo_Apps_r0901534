import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NieuwCircuitPageRoutingModule } from './nieuw-circuit-routing.module';

import { NieuwCircuitPage } from './nieuw-circuit.page';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NieuwCircuitPageRoutingModule,
    HttpClientModule
  ],
  declarations: [NieuwCircuitPage]
})
export class NieuwCircuitPageModule {}
