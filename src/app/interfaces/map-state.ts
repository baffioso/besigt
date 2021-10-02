export interface ViewState {
    center: number[];
    zoom: number;
    rotation?: number;
}

export interface MapState {
    tracking?: boolean;
    locating?: boolean;
    loadingLayer?: boolean;
    view?: ViewState;
    mapLoaded?: boolean;
}
