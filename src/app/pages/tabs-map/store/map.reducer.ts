import { createReducer, on } from '@ngrx/store';
import { Position } from '@capacitor/geolocation';
import { Feature } from 'ol';
import RenderFeature from 'ol/render/Feature';
import { Geometry } from 'ol/geom';

import { LayerName } from '@app/interfaces/layerNames';
import { MapActions } from '@app/store/action-types';

export type SelectedFeature = {
    feature: (Feature<Geometry> | RenderFeature),
    layerName: LayerName
}
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
    selectedFeatures: SelectedFeature[]
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
    on(MapActions.mapLoaded, state => ({
        ...state,
        mapLoaded: true
    })),
    on(MapActions.drawnFeature, (state, { feature }) => ({
        ...state,
        drawnFeature: feature
    })),
    on(MapActions.clearDrawnFeature, state => ({
        ...state,
        drawnFeature: null
    })),
    on(MapActions.selectedFeatures, (state, { features }) => ({
        ...state,
        selectedFeatures: features
    })),
    on(MapActions.currentPositionSuccess, (state, { position }) => ({
        ...state,
        currentPosition: position
    })),
    on(MapActions.clearCurrentPosition, state => ({
        ...state,
        currentPosition: null
    })),
    on(MapActions.updateViewParams, (state, { viewParams }) => ({
        ...state,
        viewParams
    }))
);
