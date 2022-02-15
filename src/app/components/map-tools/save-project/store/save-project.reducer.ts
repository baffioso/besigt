import { createReducer, on } from '@ngrx/store'
import { SaveProjectActions } from '@app/store/action-types';

export interface SaveProjectState {
    error: string
}

export const initialState: SaveProjectState = {
    error: null
}

export const saveProjectReducer = createReducer(
    initialState,
    on(SaveProjectActions.saveProjectFail, (state, { error }) => ({ ...state, error }))
)