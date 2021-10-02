export interface ViewState {
    center: number[];
    zoom: number;
    rotation?: number;
}

export interface MapState {
    tracking?: boolean;
    locating?: boolean;
    loadingLayer?: boolean;
    loadingFeatureInfo?: boolean;
    view?: ViewState;
    mapLoaded?: boolean;
}
