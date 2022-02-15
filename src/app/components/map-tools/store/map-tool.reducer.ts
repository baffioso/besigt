import { createReducer, on } from '@ngrx/store';
import { MapToolActions } from '@app/store/action-types';

export type MapTool = 'geoSearch' | 'addressInfo' | 'saveProject' | 'takePhoto' | 'draw' | 'measure';

export interface MapToolState {
    activatedMapTools: MapTool[];
    photoPosition: [number, number]
};

export const initialState: MapToolState = {
    activatedMapTools: [],
    photoPosition: null
};

export const mapToolReducer = createReducer(
    initialState,
    on(MapToolActions.addMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: [...state.activatedMapTools, tool]
    })),
    on(MapToolActions.shiftMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: [tool]
    })),
    on(MapToolActions.toggleMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: state.activatedMapTools.includes(tool) ? state.activatedMapTools.filter(t => t !== tool) : [tool]
    })),
    on(MapToolActions.removeMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: state.activatedMapTools.filter(t => t !== tool)
    })),
    on(MapToolActions.removeAllMapTools, (state) => ({
        ...state,
        activatedMapTools: []
    }))
);