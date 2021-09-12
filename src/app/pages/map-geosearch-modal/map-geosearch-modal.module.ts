import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapGeosearchModalPageRoutingModule } from './map-geosearch-modal-routing.module';

import { MapGeosearchModalPage } from './map-geosearch-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapGeosearchModalPageRoutingModule
  ],
  declarations: [MapGeosearchModalPage]
})
export class MapGeosearchModalPageModule {}
