
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';
import * as saveProjecActions from './save-project.actions';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { EMPTY } from 'rxjs';
@Injectable()
export class SaveProjectEffects {

    saveProject$ = createEffect(() => this.actions$.pipe(
        ofType(saveProjecActions.SAVE_PROJECT),
        withLatestFrom(this.store.select('map', 'selectedFeatures')),
        map(([project, features]) => ({ ...(project as any).payload, geom: this.mapService.featureAsWKT(features[0].feature as Feature<Geometry>) })),
        switchMap(project => this.supabase.addProject(project).pipe(
            map(() => saveProjecActions.saveProjectSuccess()),
            catchError((error: Error) => {
                this.store.dispatch(saveProjecActions.saveProjectFail({ error: error.toString() }))
                return EMPTY
            })
        ))
    ), { dispatch: false })

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mapService: MapService,
        private supabase: SupabaseService
    ) { }
}