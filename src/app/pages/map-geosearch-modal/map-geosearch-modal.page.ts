import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as dawa from 'dawa-autocomplete2';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-geosearch-modal',
  templateUrl: './map-geosearch-modal.page.html',
  styleUrls: ['./map-geosearch-modal.page.scss'],
})
export class MapGeosearchModalPage implements AfterViewInit {
  @ViewChild('input') input: ElementRef;

  constructor(private modalController: ModalController, private mapService: MapService) { }

  ngAfterViewInit(): void {
    dawa.dawaAutocomplete(this.input.nativeElement, {
      select: (res: any) => {
        console.log(res);
        this.mapService.flyTo([res.data.x, res.data.y]);
        this.modalController.dismiss();
      },
      adgangsadresserOnly: true
    });


    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.input.nativeElement.focus();
    }, 500);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
