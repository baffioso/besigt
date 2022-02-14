
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';
import * as saveProjecActions from './save-project.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { EMPTY, of } from 'rxjs';
import { ProjectBounds } from '@app/interfaces/projectBounds';
@Injectable()
export class SaveProjectEffects {

    saveProject$ = createEffect(() => this.actions$.pipe(
        ofType(saveProjecActions.SAVE_PROJECT),
        withLatestFrom(
            this.store.select('map', 'selectedFeatures'),
            this.store.select('map', 'drawnFeature')
        ),
        map(([{ payload }, matrikel, draw]) => {
            switch (((payload as any).bounds)) {
                case ProjectBounds.Matrikel:
                    return {
                        feature: matrikel[0].feature,
                        ...(payload as any)
                    }
                case ProjectBounds.Draw:
                    return {
                        feature: draw,
                        ...(payload as any)
                    }
                case ProjectBounds.ViewExtent:
                    return {
                        feature: this.mapService.getViewExtent(),
                        ...(payload as any)
                    }
                default:
                    break;
            }
        }),
        map((project) => ({
            name: project.name,
            description: project.description,
            geom: this.mapService.featureAsWKT(project.feature as Feature<Geometry>)
        })),
        tap(console.log),
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