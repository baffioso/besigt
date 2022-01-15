import { createReducer, on } from '@ngrx/store';
import * as mapActions from '@app/state/map.actions';
import { Position } from '@capacitor/geolocation';
import { Feature } from 'ol';
import RenderFeature from 'ol/render/Feature';
import { Geometry } from 'ol/geom';

export interface ViewParams {
    center: [number, number];
    zoom: number;
    rotation: number;
    extent: number[];
}
export interface MapState {
    mapLoaded: boolean;
    viewParams: ViewParams
    drawnFeature: Feature<any>;
    selectedFeatures: (Feature<Geometry> | RenderFeature)[]
    currentPosition?: Position
};

const initialState: MapState = {
    mapLoaded: false,
    viewParams: null,
    drawnFeature: null,
    selectedFeatures: null,
    currentPosition: null
};

export const mapReducer = createReducer(
    initialState,
    on(mapActions.mapLoaded, state => ({
        ...state,
        mapLoaded: true
    })),
    on(mapActions.drawnFeature, (state, { feature }) => ({
        ...state,
        drawnFeature: feature
    })),
    on(mapActions.clearDrawnFeature, state => ({
        ...state,
        drawnFeature: null
    })),
    on(mapActions.selectedFeatures, (state, { features }) => ({
        ...state,
        selectedFeatures: features
    })),
    on(mapActions.currentPositionSuccess, (state, { position }) => ({
        ...state,
        currentPosition: position
    })),
    on(mapActions.clearCurrentPosition, state => ({
        ...state,
        currentPosition: null
    })),
    on(mapActions.updateViewParams, (state, { viewParams }) => ({
        ...state,
        viewParams
    }))
);
