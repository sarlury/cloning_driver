import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPaketPageRoutingModule } from './detail-paket-routing.module';

import { DetailPaketPage } from './detail-paket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPaketPageRoutingModule
  ],
  declarations: [DetailPaketPage]
})
export class DetailPaketPageModule {}
