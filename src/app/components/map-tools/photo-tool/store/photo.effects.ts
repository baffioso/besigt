import { Injectable } from '@angular/core';
import { map, withLatestFrom, switchMap, pluck, first, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';
import { PhotoService } from '@app/services/photo.service';
import { PhotoActions, ProjectActions } from '@app/store/action-types';
import { UserNotificationService } from '@app/shared/userNotification.service';

@Injectable()
export class PhotoEffects {

    photoPosition$ = createEffect(() => this.actions$.pipe(
        ofType(PhotoActions.PHOTO_POSITION),
        switchMap(() => {
            return this.store.select('map', 'viewParams').pipe(
                pluck('center'),
                first()
            )
        }),
        map(center => {
            const geom = `POINT(${this.mapService.transform(center).join(' ')})`
            return PhotoActions.photoPositionSuccess({ geom })
        })
    ))

    takePhoto$ = createEffect(() => this.actions$.pipe(
        ofType(PhotoActions.TAKE_PHOTO),
        switchMap(() => this.photoService.takePhoto()),
        switchMap(photo => this.photoService.photoToBlob(photo)),
        switchMap(blob => [
            PhotoActions.takePhotoSuccess({ photo: blob }),
            PhotoActions.addPhoto()
        ])
    ))

    addPhoto$ = createEffect(() => this.actions$.pipe(
        ofType(PhotoActions.ADD_PHOTO),
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
        switchMap(photoDetail => this.supabase.addImageInfo(photoDetail)),
        switchMap(() => [
            PhotoActions.addPhotoSuccess(),
            ProjectActions.loadProjects()
        ])
    ))

    addPhotoSucces$ = createEffect(() => this.actions$.pipe(
        ofType(PhotoActions.ADD_PHOTO_SUCCESS),
        tap(() => this.notification.presentToast({
            header: 'Billedet er gemt',
            color: 'success',
            duration: 3000,
            position: 'top'
        }))
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private photoService: PhotoService,
        private mapService: MapService,
        private supabase: SupabaseService,
        private notification: UserNotificationService
    ) { }
}