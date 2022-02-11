import { createReducer, on } from '@ngrx/store'
import * as saveProjctActions from './save-project.actions';

export interface SaveProjectState {
    photo: Blob;
    description: string;
    geom: string;
}

export const initialState: SaveProjectState = {
    photo: null,
    description: '',
    geom: null
}

export const saveProjectReducer = createReducer(
    initialState,
    // on(saveProjctActions.photoPosition(), () => {})
)