import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapLayersControlModalPageRoutingModule } from './map-layers-control-modal-routing.module';

import { MapLayersControlModalPage } from './map-layers-control-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapLayersControlModalPageRoutingModule
  ],
  declarations: [MapLayersControlModalPage]
})
export class MapLayersControlModalPageModule {}
