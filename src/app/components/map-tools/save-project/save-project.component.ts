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
import { concatMap, first, map, tap } from 'rxjs/operators';

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

  disableMatrikel$ = this.mapStore.mapstate$.pipe(
    map(mapState => mapState.view?.zoom < 15 ? true : false)
  );

  // selectedArea$ = this.mapStore.selectedFeature$;
  // drawnGeometry$ = this.mapStore.drawnGeometry$;
  selectedArea$ = this.store.select('map', 'selectedFeatures');
  drawnGeometry$ = this.store.select('map', 'drawnFeature');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private mapService: MapService,
    private mapStore: MapStoreService,
    private projectStore: ProjectStoreService,
    private uiState: UiStateService,
    private dawaService: DawaService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.project = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnDestroy(): void {
    this.mapService.removeLayer('jordstykke')
  }

  toggleModal() {
    this.showModal = !this.showModal;

    let feature: Observable<string>;
    switch (this.geomSource) {
      case 'jordstykke':
        feature = this.mapStore.selectedFeatureAsWKT$;
        break;
      case 'draw':
        feature = this.mapStore.drawnGeometry$;
        break;
      case 'bounds':
        const extent = this.mapService.getViewExtent();
        feature = of(this.mapService.featureAsWKT(extent, 'EPSG:4326', 'EPSG:25832'));
        break;
      default:
        break;
    }

    feature.pipe(
      first(),
      map(feat => {
        const wkt = new WKT();
        const f = wkt.readFeature(feat);
        const extent = f.getGeometry().getExtent();
        return this.mapService.transform(getCenter(extent), 'EPSG:25832', 'EPSG:4326');
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
      this
      this.uiState.removeAllMapTools();
      this.projectStore.addProject(this.project.value, this.geomSource);
      this.router.navigateByUrl('/app/projects');
    }, 250);
  }

}
