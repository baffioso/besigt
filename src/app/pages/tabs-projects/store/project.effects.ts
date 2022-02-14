import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import * as projectActions from '@app/pages/tabs-projects/store/project.actions';

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

    constructor(
        private actions$: Actions,
        private supabase: SupabaseService
    ) { }
}