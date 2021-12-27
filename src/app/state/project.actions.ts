import { CreateProject, ProjectWithRelations } from '@app/interfaces/project';
import { createAction, props } from '@ngrx/store';

export const LOAD_PROJECTS = '[Project Page] Load Projects';
export const LOAD_PROJECTS_SUCCESS = '[Project Page] Load Projects Success';
export const LOAD_PROJECTS_ERROR = '[Project Page] Load Projects Error';
export const SELECTED_PROJECT = '[Project Page] Selected Project';
export const CLEAR_SELECTED_PROJECT = '[Map Page] Clear Selected Project';
export const ADD_PROJECT = '[Map Page] Add Project';

export const loadProjects = createAction(LOAD_PROJECTS);
export const loadProjectsSuccess = createAction(LOAD_PROJECTS_SUCCESS, props<{ projects: ProjectWithRelations[] }>());
export const loadProjectsError = createAction(LOAD_PROJECTS_ERROR, props<{ error: any }>());

export const selectedProject = createAction(SELECTED_PROJECT, props<{ id: string }>());
export const clearSelectedProject = createAction(CLEAR_SELECTED_PROJECT);

export const addProject = createAction(ADD_PROJECT, props<{ project: CreateProject }>());
