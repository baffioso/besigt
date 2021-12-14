import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapDrawModalComponent } from '@app/components/map-draw-modal/map-draw-modal.component';
import { UiStateService } from '@app/stores/ui-state.service';
import { ModalController } from '@ionic/angular';
import { from, Subject } from 'rxjs';
import { filter, map, mergeMap, pluck, take, takeUntil, tap } from 'rxjs/operators';
import { MapFeatureInfoModalComponent } from 'src/app/components/map-feature-info-modal/map-feature-info-modal.component';
import { MapService } from 'src/app/services/map.service';
import { MapStoreService } from 'src/app/stores/map-store.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';


@Component({
  selector: 'app-tap-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class TapMapPage implements OnInit, OnDestroy {
  abandon$ = new Subject();
  loading$ = this.mapStore.mapstate$.pipe(
    pluck('loadingFeatureInfo')
  );

  showDrawTools$ = this.uiState.uiState$.pipe(
    pluck('showMapDrawTool')
  );

  currentProject$ = this.projectStore.currentProject$;

  constructor(
    private rounter: Router,
    private route: ActivatedRoute,
    private mapStore: MapStoreService,
    private projectStore: ProjectStoreService,
    private mapService: MapService,
    public modalController: ModalController,
    private uiState: UiStateService
  ) { }

  ngOnInit(): void {

    this.mapStore.mapstate$.pipe(
      takeUntil(this.abandon$),
      pluck('loadingFeatureInfo'),
    ).subscribe();


    this.route.queryParams.pipe(
      take(1),
      tap(params => {
        const center = [Number(params.x), Number(params.y)];
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

    this.projectStore.currentProjectImageGeoJSON$.pipe(
      takeUntil(this.abandon$),
      tap(geojson => {
        try {
          // this.mapService.removeProjectOverlays();
          this.mapService.addGeoJSON(geojson, 'photos', 'EPSG:25832');
        } catch (error) {
          // console.log(error);
        }
      })
    ).subscribe();

    this.projectStore.currentProjectFeatureGeoJSON$.pipe(
      takeUntil(this.abandon$),
      tap(geojson => {
        try {
          // this.mapService.removeProjectOverlays();
          this.mapService.addGeoJSON(geojson, 'features', 'EPSG:25832');
        } catch (error) {
          // console.log(error);
        }
      })
    ).subscribe();

    this.mapStore.selectedFeature$.pipe(
      takeUntil(this.abandon$),
      filter(feature => feature !== null),
      tap(() => this.mapStore.updateMapState('loadingFeatureInfo', true)),
      tap(feature => {
        this.mapStore.updateMapState('loadingFeatureInfo', false);
        this.showFeatureInfo(feature);
      })
    ).subscribe();

    this.mapStore.drawnGeometry$.pipe(
      takeUntil(this.abandon$),
      filter(geom => geom !== null),
      mergeMap(geom => from(this.showDrawModal()).pipe(
        map(description => ({ geom, description }))
      ))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.abandon$.next();
  }

  ionViewDidEnter() {
    this.mapService.resize();
  }

  async showDrawModal(): Promise<string> {
    const modal = await this.modalController.create({
      cssClass: 'bottom-modal',
      component: MapDrawModalComponent,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.projectStore.addFeature({ description: data });
    }


    return data;
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
    this.projectStore.clearCurrentProject();
  }

}
