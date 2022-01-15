import { createReducer, on } from "@ngrx/store";
import * as drawActions from './draw.actions';

export interface DrawToolState {
    inEditMode: boolean;
    showBack: boolean;
    showDelete: boolean;
    showSave: boolean;
    showUndo: boolean;
}

export const initialState: DrawToolState = {
    inEditMode: false,
    showBack: true,
    showDelete: true,
    showSave: true,
    showUndo: true,
}

export const drawReducer = createReducer(
    initialState,
    on(drawActions.changeDrawEditMode, (state, { change }) => ({
        ...state,
        [change.prop]: change.value
    })),
    on(drawActions.resetDrawTool, () => initialState)
)