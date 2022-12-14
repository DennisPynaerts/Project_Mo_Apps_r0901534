import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutodetailPageRoutingModule } from './autodetail-routing.module';

import { AutodetailPage } from './autodetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutodetailPageRoutingModule
  ],
  declarations: [AutodetailPage]
})
export class AutodetailPageModule {}
