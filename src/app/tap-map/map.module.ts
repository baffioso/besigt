import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TapMapPage } from './map.page';

import { MapPageRoutingModule } from './map-routing.module';
import { MapComponent } from '../components/map/map.component';
import { MapLayersControlComponent } from '../components/map-layers-control/map-layers-control.component';
import { MapToolsComponent } from '../components/map-tools/map-tools.component';
import { MapGeolocationComponent } from '../components/map-geolocation/map-geolocation.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MapPageRoutingModule
  ],
  declarations: [TapMapPage, MapComponent, MapLayersControlComponent, MapToolsComponent, MapGeolocationComponent]
})
export class MapPageModule { }
