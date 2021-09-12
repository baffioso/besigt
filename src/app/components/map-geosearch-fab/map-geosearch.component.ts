import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapGeosearchModalPage } from 'src/app/pages/map-geosearch-modal/map-geosearch-modal.page';

@Component({
  selector: 'app-map-geosearch',
  templateUrl: './map-geosearch.component.html',
  styleUrls: ['./map-geosearch.component.scss'],
})
export class MapGeosearchComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async onShowGeoSearch() {
    const modal = await this.modalController.create({
      component: MapGeosearchModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
