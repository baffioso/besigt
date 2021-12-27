import { createAction } from '@ngrx/store';

export const ZOOM_TO_PROJECT_AREA = '[Map Component] Zoom To Project Area';
export const ADD_PROJECT_AREA_TO_MAP = '[Map Component] Add Project Area To Map';
export const ADD_PROJECT_FEATURES_TO_MAP = '[Map Component] Add Project Features To Map';
export const REMOVE_PROJECT_MAP_OVERLAYS = '[Map Page] Remove Project Map Overlays';

export const zoomToProjectArea = createAction(ZOOM_TO_PROJECT_AREA);
export const addProjectAreaToMap = createAction(ADD_PROJECT_AREA_TO_MAP);
export const addProjectFeaturesToMap = createAction(ADD_PROJECT_FEATURES_TO_MAP);
export const removeProjectMapOverlays = createAction(REMOVE_PROJECT_MAP_OVERLAYS);
