import { createAction, props } from "@ngrx/store";
import { DrawToolState } from "./draw.reducer";

type ValueOf<T> = T[keyof T];

export const CHANGE_DRAW_EDIT_MODE = '[Draw Tool Component] Change Draw Edit Mode'
export const RESET_DRAW_TOOL = '[Draw Tool Component] Reset Draw Tool'
export const ADD_FEATURE = '[Draw Tool Component] Add Project Features';
export const ADD_FEATURE_SUCCESS = '[Draw Tool Component] Add Project Features Success';
export const ADD_FEATURE_FAIL = '[Draw Tool Component] Add Project Features Error';

export const changeDrawEditMode = createAction(
    CHANGE_DRAW_EDIT_MODE,
    props<{
        change: {
            prop: keyof DrawToolState,
            value: ValueOf<DrawToolState>
        }
    }>())
export const resetDrawTool = createAction(RESET_DRAW_TOOL);
export const addFeature = createAction(ADD_FEATURE, props<{ properties: any }>());
export const addFeatureSuccess = createAction(ADD_FEATURE_SUCCESS);
export const addFeatureError = createAction(ADD_FEATURE_FAIL);