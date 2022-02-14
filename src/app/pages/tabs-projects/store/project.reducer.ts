import { createReducer, on } from '@ngrx/store';
import * as projectActions from '@app/pages/tabs-projects/store/project.actions';
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
    on(projectActions.loadProjects, (state) => state),
    on(projectActions.loadProjectsSuccess, (state, { projects }) => ({
        ...state,
        projects
    })),
    on(projectActions.selectedProject, (state, { id }) => ({
        ...state,
        selectedProject: state.projects.find(project => project.id === id)
    })),
    on(projectActions.clearSelectedProject, state => ({
        ...state,
        selectedProject: null
    })),
    on(projectActions.clearProjectState, state => ({
        ...state,
        projects: []
    }))
);

// export function projectReducer(state, action) {
//     return _projectReducer(state, action);
// }
