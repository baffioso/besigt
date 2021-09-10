import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core/dist/types/interface';
import { MapLayersService } from 'src/app/services/map-layers.service';

@Component({
  selector: 'app-map-layers-control-modal',
  templateUrl: './map-layers-control-modal.page.html',
  styleUrls: ['./map-layers-control-modal.page.scss'],
})
export class MapLayersControlModalPage implements OnInit {

  layers$ = this.mapLayersService.mapLayers;

  constructor(public modalController: ModalController, private mapLayersService: MapLayersService) { }

  ngOnInit() {
  }

  onLayerToggle(event: any, layerId: string) {
    console.log(event.detail.checked, layerId);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
