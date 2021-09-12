import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core/dist/types/interface';
import { Layer, MapLayerSource } from 'src/app/interfaces/map-layer-source';
import { MapLayersService } from 'src/app/services/map-layers.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-layers-control-modal',
  templateUrl: './map-layers-control-modal.page.html',
  styleUrls: ['./map-layers-control-modal.page.scss'],
})
export class MapLayersControlModalPage implements OnInit {

  layersSources$ = this.mapLayersService.layers$;

  constructor(public modalController: ModalController, private mapLayersService: MapLayersService, private mapService: MapService) { }

  ngOnInit() {
  }

  onLayerToggle(event: any, source: MapLayerSource, layer: Layer) {

    this.mapLayersService.changeAddedToMapState(source.name, layer.name, event.detail.checked);

    if (event.detail.checked) {
      this.mapService.addLayer(source.url, layer);
    } else {
      this.mapService.removeLayer(layer.name);
    }

  }

  dismiss() {
    this.modalController.dismiss();
  }

  trackItems(index: number, item: any) {
    return item.name;
  }

}
