import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GeoJSONFeature } from 'ol/format/GeoJSON';

import { MapService } from '@app/services/map.service';
import { AppState } from '@app/store/app.reducer';
import { mapStyles } from '@app/shared/mapStyles';
import { GeolocationService } from '@app/services/geolocation.service';
import { Feature } from '@app/interfaces/feature';
import { Image } from '@app/interfaces/image';
import { ProjectWithRelations } from '@app/interfaces/project';
import { SupabaseService } from '@app/services/supabase.service';
import { MapActions } from '@app/store/action-types';

@Injectable()
export class MapEffects {

    private selectedProject$ = this.store.select('project', 'selectedProject').pipe(
        filter(project => !!project),
    )

    zoomToProjectArea$ = createEffect(() => this.actions$.pipe(
        ofType(MapActions.ZOOM_TO_PROJECT_AREA),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        map(([_, project]) => project),
        filter(project => !!project),
        mergeMap(project => this.supabase.getProjectExtent(project.id)),
        tap(extent => this.mapService.zoomToExtent(extent)),
        catchError(() => EMPTY)
    ), { dispatch: false });

    addProjectAreaToMap$ = createEffect(() => this.actions$.pipe(
        ofType(MapActions.ADD_PROJECT_AREA_TO_MAP),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        map(([_, project]) => project),
        filter(project => !!project),
        tap(project => {
            const geojson = tableAsGeoJson([project])
            this.mapService.addGeoJSON(geojson, 'projectArea', 'EPSG:25832', mapStyles.projectArea);
        })
    ), { dispatch: false });

    addProjectFeaturesToMap$ = createEffect(() => this.actions$.pipe(
        ofType(MapActions.ADD_PROJECT_FEATURES_TO_MAP),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        map(([_, project]) => project),
        filter(project => !!project && project.features.length > 0),
        tap(project => {
            const geojson = tableAsGeoJson(project.features);
            this.mapService.addGeoJSON(geojson, 'projectFeatures', 'EPSG:25832', mapStyles.default, true);
        })
    ), { dispatch: false });

    addProjectPhotosToMap$ = createEffect(() => this.actions$.pipe(
        ofType(MapActions.ADD_PROJECT_PHOTOS_TO_MAP),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        map(([_, project]) => project),
        filter(project => !!project && project.images.length > 0),
        tap(project => {
            const geojson = tableAsGeoJson(project.images);
            this.mapService.addGeoJSON(geojson, 'projectPhotos', 'EPSG:25832', mapStyles.photo, true);
        })
    ), { dispatch: false });

    removeProjectMapOverlays$ = createEffect(() => this.actions$.pipe(
        ofType(MapActions.REMOVE_PROJECT_MAP_OVERLAYS),
        tap(() => this.mapService.removeProjectOverlays())
    ), { dispatch: false });

    zoomToCurrentPosition$ = createEffect(() => this.actions$.pipe(
        ofType(MapActions.ZOOM_TO_CURRENT_POSITION),
        mergeMap(() => this.geolocationService.getPosition()
            .pipe(
                tap(position => {
                    const coords: [number, number] = [position.coords.longitude, position.coords.latitude]
                    this.mapService.flyTo(coords);
                }),
                map(position => MapActions.currentPositionSuccess({ position })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mapService: MapService,
        private supabase: SupabaseService,
        private geolocationService: GeolocationService
    ) { }
}

type GeometryTable = Feature | Image | ProjectWithRelations

const tableAsGeoJson = (geometryTable: GeometryTable[]): any => {

    const features = geometryTable.map((feature: GeometryTable) => {

        if ('properties' in feature) {
            const { id, geom, properties, ...rest } = feature;
            return { id, type: 'Feature', geometry: geom, properties: { ...properties, id, ...rest } } as GeoJSONFeature;
        } else {
            const { id, geom, ...properties } = feature;
            return { id, type: 'Feature', geometry: geom, properties: { ...properties, id } } as GeoJSONFeature;
        }

    });

    return {
        type: 'FeatureCollection',
        crs: {
            type: 'name',
            properties: {
                name: 'EPSG:25832',
            },
        },
        features
    };

}