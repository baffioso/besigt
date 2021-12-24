
export interface ViewState {
    center: number[];
    zoom: number;
    rotation?: number;
    extent?: number[];
}

export interface MapState {
    mapInteraction: 'singleSelect' | 'multiSelect';
    tracking: boolean;
    locating: boolean;
    loadingLayer: boolean;
    loadingFeatureInfo: boolean;
    view?: ViewState;
    mapLoaded: boolean;
}
