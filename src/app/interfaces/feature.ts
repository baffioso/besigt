import { Point, LineString, Polygon } from 'geojson';

export interface Style {
    fillColor?: string;
}

export interface Properties {
    name?: string;
    description?: string;
}

export interface CreateFeature {
    geom: string;
    properties: Properties;
    project_id: string;
}

export interface Feature {
    id: string;
    geom: Point | LineString | Polygon;
    properties: Properties;
    project_id: string;
    user_id: string;
    inserted_at: Date;
}
