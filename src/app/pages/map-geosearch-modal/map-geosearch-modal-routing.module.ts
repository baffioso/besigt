import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapGeosearchModalPage } from './map-geosearch-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MapGeosearchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapGeosearchModalPageRoutingModule {}
