export interface CreateProject {
    name: string;
    description: string;
}

export interface Project extends CreateProject {
    id: number;
    user_id: string;
    inserted_at: Date;
}
