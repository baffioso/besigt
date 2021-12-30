import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import * as projectActions from '@app/state/project.actions';
import { AppState } from '@app/store/app.reducer';
import { MapService } from '@app/services/map.service';

@Injectable()
export class ProjectEffects {
    loadProjects$ = createEffect(() => this.actions$.pipe(
        ofType(projectActions.LOAD_PROJECTS),
        mergeMap(() => this.supabase.loadProjects()
            .pipe(
                map(projects => projectActions.loadProjectsSuccess({ projects })),
                catchError(() => EMPTY)
            )
        )
    ));

    addFeature$ = createEffect(() => this.actions$.pipe(
        ofType(projectActions.ADD_FEATURE),
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
                map(() => projectActions.addFeatureSuccess()),
                catchError(() => EMPTY)
            );
        })
    ));



    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mapService: MapService,
        private supabase: SupabaseService
    ) { }
}
