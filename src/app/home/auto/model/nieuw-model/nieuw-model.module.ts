import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NieuwModelPageRoutingModule } from './nieuw-model-routing.module';

import { NieuwModelPage } from './nieuw-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NieuwModelPageRoutingModule
  ],
  declarations: [NieuwModelPage]
})
export class NieuwModelPageModule {}
