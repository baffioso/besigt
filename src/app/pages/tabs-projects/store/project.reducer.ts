import { createReducer, on } from '@ngrx/store';
import { ProjectActions } from '@app/store/action-types';
import { ProjectWithRelations } from '@app/interfaces/project';

export interface ProjectState {
    projects: ProjectWithRelations[];
    selectedProject: ProjectWithRelations | null;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    isLoadingFailure: boolean;
}

export const initialState: ProjectState = {
    projects: [],
    selectedProject: null,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false
};

export const projectReducer = createReducer(
    initialState,
    on(ProjectActions.loadProjects, (state) => state),
    on(ProjectActions.loadProjectsSuccess, (state, { projects }) => ({
        ...state,
        projects
    })),
    on(ProjectActions.selectedProject, (state, { id }) => ({
        ...state,
        selectedProject: state.projects.find(project => project.id === id)
    })),
    on(ProjectActions.clearSelectedProject, state => ({
        ...state,
        selectedProject: null
    })),
    on(ProjectActions.clearProjectState, state => ({
        ...state,
        projects: []
    }))
);
