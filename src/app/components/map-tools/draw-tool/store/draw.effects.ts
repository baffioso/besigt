import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, catchError, withLatestFrom, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import * as projectActions from '@app/state/project.actions'
import * as drawActions from './draw.actions';
import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';

@Injectable()
export class DrawEffects {

    addFeature$ = createEffect(() => this.actions$.pipe(
        ofType(drawActions.ADD_FEATURE),
        withLatestFrom(
            this.store.select('project', 'selectedProject'),
            this.store.select('map', 'drawnFeature')
        ),
        switchMap(([{ _, properties }, project, feature]) => {
            const geom = this.mapService.featureAsWKT(feature);
            return this.supabase.addFeature({
                geom,
                properties,
                project_id: project.id
            }).pipe(
                map(() => drawActions.addFeatureSuccess()),
                catchError(() => EMPTY)
            );
        }),
        tap(() => this.store.dispatch(projectActions.loadProjects()))
    ));

    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private mapService: MapService,
        private supabase: SupabaseService
    ) { }
}