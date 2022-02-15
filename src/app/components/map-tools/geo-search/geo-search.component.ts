import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as dawa from 'dawa-autocomplete2';

import { MapService } from '@app/services/map.service';
import { ModalController } from '@ionic/angular';
import { AppState } from '@app/store/app.reducer';
import { Store } from '@ngrx/store';
import { MapToolActions } from '@app/store/action-types';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('input') input: ElementRef;
  autocomplete: any;

  constructor(
    private mapService: MapService,
    private modalCtrl: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.autocomplete = dawa.dawaAutocomplete(this.input.nativeElement, {
      select: (res: any) => {
        const coords: [number, number] = [res.data.x, res.data.y];
        this.mapService.removeLayer('marker');
        this.mapService.addMarker(coords);
        this.mapService.flyTo(coords);
        this.modalCtrl.dismiss();
        this.store.dispatch(MapToolActions.removeMapTool({ tool: 'geoSearch' }))
      },
      adgangsadresserOnly: true
    });

    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.input.nativeElement.focus();
    }, 500);
  }

  ngOnDestroy(): void {
    this.autocomplete.destroy();
  }
}
