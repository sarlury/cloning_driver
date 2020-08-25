import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailorderPageRoutingModule } from './detailorder-routing.module';

import { DetailorderPage } from './detailorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailorderPageRoutingModule
  ],
  declarations: [DetailorderPage]
})
export class DetailorderPageModule {}
