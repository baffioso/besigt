import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';

import { MapService } from 'src/app/services/map.service';
import { MapStoreService } from 'src/app/stores/map-store.service';
import { AppState } from '@app/store/app.reducer';
import { MapActions, ProjectActions } from '@app/store/action-types';


@Component({
  selector: 'app-tap-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TapMapPage implements OnInit, OnDestroy {

  abandon$ = new Subject();
  loading$ = this.mapStore.mapstate$.pipe(
    map(({ loadingFeatureInfo, loadingLayer }) => ({ loadingFeatureInfo, loadingLayer })),
    map(isLoading => Object.values(isLoading).some((val: boolean) => val))
  );
  loadingImage$ = this.store.select('photoTool', 'loading')

  activatedMapTools$ = this.store.select('mapTools', 'activatedMapTools');
  selectedProject$ = this.store.select('project', 'selectedProject');

  constructor(
    private rounter: Router,
    private route: ActivatedRoute,
    private mapStore: MapStoreService,
    private mapService: MapService,
    public modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

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

    const mapNavigationParams$ = this.store.select('map', 'viewParams').pipe(
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
  }

  ngOnDestroy(): void {
    this.abandon$.next();
  }

  ionViewDidEnter() {
    this.mapService.resize();
  }

  onClearProject() {
    this.store.dispatch(ProjectActions.clearSelectedProject());
    this.store.dispatch(MapActions.removeProjectMapOverlays());
  }

}
