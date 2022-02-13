import { CreateProject, ProjectWithRelations } from '@app/interfaces/project';
import { createAction, props } from '@ngrx/store';

export const LOAD_PROJECTS = '[Project Page] Load Projects';
export const LOAD_PROJECTS_SUCCESS = '[Project Page] Load Projects Success';
export const LOAD_PROJECTS_FAIL = '[Project Page] Load Projects Error';

export const ADD_PROJECT = '[Map Page] Add Project';
export const ADD_PROJECT_SUCCESS = '[Map Page] Add Project Success';
export const ADD_PROJECT_FAIL = '[Map Page] Add Project Error';

export const CLEAR_PROJECT_STATE = '[Settings Page] Clear project state'

export const SELECTED_PROJECT = '[Project Page] Selected Project';
export const CLEAR_SELECTED_PROJECT = '[Map Page] Clear Selected Project';

export const loadProjects = createAction(LOAD_PROJECTS);
export const loadProjectsSuccess = createAction(LOAD_PROJECTS_SUCCESS, props<{ projects: ProjectWithRelations[] }>());
export const loadProjectsError = createAction(LOAD_PROJECTS_FAIL, props<{ error: any }>());

export const clearProjectState = createAction(CLEAR_PROJECT_STATE);

export const selectedProject = createAction(SELECTED_PROJECT, props<{ id: string }>());
export const clearSelectedProject = createAction(CLEAR_SELECTED_PROJECT);

export const addProject = createAction(ADD_PROJECT, props<{ project: CreateProject }>());
