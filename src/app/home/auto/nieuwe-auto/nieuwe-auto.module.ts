import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NieuweAutoPageRoutingModule } from './nieuwe-auto-routing.module';

import { NieuweAutoPage } from './nieuwe-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NieuweAutoPageRoutingModule
  ],
  declarations: [NieuweAutoPage]
})
export class NieuweAutoPageModule {}
