import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom, filter, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SupabaseService } from '@app/services/supabase.service';
import { MapActions, ProjectActions } from '@app/store/action-types';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducer';
import { Image } from '@app/interfaces/image';

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

    updateSelectedProject$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActions.LOAD_PROJECTS_SUCCESS),
        withLatestFrom(this.store.select('project', 'selectedProject')),
        filter(([_, selectedProject]) => !!selectedProject),
        map(([_, selectedProject]) => {
            return ProjectActions.selectedProject({ id: selectedProject.id })
        })
    ))

    addSelectedProjectMapOverlays$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActions.SELECTED_PROJECT),
        withLatestFrom(this.store.select('map', 'mapLoaded')),
        filter(([_, mapLoaded]) => mapLoaded),
        switchMap(() => [
            MapActions.removeProjectMapOverlays(),
            MapActions.addProjectAreaToMap(),
            MapActions.addProjectFeaturesToMap(),
            MapActions.addProjectPhotosToMap()
        ])
    ))

    deletePhoto$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActions.DELETE_PHOTO),
        withLatestFrom(this.store.select('project', 'projects')),
        map(([action, projects]) => {
            return projects
                .reduce((acc, project) => acc || project.images
                    .find(image => image.id === (action as any).id), undefined)
        }),
        mergeMap((image: Image) => this.supabase.deleteImageFeature(image.id)),
        mergeMap(({ data }) => this.supabase.deleteImage(data[0].file_name.replace('images/', ''))),
        switchMap(() => [
            ProjectActions.deletePhotoSuccess(),
            ProjectActions.loadProjects()
        ])
    ))

    constructor(
        private actions$: Actions,
        private supabase: SupabaseService,
        private store: Store<AppState>
    ) { }
}
