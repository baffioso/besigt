
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, switchMap, pluck, tap, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import * as photoActions from './photo.actions';
import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';
import { PhotoService } from '@app/services/photo.service';

@Injectable()
export class PhotoEffects {

    photoPosition$ = createEffect(() => this.actions$.pipe(
        ofType(photoActions.PHOTO_POSITION),
        switchMap(() => {
            return this.store.select('map', 'viewParams').pipe(
                pluck('center'),
                first()
            )
        }),
        map(center => {
            const geom = `POINT(${this.mapService.transform(center).join(' ')})`
            return photoActions.photoPositionSuccess({ geom })
        })
    ))

    takePhoto$ = createEffect(() => this.actions$.pipe(
        ofType(photoActions.TAKE_PHOTO),
        switchMap(() => this.photoService.takePhoto()),
        switchMap(photo => this.photoService.photoToBlob(photo)),
        map(blob => photoActions.takePhotoSuccess({ photo: blob }))
    ))


    addPhoto$ = createEffect(() => this.actions$.pipe(
        ofType(photoActions.TAKE_PHOTO_SUCCESS),
        withLatestFrom(
            this.store.select('photoTool', 'photo'),
            this.store.select('photoTool', 'geom'),
            this.store.select('project', 'selectedProject'),
        ),
        switchMap(([_, photo, geom, project]) => {
            const time = new Date().getTime();
            const fileName = `${time}.png`;

            return this.supabase.uploadImage(fileName, photo).pipe(
                map(res => ({
                    file_name: res.data.Key,
                    description: '',
                    geom,
                    project_id: project.id
                }))
            )
        }),
        switchMap(photoDetail => this.supabase.addImageInfo(photoDetail))
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private photoService: PhotoService,
        private mapService: MapService,
        private supabase: SupabaseService
    ) { }
}