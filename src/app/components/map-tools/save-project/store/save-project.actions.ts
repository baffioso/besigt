import { ProjectBounds } from "@app/interfaces/projectBounds";
import { createAction, props } from "@ngrx/store";

export const SAVE_PROJECT = '[Save Project Tool] Save Project'
export const SAVE_PROJECT_SUCCESS = '[Save Project Tool] Save Project Success'
export const SAVE_PROJECT_FAIL = '[Save Project Tool] Save Project Fail'

export const saveProject = createAction(SAVE_PROJECT, props<{ payload: { bounds: ProjectBounds, name: string, description: string } }>());
export const saveProjectSuccess = createAction(SAVE_PROJECT_SUCCESS);
export const saveProjectFail = createAction(SAVE_PROJECT_FAIL, props<{ error: any }>());

