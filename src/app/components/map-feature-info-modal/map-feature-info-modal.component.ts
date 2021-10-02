import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-feature-info-modal',
  templateUrl: './map-feature-info-modal.component.html',
  styleUrls: ['./map-feature-info-modal.component.scss'],
})
export class MapFeatureInfoModalComponent {
  @Input() feature;

  constructor(
    private modalController: ModalController,
    private mapService: MapService
  ) { }

  onCloseModal(): void {
    this.modalController.dismiss();
    this.mapService.clearFeatureSelection();
  }
}
