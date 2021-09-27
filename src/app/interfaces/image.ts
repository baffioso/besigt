import { Point } from 'geojson';

export interface CreateImage {
    file_name: string;
    description: string;
    geom: string;
    project_id: string;
}

export interface Image {
    id: string;
    file_name: string;
    description: string;
    project_id: string;
    user_id: string;
    inserted_at: Date;
    geom: Point;
}
