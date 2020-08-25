import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPaketPage } from './detail-paket.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPaketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPaketPageRoutingModule {}
