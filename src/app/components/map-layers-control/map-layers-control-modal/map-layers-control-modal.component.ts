import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MapService } from '@app/services/map.service';
import { MapLayersService } from '@app/services/map-layers.service';
import { BaseMap, MapOverlay, Layer, BaseMapId } from '@app/interfaces/map-layer-source';

@Component({
  selector: 'app-map-layers-control-modal',
  templateUrl: './map-layers-control-modal.component.html',
  styleUrls: ['./map-layers-control-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapLayersControlModalComponent implements OnInit {
  segment: 'overlays' | 'baselayers' = 'overlays';
  // selectedBaseMap = 'aerial';

  overlays$: Observable<MapOverlay[]>;
  baseMaps$: Observable<BaseMap[]>;
  selectedBaseMap$: Observable<BaseMapId>;

  constructor(public modalController: ModalController, private mapLayersService: MapLayersService, private mapService: MapService) { }

  ngOnInit() {
    this.baseMaps$ = this.mapLayersService.baseMaps$;

    this.overlays$ = this.mapLayersService.overlays$.pipe(
      map(overlays => overlays.map(overlay => ({
        ...overlay,
        layerCount: {
          total: overlay.layers.length,
          added: overlay.layers.filter(layer => layer.addedToMap).length
        }
      })))
    )

    this.selectedBaseMap$ = this.mapLayersService.selectedBaseMap$
  }

  onOverlayToggle(event: any, source: MapOverlay, layer: Layer) {

    this.mapLayersService.updateOverlays(source.name, layer.name, event.detail.checked);

    if (event.detail.checked) {
      this.mapService.addWMSLayer(source.url, layer);
    } else {
      this.mapService.removeLayer(layer.name);
    }

  }

  onBaseLayerSelect(baseMap: BaseMap): void {
    this.mapLayersService.changeSelectedBaseMap(baseMap.id)
    // this.selectedBaseMap = baseMap.id
    this.mapService.changeBaseMap(baseMap.id as 'aerial' | 'streets' | 'hillshade');
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

  // Ionic angular optimimization to prevent list scrolling to top on state update
  trackItems(index: number, item: any) {
    return item.name;
  }

}