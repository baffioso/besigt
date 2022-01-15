import { createAction, props } from '@ngrx/store';
import { MapTool } from '@app/components/map-tools/store/map-tool.reducer';

// TOOL 
export const ADD_MAP_TOOL = '[Map Page] Add Map Tool';
export const SHIFT_MAP_TOOL = '[Map Page] Shift Map Tool';
export const TOGGLE_MAP_TOOL = '[Map Page] Toggle Map Tool';
export const REMOVE_MAP_TOOL = '[Map Page] Remove Map Tool';
export const REMOVE_ALL_MAP_TOOLS = '[Map Page] Remove All Map Tools';

export const addMapTool = createAction(ADD_MAP_TOOL, props<{ tool: MapTool }>());
export const shiftMapTool = createAction(SHIFT_MAP_TOOL, props<{ tool: MapTool }>());
export const toggleMapTool = createAction(TOGGLE_MAP_TOOL, props<{ tool: MapTool }>());
export const removeMapTool = createAction(REMOVE_MAP_TOOL, props<{ tool: MapTool }>());
export const removeAllMapTools = createAction(REMOVE_ALL_MAP_TOOLS);
