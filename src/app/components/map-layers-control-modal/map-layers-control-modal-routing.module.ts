import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapLayersControlModalPage } from './map-layers-control-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MapLayersControlModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapLayersControlModalPageRoutingModule {}
