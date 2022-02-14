import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapLayersControlModalComponent } from './map-layers-control-modal/map-layers-control-modal.component';

@Component({
  selector: 'app-map-layers-control',
  templateUrl: './map-layers-control.component.html',
  styleUrls: ['./map-layers-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapLayersControlComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async onShowLayersControl() {
    const modal = await this.modalController.create({
      component: MapLayersControlModalComponent,
      cssClass: 'layer-control-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5
    });
    return await modal.present();
  }

}
