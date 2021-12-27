import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, pluck, take, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';

import { UiStateService } from '@app/stores/ui-state.service';
import { MapFeatureInfoModalComponent } from 'src/app/components/map-feature-info-modal/map-feature-info-modal.component';
import { MapService } from 'src/app/services/map.service';
import { MapStoreService } from 'src/app/stores/map-store.service';
import { AppState } from '@app/store/app.reducer';
import * as fromProject from '@app/state/project.actions';
import * as fromMap from '@app/state/map.actions';


@Component({
  selector: 'app-tap-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class TapMapPage implements OnInit, OnDestroy {

  abandon$ = new Subject();
  loading$ = this.mapStore.mapstate$.pipe(
    map(({ loadingFeatureInfo, loadingLayer }) => ({ loadingFeatureInfo, loadingLayer })),
    map(isLoading => Object.values(isLoading).some((val: boolean) => val))
  );

  uiState$ = this.uiState.uiState$;

  selectedProject$ = this.store.select('project', 'selectedProject');

  constructor(
    private rounter: Router,
    private route: ActivatedRoute,
    private mapStore: MapStoreService,
    private mapService: MapService,
    public modalController: ModalController,
    private uiState: UiStateService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.mapStore.mapstate$.pipe(
      takeUntil(this.abandon$),
      pluck('loadingFeatureInfo'),
    ).subscribe();


    this.route.queryParams.pipe(
      take(1),
      tap(params => {
        const center: [number, number] = [Number(params.x), Number(params.y)];
        const zoom = Number(params.zoom);

        if (center[0]) {
          setTimeout(() => {
            this.mapService.setView({ center, zoom });
          }, 3000);
        }
      })
    ).subscribe();

    const mapNavigationParams$ = this.mapStore.mapstate$.pipe(
      pluck('view'),
      map(v => ({ x: v?.center[0], y: v?.center[1], zoom: v?.zoom }))
    );

    mapNavigationParams$.pipe(
      takeUntil(this.abandon$),
      tap(view => {
        this.rounter.navigate([], {
          relativeTo: this.route,
          queryParams: view
        });
      })
    ).subscribe();

    this.mapStore.selectedImage$.pipe(
      takeUntil(this.abandon$),
      filter(feature => feature !== null),
      tap(() => this.mapStore.updateMapState('loadingFeatureInfo', true)),
      tap(feature => {
        this.mapStore.updateMapState('loadingFeatureInfo', false);
        this.showFeatureInfo(feature);
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.abandon$.next();
  }

  ionViewDidEnter() {
    this.mapService.resize();
  }

  async showFeatureInfo(feature) {
    const modal = await this.modalController.create({
      component: MapFeatureInfoModalComponent,
      componentProps: {
        feature
      }
    });

    modal.present();
  }

  onClearProject() {
    this.store.dispatch(fromProject.clearSelectedProject());
    this.store.dispatch(fromMap.removeProjectMapOverlays());
  }

}
