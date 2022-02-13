import { createReducer, on } from '@ngrx/store'
import * as saveProjctActions from './save-project.actions';

export interface SaveProjectState {
    error: string
}

export const initialState: SaveProjectState = {
    error: null
}

export const saveProjectReducer = createReducer(
    initialState,
    on(saveProjctActions.saveProjectFail, (state, { error }) => ({ ...state, error }))
)