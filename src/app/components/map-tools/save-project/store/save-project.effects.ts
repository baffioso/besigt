
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

import { SupabaseService } from '@app/services/supabase.service';
import { MapService } from '@app/services/map.service';
import { AppState } from '@app/store/app.reducer';
import { ProjectActions, SaveProjectActions } from '@app/store/action-types';
import { ProjectBounds } from '@app/interfaces/projectBounds';
@Injectable()
export class SaveProjectEffects {

    saveProject$ = createEffect(() => this.actions$.pipe(
        ofType(SaveProjectActions.SAVE_PROJECT),
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
        switchMap(project => this.supabase.addProject(project).pipe(
            switchMap(() => [
                SaveProjectActions.saveProjectSuccess(),
                ProjectActions.loadProjects()
            ]),
            catchError((error: Error) => {
                this.store.dispatch(SaveProjectActions.saveProjectFail({ error: error.toString() }))
                return EMPTY
            })
        ))
    ))

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private mapService: MapService,
        private supabase: SupabaseService
    ) { }
}