import { createReducer, on } from '@ngrx/store';
import * as mapToolActions from '@app/components/map-tools/store/map-tool.actions';

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
    on(mapToolActions.addMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: [...state.activatedMapTools, tool]
    })),
    on(mapToolActions.shiftMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: [tool]
    })),
    on(mapToolActions.toggleMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: state.activatedMapTools.includes(tool) ? state.activatedMapTools.filter(t => t !== tool) : [tool]
    })),
    on(mapToolActions.removeMapTool, (state, { tool }) => ({
        ...state,
        activatedMapTools: state.activatedMapTools.filter(t => t !== tool)
    })),
    on(mapToolActions.removeAllMapTools, (state) => ({
        ...state,
        activatedMapTools: []
    }))
);