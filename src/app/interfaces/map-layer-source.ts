// import TileLayer from "ol/layer/Tile";

export interface BaseMap {
    id: string;
    name: string;
    image?: string;
    map: any;
}

export interface Layer {
    name: string;
    label: string;
    addedToMap: boolean;
    opacity?: number;
    minZoom?: number;
    maxZoom?: number;
}

export interface MapOverlay {
    name: string;
    type: 'geojson' | 'wms' | 'wfs' | 'vectortile';
    url: string;
    server?: 'geoserver' | 'mapserver';
    layers: Layer[];
    icon?: string;
    layerCount?: {
        added: number,
        total: number
    }
}

export interface LayersConfig {
    overlays: MapOverlay[];
    baseMaps: BaseMap[];
}
