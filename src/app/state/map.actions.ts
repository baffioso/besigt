import { createAction, props } from '@ngrx/store';
import { Position } from '@capacitor/geolocation';
import { Feature } from 'ol';
import { ViewParams } from './map.reducer';

// VIEW PARAMS
export const UPDATE_VIEW_PARAMS = '[Map Component] Update view params'
export const updateViewParams = createAction(UPDATE_VIEW_PARAMS, props<{ viewParams: ViewParams }>());

// PROJECT LAYERS AND PANNING
export const ZOOM_TO_PROJECT_AREA = '[Map Component] Zoom To Project Area';
export const ADD_PROJECT_AREA_TO_MAP = '[Map Component] Add Project Area To Map';
export const ADD_PROJECT_FEATURES_TO_MAP = '[Map Component] Add Project Features To Map';
export const REMOVE_PROJECT_MAP_OVERLAYS = '[Map Page] Remove Project Map Overlays';

export const zoomToProjectArea = createAction(ZOOM_TO_PROJECT_AREA);
export const addProjectAreaToMap = createAction(ADD_PROJECT_AREA_TO_MAP);
export const addProjectFeaturesToMap = createAction(ADD_PROJECT_FEATURES_TO_MAP);
export const removeProjectMapOverlays = createAction(REMOVE_PROJECT_MAP_OVERLAYS);

// DRAW
export const DRAWN_FEATURE = '[MAP COMPONENT] Drawn Feature';
export const CLEAR_DRAWN_FEATURE = '[MAP COMPONENT] Clear Drawn Feature';

export const drawnFeature = createAction(DRAWN_FEATURE, props<{ feature: Feature<any> }>());
export const clearDrawnFeature = createAction(CLEAR_DRAWN_FEATURE);

// GPS POSITION
export const ZOOM_TO_CURRENT_POSITION = '[Map Page] Current Location';
export const ZOOM_TO_CURRENT_POSITION_SUCCESS = '[Map Page] Current Location Success';
export const ZOOM_TO_CURRENT_POSITION_FAIL = '[Map Page] Current Location Fail';
export const CLEAR_CURRENT_POSITION = '[Map Page] Clear Current Position';

export const zoomToCurrentPosition = createAction(ZOOM_TO_CURRENT_POSITION)
export const currentPositionSuccess = createAction(ZOOM_TO_CURRENT_POSITION_SUCCESS, props<{ position: Position }>())
export const currentPositionFail = createAction(ZOOM_TO_CURRENT_POSITION_FAIL)
export const clearCurrentPosition = createAction(CLEAR_CURRENT_POSITION);

export const GET_MAP_CENTER = '[Photo Tool ] Map Center'
