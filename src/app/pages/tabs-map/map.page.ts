import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { map, pluck, take, tap } from 'rxjs/operators';
import { MapFeatureInfoModalComponent } from 'src/app/components/map-feature-info-modal/map-feature-info-modal.component';
import { MapService } from 'src/app/services/map.service';
import { MapStoreService } from 'src/app/stores/map-store.service';
import { ProjectStoreService } from 'src/app/stores/project-store.service';


@Component({
  selector: 'app-tap-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class TapMapPage implements OnInit {
  loading$ = this.mapStore.mapstate$.pipe(
    pluck('loadingFeatureInfo')
  );

  currentProject$ = this.projectStore.currentProject$;

  constructor(
    private rounter: Router,
    private route: ActivatedRoute,
    private mapStore: MapStoreService,
    private projectStore: ProjectStoreService,
    private mapService: MapService,
    public modalController: ModalController,
  ) { }

  ngOnInit(): void {

    this.mapStore.mapstate$.pipe(
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

    // const addedOverlaysParams$ = this.mapLayersService.overlays$.pipe(
    //   take(1),
    //   map(overlays => overlays.map(o => o.layers.filter(l => l.addedToMap))),
    //   // tap(console.log)
    // ).subscribe();

    mapNavigationParams$.pipe(
      tap(view => {
        this.rounter.navigate([], {
          relativeTo: this.route,
          queryParams: view
        });
      })
    ).subscribe();

    this.mapStore.selectedFeature$.pipe(
      tap(feature => {
        this.showFeatureInfo(feature);
        this.mapStore.updateMapState('loadingFeatureInfo', false);
      })
    ).subscribe();
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
    this.projectStore.clearCurrentProject();
  }

}
