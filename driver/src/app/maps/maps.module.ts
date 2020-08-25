import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsPageRoutingModule } from './maps-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { MapsPage } from './maps.page';

const routes: Routes = [
  {
    path: '',
    component: MapsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsPageRoutingModule,
    RouterModule.forChild(routes),
      ReactiveFormsModule
  ],
  declarations: [MapsPage],
  providers: [ Geolocation ]
})
export class MapsPageModule {}
