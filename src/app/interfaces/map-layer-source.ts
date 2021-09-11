export interface Layer {
    name: string;
    label: string;
    addedToMap: boolean;
    opacity?: number;
    minZoom?: number;
    maxZoom?: number;
}

export interface MapLayerSource {
    name: string;
    type: 'geojson' | 'wms' | 'wfs' | 'vectortile';
    url: string;
    server?: 'geoserver' | 'mapserver';
    layers: Layer[];
}
