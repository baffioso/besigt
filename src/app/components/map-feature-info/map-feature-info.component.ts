import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayerName } from '@app/interfaces/layerNames';
import { AppState } from '@app/store/app.reducer';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
import { MapFeatureInfoModalComponent } from './map-feature-info-modal/map-feature-info-modal.component';

@Component({
  selector: 'app-map-feature-info',
  templateUrl: './map-feature-info.component.html',
  styleUrls: ['./map-feature-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFeatureInfoComponent implements OnInit {

  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private mapService: MapService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('map', 'selectedFeatures').pipe(
      filter(feature => !!feature),
      map(features => ({
        properties: features[0].feature.getProperties(),
        layerName: features[0].layerName
      })),
      switchMap(props => this.showModal(props)),
      mergeMap(modal => from(modal.onDidDismiss()).pipe(
        tap(() => this.mapService.clearFeatureSelection())
      ))
    ).subscribe()
  }

  showModal(feature: { layerName: LayerName, properties: { [x: string]: any } }) {
    return from(this.modalController.create({
      component: MapFeatureInfoModalComponent,
      componentProps: { feature },
      initialBreakpoint: 0.4,
      breakpoints: [0, 0.4, 1],
    })).pipe(
      tap(modal => modal.present())
    )
  }

  onCloseModal(): void {
    this.modalController.dismiss();
    this.mapService.clearFeatureSelection();
  }
}
