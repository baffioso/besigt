import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core/dist/types/interface';
import { map } from 'rxjs/operators';
import { Layer, MapOverlays } from 'src/app/interfaces/map-layer-source';
import { MapLayersService } from 'src/app/services/map-layers.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-layers-control-modal',
  templateUrl: './map-layers-control-modal.page.html',
  styleUrls: ['./map-layers-control-modal.page.scss'],
})
export class MapLayersControlModalPage implements OnInit {
  segment: 'overlays' | 'baselayers' = 'overlays';
  overlays$ = this.mapLayersService.overlays$;
  baseMaps$ = this.mapLayersService.baseMaps$;
  selectedBaseMap$ = this.mapLayersService.baseMaps$.pipe(
    map(baseMaps => baseMaps.find(baseMap => baseMap.selected).id)
  );

  constructor(public modalController: ModalController, private mapLayersService: MapLayersService, private mapService: MapService) { }

  ngOnInit() {
  }

  onOverlayToggle(event: any, source: MapOverlays, layer: Layer) {

    this.mapLayersService.updateOverlays(source.name, layer.name, event.detail.checked);

    if (event.detail.checked) {
      this.mapService.addLayer(source.url, layer);
    } else {
      this.mapService.removeLayer(layer.name);
    }

  }

  onBaseLayerSelect(event: any): void {
    this.mapLayersService.updateBaseLayerSelection(event.detail.value);
    this.mapService.changeBaseMap(event.detail.value);
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

  // Ionic angular optimimization to prevent list scrolling to top on state update
  trackItems(index: number, item: any) {
    return item.name;
  }

}
