import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';

import { AppState } from '@app/store/app.reducer';
import { MapToolActions } from '@app/store/action-types';
import { MapTool } from '@app/components/map-tools/store/map-tool.reducer';
import { GeoSearchComponent } from '@app/components/map-tools/geo-search/geo-search.component';

@Component({
  selector: 'app-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapToolsComponent implements OnInit {

  selectedProject$ = this.store.select('project', 'selectedProject');
  activatedMapTools$ = this.store.select('mapTools', 'activatedMapTools');

  constructor(
    private store: Store<AppState>,
    private modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
    this.store.select('mapTools', 'activatedMapTools').pipe(
      filter(tools => tools.includes('geoSearch')),
      mergeMap(() => this.presentGeoSearchModal())
    ).subscribe();
  }

  presentGeoSearchModal() {
    return from(
      this.modalCtrl.create({
        component: GeoSearchComponent,
        breakpoints: [0.5, 1],
        initialBreakpoint: 0.5
      })
    ).pipe(
      tap(modal => modal.present()),
      mergeMap(modal => from(modal.onDidDismiss()).pipe(
        tap(() => this.store.dispatch(MapToolActions.removeMapTool({ tool: 'geoSearch' })))
      ))
    )
  }

  activateTool(tool: MapTool) {
    this.store.dispatch(MapToolActions.toggleMapTool({ tool }))
  }

}
