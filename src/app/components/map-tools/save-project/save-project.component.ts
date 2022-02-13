import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '@app/store/app.reducer';
import { DawaService } from '@app/services/dawa.service';
import { MapService } from '@app/services/map.service';
import { MapStoreService } from '@app/stores/map-store.service';
import { ProjectStoreService } from '@app/stores/project-store.service';
import { UiStateService } from '@app/stores/ui-state.service';
import { getCenter } from 'ol/extent';
import { WKT } from 'ol/format';
import { Observable, of } from 'rxjs';
import { concatMap, filter, first, map, tap } from 'rxjs/operators';
import { Feature } from 'geojson';
import * as saveProjectActions from './store/save-project.actions'
import { UserNotificationService } from '@app/shared/userNotification.service';

@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveProjectComponent implements OnInit, OnDestroy {

  project: FormGroup;

  showModal = false;

  geomSource: 'jordstykke' | 'draw' | 'bounds';

  disableMatrikel$: Observable<boolean>;

  // selectedArea$ = this.mapStore.selectedFeature$;
  // drawnGeometry$ = this.mapStore.drawnGeometry$;
  selectedArea$ = this.store.select('map', 'selectedFeatures');
  drawnGeometry$ = this.store.select('map', 'drawnFeature');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private noticationService: UserNotificationService,
    private mapService: MapService,
    private mapStore: MapStoreService,
    private uiState: UiStateService,
    private dawaService: DawaService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.project = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });

    this.disableMatrikel$ = this.store.select('map', 'viewParams').pipe(
      map(view => view?.zoom < 15 ? true : false)
    )

    this.store.select('saveProject', 'error').pipe(
      filter(err => !!err),
      tap(err => this.noticationService.presentToast({
        header: 'Noget gik galt',
        message: err,
        duration: 5000,
        color: 'danger',
        position: 'top'
      }))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.mapService.removeLayer('jordstykke')
  }

  toggleModal() {
    this.showModal = !this.showModal;

    let bounds: Observable<any>;

    switch (this.geomSource) {
      case 'jordstykke':
        bounds = this.store.select('map', 'selectedFeatures').pipe(
          map(features => features[0].feature.getGeometry().getExtent())
        );
        break;
      case 'draw':
        bounds = this.mapStore.drawnGeometry$;
        break;
      case 'bounds':
        // console.log(this.mapService.transform(this.mapService.getViewExtent().getGeometry().getExtent(), 'EPSG:4326', 'EPSG:3857'))
        bounds = of(this.mapService.getViewExtent().getGeometry().getExtent());
        break;
      default:
        break;
    }

    bounds.pipe(
      first(),
      map(bounds => {
        return this.mapService.transform(getCenter(bounds) as [number, number], 'EPSG:3857', 'EPSG:4326');
      }),
      concatMap(center => this.dawaService.reverseGeocode(center[0], center[1])),
      tap(adr => this.project.patchValue({
        name: `${adr.vejnavn} ${adr.husnr}`,
        description: `Nær ${adr.adressebetegnelse} - Matrikel: ${adr.matrikelnr}, ${adr.ejerlav.navn}`
      }))
    ).subscribe();

  }

  selectionMethodChanged(event: Event) {
    this.geomSource = (event as CustomEvent).detail.value;

    switch (this.geomSource) {
      case 'jordstykke':
        this.mapService.removeDrawTool();
        this.mapService.removeLayer('jordstykke');
        this.mapService.addMatrikelWithinViewExtent();
        this.uiState.removeMapTool('draw');
        break;
      case 'draw':
        this.uiState.updateDrawUiState('inEditMode', true);
        this.uiState.updateDrawUiState('showBack', false);
        this.uiState.updateDrawUiState('showSave', false);
        this.mapService.removeLayer('jordstykke');
        this.mapService.removeDrawTool();
        this.mapService.activateDrawTool('Polygon');
        this.uiState.addMapTool('draw');
        break;
      case 'bounds':
        this.mapService.removeLayer('jordstykke');
        this.uiState.removeMapTool('draw');
        this.mapService.removeDrawTool();
        break;
      default:
        break;
    }
  }

  onCreateProject() {
    if (this.geomSource === 'draw') {
      this.mapService.finishDrawing();
      this.uiState.removeMapTool('draw');
    }

    this.toggleModal();
    this.mapService.removeDrawTool();
    this.mapService.removeLayer('jordstykke');

    // Delayed navigation in order to close modal
    setTimeout(() => {
      this.uiState.removeAllMapTools();
      this.store.dispatch(saveProjectActions.saveProject({ payload: this.project.value }))
      this.router.navigateByUrl('/app/projects');
    }, 250);
  }

}
