import { ActionReducerMap } from '@ngrx/store';

import * as fromProject from '@app/state/project.reducer';

export interface AppState {
    project: fromProject.ProjectState;
};

export const appReducer: ActionReducerMap<AppState> = {
    project: fromProject.projectReducer,
};
