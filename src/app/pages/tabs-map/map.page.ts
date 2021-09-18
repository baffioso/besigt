import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, pluck, take, tap } from 'rxjs/operators';
import { ViewState } from 'src/app/interfaces/map-state';
import { MapLayersService } from 'src/app/services/map-layers.service';
import { MapService } from 'src/app/services/map.service';
import { MapStoreService } from 'src/app/stores/map-store.service';

@Component({
  selector: 'app-tap-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class TapMapPage implements OnInit {

  constructor(
    private mapState: MapStoreService,
    private rounter: Router,
    private route: ActivatedRoute,
    private mapSerice: MapService,
    private mapLayersService: MapLayersService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.pipe(
      take(1),
      tap(params => {
        const center = [Number(params.x), Number(params.y)];
        const zoom = Number(params.zoom);

        if (center[0]) {
          setTimeout(() => {
            this.mapSerice.setView({ center, zoom });
          }, 2000);
        }
      })
    ).subscribe();

    const mapNavigationParams$ = this.mapState.mapstate$.pipe(
      pluck('view'),
      map(v => ({ x: v?.center[0], y: v?.center[1], zoom: v?.zoom }))
    );

    const addedOverlaysParams$ = this.mapLayersService.overlays$.pipe(
      take(1),
      map(overlays => overlays.map(o => o.layers.filter(l => l.addedToMap))),
      tap(console.log)
    ).subscribe();

    mapNavigationParams$.pipe(
      tap(view => {
        this.rounter.navigate([], {
          relativeTo: this.route,
          queryParams: view
        });
      })
    ).subscribe();
  }

}
