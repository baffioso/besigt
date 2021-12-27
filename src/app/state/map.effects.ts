import { Injectable } from '@angular/core';
import { catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MapService } from '@app/services/map.service';
import * as fromMap from '@app/state/map.actions';
import { AppState } from '@app/store/app.reducer';
import { EMPTY } from 'rxjs';
import { mapStyles } from '@app/shared/mapStyles';

@Injectable()
export class MapEffects {

    zoomToProjectArea$ = createEffect(() => this.actions$.pipe(
        ofType(fromMap.ZOOM_TO_PROJECT_AREA),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        tap((project) => {
            const viewState = project[1].map_state[0].map_state;
            this.mapService.flyTo(viewState.center, viewState.zoom);
        }),
        catchError(() => EMPTY)
    ), { dispatch: false });

    addProjectAreaToMap$ = createEffect(() => this.actions$.pipe(
        ofType(fromMap.ADD_PROJECT_AREA_TO_MAP),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        tap(([_, project]) => {

            const geojson = {
                type: 'FeatureCollection',
                crs: {
                    type: 'name',
                    properties: {
                        name: 'EPSG:25832',
                    },
                },
                features: [project.geom]
            };

            this.mapService.addGeoJSON(geojson, 'projectArea', 'EPSG:25832', mapStyles.projectArea);
        })
    ), { dispatch: false });

    addProjectFeaturesToMap$ = createEffect(() => this.actions$.pipe(
        ofType(fromMap.ADD_PROJECT_FEATURES_TO_MAP),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        tap(([_, project]) => {

            const features = project.features.map(feature => {
                const { geom, ...properties } = feature;
                return { type: 'Feature', geometry: geom, properties };
            });

            const geojson = {
                type: 'FeatureCollection',
                crs: {
                    type: 'name',
                    properties: {
                        name: 'EPSG:25832',
                    },
                },
                features
            };

            this.mapService.addGeoJSON(geojson, 'projectArea', 'EPSG:25832');
        })
    ), { dispatch: false });

    removeProjectMapOverlays$ = createEffect(() => this.actions$.pipe(
        ofType(fromMap.REMOVE_PROJECT_MAP_OVERLAYS),
        tap(() => this.mapService.removeProjectOverlays())
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mapService: MapService
    ) { }
}
