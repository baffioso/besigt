import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store/app.reducer';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-feature-info',
  templateUrl: './map-feature-info.component.html',
  styleUrls: ['./map-feature-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFeatureInfoComponent implements OnInit, OnDestroy {

  selectedFeatures$ = this.store.select('map', 'selectedFeatures').pipe(
    filter(feature => !!feature),
    map(feature => feature[0].getProperties()),
  );

  isOpen$ = this.selectedFeatures$.pipe(
    map(properties => properties ? true : false),
    tap(console.log)
  )

  constructor(
    private modalController: ModalController,
    private mapService: MapService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('map', 'selectedFeatures').pipe(
      tap(() => this.showModal())
    ).subscribe()

    // from(this.modalController.create({
    //   component: ,
    // })).pipe(
    //   map(modal => modal.present())
    // ).subscribe()
  }

  ngOnDestroy(): void {
    console.log('destroy')
  }

  showModal() {
    const modal = from(this.modalController.create({
      component: MapFeatureInfoComponent,
    })).pipe(
      map(modal => modal.present())
    )
  }

  onCloseModal(): void {
    this.modalController.dismiss();
    this.mapService.clearFeatureSelection();
  }
}
