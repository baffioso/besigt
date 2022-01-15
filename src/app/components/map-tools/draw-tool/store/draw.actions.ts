import { createAction, props } from "@ngrx/store";
import { Feature } from "ol";
import { DrawToolState } from "./draw.reducer";

type ValueOf<T> = T[keyof T];

export const CHANGE_DRAW_EDIT_MODE = '[DRAW TOOL COMPONENT] Change Draw Edit Mode'
export const RESET_DRAW_TOOL = '[DRAW TOOL COMPONENT] Reset Draw Tool'

export const changeDrawEditMode = createAction(
    CHANGE_DRAW_EDIT_MODE,
    props<{
        change: {
            prop: keyof DrawToolState,
            value: ValueOf<DrawToolState>
        }
    }>())
export const resetDrawTool = createAction(RESET_DRAW_TOOL);
