import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TapMapPage } from './map.page';

import { MapPageRoutingModule } from './map-routing.module';
import { MapComponent } from '../../components/map/map.component';
import { MapLayersControlComponent } from '../../components/map-layers-control/map-layers-control.component';
import { MapToolsComponent } from '../../components/map-tools/map-tools.component';
import { MapGeolocationComponent } from '../../components/map-geolocation-fab/map-geolocation.component';
import { MapGeosearchComponent } from 'src/app/components/map-geosearch-fab/map-geosearch.component';
import { MapLayersControlModalPage } from '../map-layers-control-modal/map-layers-control-modal.page';
import { MapGeosearchModalPage } from '../map-geosearch-modal/map-geosearch-modal.page';
import { MapFeatureInfoModalComponent } from 'src/app/components/map-feature-info-modal/map-feature-info-modal.component';
import { MapLegendFabComponent } from 'src/app/components/map-legend-fab/map-legend-fab.component';
import { MapLegendPopoverComponent } from 'src/app/components/map-legend-popover/map-legend-popover.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MapPageRoutingModule
  ],
  declarations: [
    TapMapPage,
    MapComponent,
    MapLayersControlComponent,
    MapToolsComponent,
    MapGeolocationComponent,
    MapGeosearchComponent,
    MapLayersControlModalPage,
    MapGeosearchModalPage,
    MapFeatureInfoModalComponent,
    MapLegendFabComponent,
    MapLegendPopoverComponent
  ]
})
export class MapPageModule { }
