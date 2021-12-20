import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-draw-modal',
  templateUrl: './map-draw-modal.component.html',
  styleUrls: ['./map-draw-modal.component.scss'],
})
export class MapDrawModalComponent implements OnInit {
  input: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  dismiss(): void {
    this.modalController.dismiss(this.input);
  }

}
