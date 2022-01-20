import { Component, Input, OnInit } from '@angular/core';
import { LayerName } from '@app/interfaces/layerNames';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-feature-info-modal',
  templateUrl: './map-feature-info-modal.component.html',
  styleUrls: ['./map-feature-info-modal.component.css']
})
export class MapFeatureInfoModalComponent implements OnInit {
  @Input() feature: { layerName: LayerName, properties: { [x: string]: any } }

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onCloseModal() {
    this.modalController.dismiss();
  }

}
