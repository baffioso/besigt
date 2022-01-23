import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TapMapPage } from './map.page';

import { MapPageRoutingModule } from './map-routing.module';
import { MapComponent } from '../../components/map/map.component';
import { MapLayersControlComponent } from '../../components/map-layers-control/map-layers-control.component';
import { MapToolsComponent } from '../../components/map-tools/map-tools.component';
import { MapGeolocationComponent } from '../../components/map-geolocation-fab/map-geolocation.component';
import { MapLayersControlModalPage } from '../map-layers-control-modal/map-layers-control-modal.page';
import { MapFeatureInfoComponent } from '@app/components/map-feature-info/map-feature-info.component';
import { MapFeatureInfoModalComponent } from '@app/components/map-feature-info/map-feature-info-modal/map-feature-info-modal.component';
import { AddressInfoComponent } from '@app/components/map-feature-info/map-feature-info-modal/address-info/address-info.component';
import { PhotoViewerComponent } from '@app/components/map-feature-info/map-feature-info-modal/photo-viewer/photo-viewer.component';
import { MapLegendFabComponent } from '@app/components/map-legend-fab/map-legend-fab.component';
import { MapLegendPopoverComponent } from '@app/components/map-legend-popover/map-legend-popover.component';
import { InfoToolComponent } from '@app/components/map-tools/info-tool/info-tool.component';
import { DrawToolComponent } from '@app/components/map-tools/draw-tool/draw-tool.component';
import { SaveProjectComponent } from '@app/components/map-tools/save-project/save-project.component';
import { GeoSearchComponent } from '@app/components/map-tools/geo-search/geo-search.component';
import { PhotoToolComponent } from '@app/components/map-tools/photo-tool/photo-tool.component';
import { DrawInfoComponent } from '@app/components/map-feature-info/map-feature-info-modal/draw-info/draw-info.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MapPageRoutingModule
  ],
  declarations: [
    TapMapPage,
    MapComponent,
    MapLayersControlComponent,
    MapGeolocationComponent,
    MapLayersControlModalPage,
    MapFeatureInfoComponent,
    MapFeatureInfoModalComponent,
    AddressInfoComponent,
    DrawInfoComponent,
    PhotoViewerComponent,
    MapLegendFabComponent,
    MapLegendPopoverComponent,
    GeoSearchComponent,
    MapToolsComponent,
    SaveProjectComponent,
    PhotoToolComponent,
    DrawToolComponent,
    InfoToolComponent
  ]
})
export class MapPageModule { }
