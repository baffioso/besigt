import { Feature } from '@app/interfaces/feature';
import { Image } from '@app/interfaces/image';
import { GeoJSON } from 'geojson';

export interface CreateProject {
    name: string;
    description: string;
    geom?: string;
}

export interface Project extends CreateProject {
    id: string;
    user_id: string;
    inserted_at: Date;
}

export interface ProjectWithRelations extends Omit<Project, 'geom'> {
    images: Image[];
    features: Feature[];
    map_state: any[];
    geom: GeoJSON;
}
