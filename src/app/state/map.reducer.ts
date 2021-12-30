import { createReducer, on } from '@ngrx/store';
import * as mapActions from '@app/state/map.actions';
import { Feature } from 'ol';
import { Position } from '@capacitor/geolocation';

export interface ViewParams {
    center: [number, number];
    zoom: number;
    rotation: number;
    extent: number[];
}
export interface MapState {
    viewParams: ViewParams
    drawnFeature?: Feature<any>;
    currentPosition?: Position
};

const initialState: MapState = {
    viewParams: null,
    drawnFeature: null,
    currentPosition: null
};

export const mapReducer = createReducer(
    initialState,
    on(mapActions.drawnFeature, (state, { feature }) => ({
        ...state,
        drawnFeature: feature
    })),
    on(mapActions.clearDrawnFeature, (state) => ({
        ...state,
        drawnFeature: null
    })),
    on(mapActions.currentPositionSuccess, (state, { position }) => ({
        ...state,
        currentPosition: position
    })),
    on(mapActions.clearCurrentPosition, (state) => ({
        ...state,
        currentPosition: null
    })),
    on(mapActions.updateViewParams, (state, { viewParams }) => ({
        ...state,
        viewParams
    }))
);
