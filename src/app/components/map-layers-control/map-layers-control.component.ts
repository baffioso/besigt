import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapLayersControlModalPage } from '../../pages/map-layers-control-modal/map-layers-control-modal.page';

@Component({
  selector: 'app-map-layers-control',
  templateUrl: './map-layers-control.component.html',
  styleUrls: ['./map-layers-control.component.scss'],
})
export class MapLayersControlComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async onShowLayersControl() {
    const modal = await this.modalController.create({
      component: MapLayersControlModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
