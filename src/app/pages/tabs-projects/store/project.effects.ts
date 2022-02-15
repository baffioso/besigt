import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import { ProjectActions } from '@app/store/action-types';

@Injectable()
export class ProjectEffects {
    loadProjects$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActions.LOAD_PROJECTS),
        mergeMap(() => this.supabase.loadProjects()
            .pipe(
                map(projects => ProjectActions.loadProjectsSuccess({ projects })),
                catchError(() => EMPTY)
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private supabase: SupabaseService
    ) { }
}
