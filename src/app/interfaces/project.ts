import { Image } from './image';

export interface CreateProject {
    name: string;
    description: string;
}

export interface Project extends CreateProject {
    id: string;
    user_id: string;
    inserted_at: Date;
}

export interface ProjectWithRelations extends Project {
    images: Image[];
    map_state: any[];
}
