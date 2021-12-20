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
import { MapGeosearchComponent } from 'src/app/components/map-geosearch-fab/map-geosearch.component';
import { MapLayersControlModalPage } from '../map-layers-control-modal/map-layers-control-modal.page';
import { MapGeosearchModalPage } from '../map-geosearch-modal/map-geosearch-modal.page';
import { MapFeatureInfoModalComponent } from 'src/app/components/map-feature-info-modal/map-feature-info-modal.component';
import { MapLegendFabComponent } from 'src/app/components/map-legend-fab/map-legend-fab.component';
import { MapLegendPopoverComponent } from 'src/app/components/map-legend-popover/map-legend-popover.component';
import { MapDrawFabComponent } from '@app/components/map-draw-fab/map-draw-fab.component';
import { MapDrawModalComponent } from '@app/components/map-draw-modal/map-draw-modal.component';
import { MapSaveProjectFabComponent } from '@app/components/map-save-project-fab/map-save-project-fab.component';
import { MapInfoToolComponent } from '@app/components/map-info-tool/map-info-tool.component';
import { MapDrawToolComponent } from '@app/components/map-draw-tool/map-draw-tool.component';
// eslint-disable-next-line max-len
import { MapSaveProjectAreaSelectionComponent } from '@app/components/map-save-project-area-selection/map-save-project-area-selection.component';

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
    MapToolsComponent,
    MapGeolocationComponent,
    MapGeosearchComponent,
    MapLayersControlModalPage,
    MapGeosearchModalPage,
    MapFeatureInfoModalComponent,
    MapLegendFabComponent,
    MapLegendPopoverComponent,
    MapDrawFabComponent,
    MapDrawToolComponent,
    MapDrawModalComponent,
    MapSaveProjectFabComponent,
    MapSaveProjectAreaSelectionComponent,
    MapInfoToolComponent
  ]
})
export class MapPageModule { }
